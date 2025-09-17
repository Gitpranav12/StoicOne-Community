import React, { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:8080/api";

  // ✅ Read logged-in user from localStorage
  const storedUser = localStorage.getItem("currentUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const USER_ID = parsedUser?.id || null;

  // 🔹 Fetch user data + department mapping
  const fetchUserData = useCallback(
    async (retryCount = 0) => {
      if (!USER_ID) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [userRes, deptRes] = await Promise.all([
          fetch(`${API_BASE}/user/${USER_ID}`, { credentials: "include" }),
          fetch(`${API_BASE}/departments/all`, { credentials: "include" }),
        ]);

        if (!userRes.ok || !deptRes.ok) {
          throw new Error("Failed to fetch user or department data");
        }

        const userData = await userRes.json();
        const deptMap = await deptRes.json();

        // ✅ Defensive defaults: never null
        setUser({
          ...parsedUser,
          profile: userData?.profile || {},
          account: userData?.account || {},
          stats: userData?.stats || {},
          activity: userData?.activity || [],
          achievements: userData?.achievements || [],
          departmentOptions:
            deptMap && typeof deptMap === "object" ? deptMap : {},
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching user:", err.message);

        if (retryCount < 2) {
          // exponential backoff retry
          setTimeout(() => fetchUserData(retryCount + 1), (retryCount + 1) * 2000);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [API_BASE, USER_ID]
  );

  // 🔹 Load user on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // 🔹 Update profile
  const updateProfile = async (updatedProfile) => {
    try {
      const res = await fetch(`${API_BASE}/user/${USER_ID}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update profile");

      await res.json();
      await fetchUserData();
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  // 🔹 Update account (password change)
  const updateAccount = async ({ currentPassword, newPassword }) => {
    try {
      if (!currentPassword || !newPassword) {
        throw new Error("Both current and new passwords are required");
      }

      const res = await fetch(`${API_BASE}/user/${USER_ID}/account`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update account");

      await fetchUserData();
      return data;
    } catch (err) {
      console.error("Error updating account:", err);
      throw err;
    }
  };

  // 🔹 Delete account
  const deleteAccount = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/${USER_ID}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete account");

      // ✅ Clear local storage + context
      localStorage.removeItem("currentUser");
      setUser(null);

      return data;
    } catch (err) {
      console.error("Error deleting account:", err);
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateProfile,
        updateAccount,
        deleteAccount,
        fetchUserData,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
