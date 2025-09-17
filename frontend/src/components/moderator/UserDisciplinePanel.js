import React, { useState } from "react";
import { Button } from "react-bootstrap";

const initialUsers = [
  { id: 1, name: "Aarav Sharma", status: "Active", warnings: 1, lastAction: "Warning" },
  { id: 2, name: "Ananya Verma", status: "Suspended (7 days)", warnings: 2, lastAction: "Suspension" },
  { id: 3, name: "Aditya Singh", status: "Active", warnings: 0, lastAction: "None" },
  { id: 4, name: "Ishaan Patel", status: "Banned", warnings: 3, lastAction: "Permanent Ban" },
  { id: 5, name: "Aanya Reddy", status: "Active", warnings: 0, lastAction: "None" },
];

export default function UserDisciplinePanel() {
  const [users, setUsers] = useState(initialUsers);

  const handleAction = (id, action) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                action === "warn"
                  ? "Active"
                  : action === "suspend"
                  ? "Suspended (7 days)"
                  : action === "ban"
                  ? "Banned"
                  : "Active", // for "activate"
              warnings: action === "warn" ? user.warnings + 1 : user.warnings,
              lastAction:
                action === "warn"
                  ? "Warning"
                  : action === "suspend"
                  ? "Suspension"
                  : action === "ban"
                  ? "Permanent Ban"
                  : "Restored to Active",
            }
          : user
      )
    );
  };

  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-dark mb-3">User Discipline Panel</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Warnings</th>
              <th>Last Action</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status.includes("Banned")
                        ? "bg-danger"
                        : user.status.includes("Suspended")
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{user.warnings}</td>
                <td>{user.lastAction}</td>
                <td>
                  {user.status === "Banned" ? (
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2 rounded-pill"
                      onClick={() => handleAction(user.id, "activate")}
                    >
                      Active
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2 rounded-pill"
                        onClick={() => handleAction(user.id, "warn")}
                      >
                        Warn
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="me-2 rounded-pill"
                        onClick={() => handleAction(user.id, "suspend")}
                      >
                        Suspend
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="rounded-pill"
                        onClick={() => handleAction(user.id, "ban")}
                      >
                        Ban
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
