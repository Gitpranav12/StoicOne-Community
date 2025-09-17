import React, { useEffect, useState } from "react";
import AnalyticsPanel from "./AnalyticsPanel";

const AnalyticsSection = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetch("/data/analyticsData.json")
      .then((res) => res.json())
      .then((data) => setAnalyticsData(data))
      .catch((err) => console.error("Error loading analytics data:", err));
  }, []);

  if (!analyticsData) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-dark mb-3">Analytics</h2>

      <div className="row g-3">
        <div className="col-12 col-md-4">
    <AnalyticsPanel title="Active Users">
      <span className="fw-bold text-primary fs-1">
        {analyticsData.activeUsers}
      </span>
    </AnalyticsPanel>
  </div>
        <div className="col-12 col-md-4">
          <AnalyticsPanel title="Top Contributors">
            <ol className="list-decimal ps-3 mb-0">
              {analyticsData.topContributors.map((user, index) => (
                <li key={index} className="fw-semibold">
                  {user}
                </li>
              ))}
            </ol>
          </AnalyticsPanel>
        </div>

        <div className="col-12 col-md-4">
          <AnalyticsPanel title="Trending Topics">
            <ul className="ps-3 mb-0">
              {analyticsData.trendingTopics.map((topic, index) => (
                <li key={index} className="fw-semibold text-success">
                  #{topic}
                </li>
              ))}
            </ul>
          </AnalyticsPanel>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
