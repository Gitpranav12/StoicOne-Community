import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProfileTab() {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div className="container-fluid p-3">
      {/* Stats Section */}
      <div className="stats-section mb-4">
        <h5 className="heading-text">Stats</h5>
        <div className="row">
          {user?.stats &&
            Object.entries(user.stats).map(([key, value], index) => (
              <div className="col text-center" key={index}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title sub-heading-text fw-semibold">{value}</h5>
                    <p className="card-text normal-text">{key}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bio Section */}
      <div className="bio-section mb-4">
        <h5 className="heading-text">Bio</h5>
        <p className="sub-heading-text">{user?.profile?.bio || "No bio available yet."}</p>
      </div>

      {/* Questions Section */}
      <div className="Questions-section">
        <h5 className="heading-text">Questions</h5>
        {user?.activity?.questions?.length > 0 ? (
          user.activity.questions.map((post, index) => (
            <div className="card mb-3 rounded-3" key={index}>
              <div className="card-body background-theme rounded-3">
                <h5 className="card-title sub-heading-text">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-grey normal-text">{post.time}</h6>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No Questions available yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileTab;
