import React from "react";

const users = [
  { name: "Aarav Sharma", role: "Admin" },
  { name: "Ananya Verma", role: "Moderator" },
  { name: "Aditya Singh", role: "Editor" },
  { name: "Ishaan Patel", role: "Moderator" },
  { name: "Aanya Reddy", role: "Editor" },
  { name: "Vihaan Gupta", role: "Admin" },
  { name: "Saanvi Mehta", role: "Editor" },
  { name: "Kabir Iyer", role: "Moderator" },
  { name: "Diya Nair", role: "Editor" },
  { name: "Arjun Joshi", role: "Moderator" },
  { name: "Anika Choudhary", role: "Editor" },
  { name: "Rohan Malhotra", role: "Admin" },
  { name: "Myra Kapoor", role: "Editor" },
  { name: "Sai Raghavan", role: "Moderator" },
  { name: "Aadhya Bansal", role: "Editor" },
  { name: "Aryan Desai", role: "Moderator" },
  { name: "Tanvi Kulkarni", role: "Editor" },
  { name: "Krishna Nanda", role: "Admin" },
  { name: "Mira Dutta", role: "Editor" },
  { name: "Dev Chatterjee", role: "Moderator" },
  { name: "Shreya Sinha", role: "Editor" },
  { name: "Raghav Menon", role: "Moderator" },
  { name: "Tanya Saxena", role: "Editor" },
  { name: "Karan Tripathi", role: "Admin" },
  { name: "Isha Bhatt", role: "Editor" },
  { name: "Nikhil Rao", role: "Moderator" },
  { name: "Aarohi Nanda", role: "Editor" },
  { name: "Yash Mehra", role: "Moderator" },
  { name: "Riya Kapoor", role: "Editor" },
  { name: "Pranav Singh", role: "Admin" },
  { name: "Anaya Verma", role: "Editor" },
  { name: "Siddharth Iyer", role: "Moderator" },
  { name: "Pooja Reddy", role: "Editor" },
  { name: "Manav Gupta", role: "Moderator" },
  { name: "Naina Choudhary", role: "Editor" },
  { name: "Harsh Malhotra", role: "Admin" },
  { name: "Kiara Dutta", role: "Editor" },
];



const UserManagement = ({ limit }) => {
  // Apply limit if provided
  const displayedUsers = limit ? users.slice(0, limit) : users;

  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-dark mb-3 d-flex justify-content-between align-items-center">
        User Management
        <button className="btn btn-primary btn-sm rounded-pill">Add Moderator</button>
      </h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Moderator Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((u, index) => (
              <tr key={index}>
                <td>{u.name}</td>
                <td>
                  <span
                    className={`badge ${
                      u.role === "Admin"
                        ? "bg-primary"
                        : u.role === "Moderator"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm rounded-pill">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
