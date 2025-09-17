import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [newComment, setNewComment] = useState("");
  const [votePending, setVotePending] = useState(false);

  const username = "CurrentUser";

  // Fetch all data
  const reloadAll = () => {
    setLoading(true);

    // Fetch question
    fetch(`http://localhost:8080/api/questions/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(Array.isArray(data) ? data[0] : data))
      .catch(() => setQuestion(null))
      .finally(() => setLoading(false));

    // Fetch answers
    fetch(`http://localhost:8080/api/questions/${id}/answers`)
      .then((res) => res.json())
      .then((data) => setAnswers(Array.isArray(data) ? data : []))
      .catch(() => setAnswers([]));

    // Fetch comments
    fetch(`http://localhost:8080/api/questions/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]));
  };

  useEffect(reloadAll, [id]);

  // Vote handling
  const handleVote = (voteType) => {
    setVotePending(true);
    fetch("http://localhost:8080/api/questions/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_id: id, voter: username, vote_type: voteType }),
    })
      .then(() => fetch(`http://localhost:8080/api/questions/${id}`))
      .then((res) => res.json())
      .then((data) => setQuestion(Array.isArray(data) ? data[0] : data))
      .finally(() => setVotePending(false));
  };

  // Post answer
  const handlePostAnswer = () => {
    if (!newAnswer.trim()) return;
    fetch("http://localhost:8080/api/questions/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_id: id, author: username, content: newAnswer }),
    }).then(() => {
      setNewAnswer("");
      fetch(`http://localhost:8080/api/questions/${id}/answers`)
        .then((res) => res.json())
        .then((data) => setAnswers(Array.isArray(data) ? data : []));
    });
  };

  // Post comment
  const handlePostComment = () => {
    if (!newComment.trim()) return;
    fetch("http://localhost:8080/api/questions/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_id: id, author: username, content: newComment }),
    }).then(() => {
      setNewComment("");
      fetch(`http://localhost:8080/api/questions/${id}/comments`)
        .then((res) => res.json())
        .then((data) => setComments(Array.isArray(data) ? data : []));
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!question) return <div>Question not found.</div>;

  // Parse tags safely
  let tagsArr = [];
  try {
    tagsArr =
      typeof question.tags === "string"
        ? JSON.parse(question.tags)
        : Array.isArray(question.tags)
        ? question.tags
        : [];
    if (!Array.isArray(tagsArr)) tagsArr = [tagsArr];
  } catch {
    tagsArr = typeof question.tags === "string" ? question.tags.split(",").map((t) => t.trim()) : [];
  }

  return (
    <div className="container my-4">
      <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
        &larr; Back to Questions
      </button>

      <div className="card">
        <div className="card-body">
          <h2 className="mb-3 text-primary">{question.title}</h2>
          <div className="mb-3" dangerouslySetInnerHTML={{ __html: question.bodyHtml }} />
          <div className="mb-3">
            {tagsArr.map((tag, idx) => (
              <span className="badge bg-secondary me-2" key={idx}>
                {tag}
              </span>
            ))}
          </div>
          <div className="small text-muted mb-3">
            By {question.author} • {question.time} • {question.views} views
          </div>

          <div className="d-flex mb-2 align-items-center gap-3">
            <button
              className="btn btn-outline-success btn-sm"
              disabled={votePending}
              onClick={() => handleVote(1)}
            >
              ▲
            </button>
            <span>
              <strong>{question.votes}</strong> votes
            </span>
            <button
              className="btn btn-outline-danger btn-sm"
              disabled={votePending}
              onClick={() => handleVote(-1)}
            >
              ▼
            </button>
            <span>
              <strong>{answers.length}</strong> answers
            </span>
          </div>
          <hr />
          <div>
            <span className="me-2 fw-semibold">Member since:</span>
            <span>2025</span>
          </div>
        </div>
      </div>

      {/* Post Answer */}
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title mb-3">Your Answer</h5>
          <textarea
            className="form-control mb-2"
            value={newAnswer}
            rows={3}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer here..."
          />
          <button className="btn btn-primary" onClick={handlePostAnswer}>
            Post Answer
          </button>
        </div>
      </div>

      {/* List Answers */}
      <div className="my-3">
        <h4>Answers</h4>
        {answers.length === 0 && <div className="text-muted">No answers yet.</div>}
        {answers.map((a) => (
          <div className="card mb-2" key={a.id}>
            <div className="card-body">
              <div>{a.content}</div>
              <div className="small text-muted mt-2">
                By {a.author}, posted {new Date(a.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title mb-3">Add Comment</h5>
          <input
            className="form-control mb-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button className="btn btn-secondary" onClick={handlePostComment}>
            Post Comment
          </button>
        </div>
      </div>

      {/* List Comments */}
      <div className="my-3">
        <h6>Comments</h6>
        {(!Array.isArray(comments) || comments.length === 0) && (
          <div className="text-muted">No comments yet.</div>
        )}
        {Array.isArray(comments) &&
          comments.map((c) => (
            <div className="mb-1" key={c.id}>
              <b>{c.author}</b>: {c.content}{" "}
              <span className="text-muted small">
                ({new Date(c.createdAt).toLocaleString()})
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
