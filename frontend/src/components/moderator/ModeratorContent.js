import React, { useState } from "react";
import ModerationTools from "../admin/ModerationTools";
import UserDisciplinePanel from "./UserDisciplinePanel";

export default function ModeratorContent() {
  const [activePage, setActivePage] = useState("flagged");

  // Render page on button click
  const renderPage = () => {
    switch (activePage) {
      case "flagged":
        return <ModerationTools />;
      case "discipline":
        return <UserDisciplinePanel />;
      default:
        return <div className="p-3">Page not found</div>;
    }
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* Top Menu */}
      <nav className="navbar navbar-expand bg-white border-bottom shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Moderator Dashboard</span>

          {/* Buttons */}
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${
                activePage === "flagged"
                  ? "btn-primary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActivePage("flagged")}
            >
              Flagged Content Review
            </button>
            <button
              className={`btn btn-sm ${
                activePage === "discipline"
                  ? "btn-primary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActivePage("discipline")}
            >
              User Discipline Panel
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container-fluid mt-3">{renderPage()}</div>
    </div>
  );
}
