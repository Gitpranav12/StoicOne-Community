import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // ✅ use context

// Reusable list component
function LoadMoreList({ items, visible, setVisible, renderItem, step = 5 }) {
  const { user } = useContext(UserContext);

  if (!user) return <p>No user data available.</p>;
  return (
    <div className="card shadow-sm border-0 p-1">
      <div className="card-body p-2 mt-1" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {items.length === 0 ? (
          <p className="text-muted small">No activity yet.</p>
        ) : (
          items.slice(0, visible).map((item, i) => renderItem(item, i))
        )}
      </div>
      {visible < items.length && (
        <div className="card-footer text-center bg-white">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setVisible(visible + step)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default function ActivityTab() {
  const { user, loading } = useContext(UserContext);

  // ⚡ Hooks must be at top
  const [visibleQ, setVisibleQ] = useState(5);
  const [visibleA, setVisibleA] = useState(5);
  const [visibleT, setVisibleT] = useState(5);
  const [visibleR, setVisibleR] = useState(5);

  // ⚡ Conditional rendering after hooks
  if (loading) return <p>Loading user activity...</p>;
  if (!user || !user.activity) return <p>No activity found.</p>;

  return (
    <div className="container-fluid p-3">
      {/* Questions */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="heading-text">Questions</h5>
          <LoadMoreList
            items={user.activity.questions || []}
            visible={visibleQ}
            setVisible={setVisibleQ}
            renderItem={(q, i) => (
              <div
                key={i}
                className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom background-theme"
              >
                <h6 className="mb-1 sub-heading-text">{q.title}</h6>
                <small className="normal-text text-grey">
                  {q.votes} votes • {q.answers} answers
                </small>
              </div>
            )}
          />
        </div>
        {/* Answers */}
        <div className="col-md-6">
          <h5 className="heading-text">Answers</h5>
          <LoadMoreList
            items={user.activity.answers || []}
            visible={visibleA}
            setVisible={setVisibleA}
            renderItem={(a, i) => (
              <div
                key={i}
                className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom background-theme"
              >
                <p className="mb-1">
                  <span className="normal-text text-grey">Answered:</span>{" "}
                  <span className="sub-heading-text">{a.questionTitle}</span>
                </p>
                <span className="normal-text text-grey">{a.votes} votes</span>
              </div>
            )}
          />
        </div>
      </div>

      {/* Tags & Reputation */}
      <div className="row">
        <div className="col-md-6 mt-3 mb-3">
          <h5 className="heading-text">Tags</h5>
          <LoadMoreList
            items={user.activity.tags || []}
            visible={visibleT}
            setVisible={setVisibleT}
            renderItem={(t, i) => (
              <div
                key={i}
                className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom background-theme"
              >
                <span className="sub-heading-text">{t.tag}</span>
                <span className="badge bg-primary rounded-pill normal-text">
                  {t.score}
                </span>
              </div>
            )}
          />
        </div>

        <div className="col-md-6 mt-3 mb-3">
          <h5 className="heading-text">Reputation</h5>
          <LoadMoreList
            items={user.activity.reputation || []}
            visible={visibleR}
            setVisible={setVisibleR}
            renderItem={(r, i) => (
              <div
                key={i}
                className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom background-theme"
              >
                <span className="sub-heading-text">{r.date}</span>
                <span className="normal-text text-grey">{r.changee}</span>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
