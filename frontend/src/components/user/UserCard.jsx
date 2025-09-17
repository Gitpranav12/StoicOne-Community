import { Card, Badge } from "react-bootstrap";

export default function UserCard({ user }) {
  return (
    <Card
      className="d-flex flex-row align-items-center p-3 mb-3 user-card-hover"
      style={{ borderRadius: "12px" }}
    >
      {/* profile icon */}
      <img
        src={user.avatar}
        alt={user.name}
        className="rounded-circle me-3"
        style={{ width: "60px", height: "60px", objectFit: "cover" }}
      />
      {/* name, designation, score */}
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-semibold">{user.name}</h6>
        <small className="text-muted d-block mb-1">{user.designation}</small>
        <span className="fw-bold text-primary me-2">Score: {user.score}</span>
        {/* tags */}
        <div className="mt-2">
          {user.tags.map((tag, index) => (
            <Badge
              bg="primary"
              key={index}
              className="me-1 mb-1 text-light"
              style={{ fontSize: "0.75rem", padding: "0.25em 0.5em" }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
