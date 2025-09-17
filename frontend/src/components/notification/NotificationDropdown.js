import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([
    { id: 1, user: "John Doe", text: "answered your question on React performance.", time: "2 mins ago", avatar: "https://ui-avatars.com/api/?name=John+Doe", read: false },
    { id: 2, user: "Sarah Lee", text: "liked your answer on Tailwind CSS setup.", time: "1 hour ago", avatar: "https://ui-avatars.com/api/?name=Sarah+Lee", read: false },
    { id: 3, user: "John Doe", text: "answered your question on React performance.", time: "2 mins ago", avatar: "https://ui-avatars.com/api/?name=John+Doe", read: false },
    { id: 4, user: "Sarah Lee", text: "liked your answer on Tailwind CSS setup.", time: "1 hour ago", avatar: "https://ui-avatars.com/api/?name=Sarah+Lee", read: false },
  ]);

  // Mark all as read
  const markAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Dropdown align="end">
      {/* Bell Icon Only (no caret) */}
      <Dropdown.Toggle
        as="div"
        id="dropdown-notifications"
        className="border-0 bg-transparent position-relative dropdown-toggle"
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-bell fs-5"></i>
        {notifications.some((n) => !n.read) && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge bg-primary"
            style={{
              fontSize: "12px",
              borderRadius: "50%",
              minWidth: "20px",
              height: "20px",
              lineHeight: "14px",
              textAlign: "center",
            }}
          >
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </Dropdown.Toggle>

      {/* Popup */}
      <Dropdown.Menu
        style={{
          width: "360px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)", // elevation
          border: "none",
        }}
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <span className="fw-bold">New notifications</span>
          <div>
            <button
              className="btn  btn-sm btn-outline-primary me-1"
              style={{ fontSize: "14px" }}
              onClick={markAsRead}
            >
              Mark as Read
            </button>

          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="px-3 py-3 text-center text-muted">
            No new notifications
          </div>
        ) : (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {notifications.map((n) => (
  <div
    key={n.id}
    className="d-flex align-items-start px-3 py-2 border-bottom notification-item"
  >
    <img
      src={n.avatar}
      alt={n.user}
      className="rounded-circle me-2"
      width="28"
      height="28" // smaller avatar
    />
    <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
      <div>
        <strong>{n.user}</strong> {n.text}
      </div>
      <small className="text-muted" style={{ fontSize: "11px" }}>
        {n.time}
      </small>
    </div>
  </div>
))}


          </div>
        )}
      </Dropdown.Menu>

    </Dropdown>
  );
}
