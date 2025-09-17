import React from "react";

const AnalyticsPanel = ({ title, children }) => {
  return (
    <div className="card flex-fill bg-light border shadow-sm">
      <div className="card-body p-3">
        <h3 className="h6 fw-semibold text-dark mb-2">{title}</h3>
        <div className="text-secondary small">{children}</div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
