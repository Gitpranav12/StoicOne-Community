import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../css/Profile.css";

export default function AchievementsTab() {
  const { user, loading } = useContext(UserContext);

  // ⚡ Hooks (if any) must be here at top level

  // ⚡ Conditional rendering for loading / no data
  if (loading) return <p>Loading achievements...</p>;
  if (!user || !user.achievements) return <p>No achievements found.</p>;

  const badges = user.achievements.badges || [];
  const milestones = user.achievements.milestones || [];

  return (
    <div className="container-fluid p-3">
      {/* Badges Grid */}
      <h5 className="mb-3 heading-text">Badges</h5>
      <div className="row">
        {badges.length > 0 ? (
          badges.map((badge) => (
            <div key={badge.id} className="col-md-4 col-sm-6 mb-3">
              <div className="card h-100 p-3 text-center shadow-sm">
                <span className="fs-2">{badge.icon}</span>
                <h6 className="mt-2 sub-heading-text">{badge.name}</h6>
                <p className="small mb-0 normal-text text-grey">{badge.desc}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No badges earned yet.</p>
        )}
      </div>

      {/* Milestones Grid with Progress */}
      <h5 className="mt-4 mb-3 heading-text">Milestones</h5>
      <div className="row">
        {milestones.length > 0 ? (
          milestones.map((m) => (
            <div key={m.id} className="col-md-6 mb-3">
              <div className="card p-3 shadow-sm">
                <span className="sub-heading-text">{m.title}</span>
                <p className="mb-1 text-muted small normal-text">{m.date}</p>

                {/* Progress Bar */}
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${m.progress}%` }}
                    aria-valuenow={m.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <small className="text-muted normal-text text-grey">
                  {m.progress}% Completed
                </small>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No milestones reached yet.</p>
        )}
      </div>
    </div>
  );
}
