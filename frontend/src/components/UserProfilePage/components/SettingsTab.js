import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SettingsTab() {
  const { user, updateProfile, updateAccount, deleteAccount, loading } =
    useContext(UserContext);

  const navigate = useNavigate();

  // ✅ Local states (always safe objects)
  const [profileData, setProfileData] = useState({});
  const [accountData, setAccountData] = useState({});

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });

  // ✅ Sync with context user
  useEffect(() => {
    if (user) {
      setProfileData(user.profile || {});
      setAccountData(user.account || {});
    }
  }, [user]);

  const departmentOptions = user?.departmentOptions || {};

  // Regex patterns
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // -------- Handlers --------
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!nameRegex.test(profileData.name || "")) {
      showToast("Name must contain only letters!", "danger");
      return;
    }
    try {
      await updateProfile(profileData);
      showToast("Profile updated successfully!");
    } catch (err) {
      showToast("Failed to update profile!", "danger");
    }
  };

  const handleSaveAccount = async () => {
    if (!emailRegex.test(accountData.email || "")) {
      showToast("Please enter a valid email address!", "danger");
      return;
    }
    if (accountData.newPassword && !passwordRegex.test(accountData.newPassword)) {
      showToast(
        "Password must be at least 8 chars, include uppercase, lowercase, number & special char!",
        "danger"
      );
      return;
    }
    if (accountData.newPassword !== accountData.confirmPassword) {
      showToast("New password and confirmation do not match!", "danger");
      return;
    }

    try {
      const data = await updateAccount({
        currentPassword: accountData.currentPassword,
        newPassword: accountData.newPassword,
      });

      showToast(data.message || "Account updated successfully!");
      setAccountData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      showToast(err.message || "Failed to update account!", "danger");
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData(user.profile || {});
      setAccountData(user.account || {});
    }
    showToast("Changes discarded", "secondary");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        const data = await deleteAccount();
        showToast(data.message, "danger");
        setTimeout(() => navigate("/register"), 2000);
      } catch (err) {
        showToast(err.message || "Failed to delete profile!", "danger");
      }
    }
  };

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ show: false, message: "", bg: "success" }), 3000);
  };

  // -------- Render --------
  if (loading) return <p>Loading settings...</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <div className="p-3">
      {/* Toast */}
      <ToastContainer className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <Toast
          show={toast.show}
          bg={toast.bg}
          onClose={() => setToast({ ...toast, show: false })}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* -------- Profile Settings -------- */}
      <h5 className="mb-3 heading-text">Profile Settings</h5>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label className="sub-heading-text">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profileData.name || ""}
            onChange={handleProfileChange}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="sub-heading-text">Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={profileData.bio || ""}
            onChange={handleProfileChange}
          />
        </Form.Group>

        {/* Department Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label className="sub-heading-text">Department</Form.Label>
          <Form.Select
            name="department"
            value={profileData.department || ""}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                department: e.target.value,
                designation: "",
              }))
            }
          >
            <option value="" disabled>
              Select Department
            </option>
            {Object.keys(departmentOptions).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Designation Dropdown */}
        {profileData.department && (
          <Form.Group className="mb-3">
            <Form.Label className="sub-heading-text">Designation</Form.Label>
            <Form.Select
              name="designation"
              value={profileData.designation || ""}
              onChange={handleProfileChange}
            >
              <option value="" disabled>
                Select Designation
              </option>
              {(departmentOptions[profileData.department] || []).map((des) => (
                <option key={des} value={des}>
                  {des}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">
          <div className="d-flex flex-column flex-sm-row gap-2">
            <Button variant="primary" onClick={handleSaveProfile}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <Button variant="danger" onClick={handleDelete}>
            Delete Profile
          </Button>
        </div>
      </Form>
      <hr />

      {/* -------- Account Settings -------- */}
      <h5 className="mb-3 heading-text">Account Settings</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="sub-heading-text">Email</Form.Label>
          <Form.Control type="email" name="email" value={accountData.email || ""} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="sub-heading-text">Current Password</Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            value={accountData.currentPassword || ""}
            onChange={handleAccountChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="sub-heading-text">New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={accountData.newPassword || ""}
            onChange={handleAccountChange}
            placeholder="At least 8 characters"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="sub-heading-text">Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={accountData.confirmPassword || ""}
            onChange={handleAccountChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSaveAccount}>
          Update Account
        </Button>
      </Form>
    </div>
  );
}
