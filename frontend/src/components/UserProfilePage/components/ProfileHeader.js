import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { UserContext } from "../context/UserContext";

function ProfileHeader() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!user || !user.profile) {
    return (
      <div className="text-center p-4 border rounded bg-light">
        <p className="mb-0 text-muted">No profile data available.</p>
      </div>
    );
  }

  const { avatar, name, designation, score } = user.profile;

  return (
    <div className="container-fluid mb-4">
      <div className="row align-items-center">
        {/* Avatar + Info */}
        <div className="col-12 col-md-8 d-flex align-items-center mb-3 mb-md-0">
          <img
            src={avatar || "https://i.pravatar.cc/112?img=1"}
            alt={name || "User"}
            className="rounded-circle flex-shrink-0"
            width="112"
            height="112"
          />
          <div className="ms-3">
            <h4 className="mb-0">{name || "Unnamed User"}</h4>
            <p className="mb-0 normal-text text-grey">
              {designation || "No designation"}
            </p>
            <h6 className="mb-0 mt-2 text-primary fw-semibold sub-heading-text">
              <span>Score: </span>{score ?? 0}
            </h6>
          </div>
        </div>
        <div className="col-12 col-md-4 text-md-end text-center">
          <button className="btn btn-outline-dark" onClick={() => navigate("/profile/settings")}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}


export default ProfileHeader;
