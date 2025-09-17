import React from "react";
import { Card, Badge } from "react-bootstrap";
import {
  Users,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  MessageSquareText,
} from "lucide-react";

export default function CommunityActivity() {
  // 🔹 Dummy data
  const stats = [
    { icon: <Users size={16} />, label: "users online", value: 10505, color: "success" },
    { icon: <HelpCircle size={16} />, label: "questions", value: 13, color: "dark" },
    { icon: <MessageSquare size={16} />, label: "answers", value: 13, color: "primary" },
    { icon: <MessageSquareText size={16} />, label: "comments", value: 52, color: "secondary" },
    { icon: <ThumbsUp size={16} />, label: "upvotes", value: 106, color: "warning" },
  ];

  const tags = ["maui", "css", "c#", "python", "java", "javascript"];

  const unanswered = {
    title: "MS Teams Messages via a Service",
    tags: ["c#", "microsoft-teams", "microsoft-graph-teams"],
    author: "David Kiff",
    reputation: "1.2k",
    time: "531 days ago",
  };

  return (
    <Card className=" border">
      <Card.Body>
        {/* 🔹 Section 1: Heading */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="heading-text mb-0">Community activity</h6>
          <small className="text-danger">Last 1 hr</small>
        </div>

        {/* 🔹 Section 2: Stats */}
        <div className="pb-3 border-bottom">
          <ul className="list-unstyled mb-0">
            {stats.map((s, idx) => (
              <li key={idx} className="d-flex align-items-center mb-2">
                <span className={`me-2 text-${s.color}`}>{s.icon}</span>
                <span className="normal-text me-1">{s.value}</span>
                <span className="normal-text small">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Section 3: Popular tags */}
        <div className="py-3 border-bottom">
          <div className="mb-2 text-danger sub-heading-text fw-boldn">🔥 Popular tags</div>
          {tags.map((tag, i) => (
            <Badge bg="light" text="dark" pill key={i} className="me-1 mb-1">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 🔹 Section 4: Popular unanswered */}
        <div className="pt-3">
          <div className="mb-2 text-danger sub-heading-text fw-bold">
            🔥 Popular unanswered question
          </div>
          <a
            href="#"
            className="d-block text-primary normal-text mb-2 text-decoration-none"
          >
            {unanswered.title}
          </a>
          <div className="mb-2">
            {unanswered.tags.map((tag, i) => (
              <Badge bg="light" text="dark" pill key={i} className="me-1 mb-1">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="normal-text text-muted">
            {unanswered.author}{" "}
            <span className="normal-text">{unanswered.reputation}</span> •{" "}
            {unanswered.time}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
