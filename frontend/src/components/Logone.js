import React from "react";
import { Link } from "react-router-dom";
import "../components/Logone.css";

export default function Logone() {
  return (
    <>
      <div className="logone-container">
        <div className="logone-text">
          <span className="blue">Stoic</span>
          <img src="/logo-modified.png" alt="O Logo" className="logone-o" />
          <span className="black">ne</span>
        </div>
        <span className="fw-400 text-muted">Community</span>
      </div>
    </>
  );
}
