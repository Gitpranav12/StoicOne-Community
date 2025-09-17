import React, { useState } from "react";
import AnalyticsSection from "./AnalyticsSection";
import ModerationTools from "./ModerationTools";
import UserManagement from "./UserManagement";
import Reports from "./Reports";
import UsersContent from "../user/UsersContent";
import ModeratorContent from "../moderator/ModeratorContent";

// 1. Import the main Layout component
import Layout from "../../Layout/Layout"; // Adjust path if necessary
 
const AdminDashboardPage = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // This function to render the active page remains unchanged
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <AnalyticsSection />
            <ModerationTools limit={3} />
            <UserManagement limit={10} />
            <Reports />
          </>
        );
      case "analytics":
        return (
          <div className="p-3">
            <UsersContent />
          </div>
        );
      case "moderation":
        return (
          <div className="p-3">
            <ModeratorContent />
          </div>
        );
      case "users":
        return (
          <div className="p-3">
            <UserManagement />
          </div>
        );
      case "reports":
        return (
          <div className="p-3">
            <Reports />
          </div>
        );
      default:
        return <div className="p-3">Page not found</div>;
    }
  };

  return (
    // 2. Wrap everything in the Layout component
    <Layout>
      {/* 3. The page-specific content and Footer are placed inside */}
      <>
        <div className="bg-white">
          {/* Top Menu for the Admin section */}
          <nav className="navbar navbar-expand bg-white border-bottom ">
            <div className="container-fluid">
              <span className="navbar-brand fw-bold">Admin Dashboard</span>
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn btn-sm ${
                    activePage === "dashboard"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActivePage("dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className={`btn btn-sm ${
                    activePage === "analytics"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActivePage("analytics")}
                >
                  Analytics
                </button>
                <button
                  className={`btn btn-sm ${
                    activePage === "moderation"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActivePage("moderation")}
                >
                  Moderation
                </button>
                <button
                  className={`btn btn-sm ${
                    activePage === "users"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActivePage("users")}
                >
                  Users
                </button>
                <button
                  className={`btn btn-sm ${
                    activePage === "reports"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActivePage("reports")}
                >
                  Reports
                </button>
              </div>
            </div>
          </nav>

          {/* Render the selected page content */}
          <div className="container-fluid mt-3">{renderPage()}</div>
        </div>
      </>

     </Layout>
  );
};

export default AdminDashboardPage;