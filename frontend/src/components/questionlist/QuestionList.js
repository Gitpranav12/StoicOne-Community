import React, { useState } from "react";
import QuestionCard from "./QuestionCard";

export default function QuestionsList({ questions }) {
  const questionsData = questions ?? JSON.parse(localStorage.getItem("questions_list") || "[]");
  const sampleQuestions = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    votes: Math.floor(Math.random() * 10),
    answers: Math.floor(Math.random() * 5),
    views: Math.floor(Math.random() * 1000),
    title: `Sample Question Title ${i + 1}`,
    excerpt:
      "This is a short description of the question. It gives some context about the issue.",
    tags: ["javascript", "react", "bootstrap"],
    author: "User123",
    time: `${Math.floor(Math.random() * 10)} mins ago`,
  }));

  const displayQuestions = questionsData.length > 0 ? questionsData : sampleQuestions;

  // Filter state
  const [filterTag, setFilterTag] = useState(null);

  // Tag filtering logic
  const filtered = filterTag
    ? displayQuestions.filter(q => {
        const tags = Array.isArray(q.tags)
          ? q.tags
          : typeof q.tags === "string"
            ? (() => { try { return JSON.parse(q.tags); } catch { return q.tags.split(",").map(t=>t.trim()); } })()
            : [];
        return tags.includes(filterTag);
      })
    : displayQuestions;

  return (
    <div className="container my-4">
      {filterTag && (
        <div className="mb-3">
          <span className="badge bg-primary me-2">{filterTag}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setFilterTag(null)}
          >
            Clear Filter
          </button>
        </div>
      )}
      {filtered.map((q, idx) => (
        <QuestionCard
          key={idx}
          question={q}
          onTagClick={setFilterTag}
        />
      ))}
    </div>
  );
}
