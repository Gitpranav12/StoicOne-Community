import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../components/logo";
import Logo1 from "../../components/logom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Normal backend login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setMessage("Logged in successfully! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  // Google login button
  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google`, "_self");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-3"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="row shadow-lg rounded-4 overflow-hidden bg-white w-100"
        style={{ maxWidth: "900px" }}
      >
        {/* Left Illustration (Desktop) */}
        <div
          className="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center p-4"
          style={{ backgroundColor: "#0d6efd10" }}
        >
          <Logo />
        </div>

        {/* Form + Mobile Image */}
        <div className="col-12 col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center">
          {/* Logo on Mobile (centered and clean) */}
          <div className="d-flex d-md-none justify-content-center mb-4">
            <Logo1/>
          </div>

          <h3 className="text-center mb-4 fw-bold" style={{ color: "#0d6efd" }}>
            Log In
          </h3>

          {message && (
            <p className="text-center mb-3" style={{ color: "red" }}>
              {message}
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Email validation for gmail.com or yahoo.com
              const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
              if (!emailRegex.test(email)) {
                setMessage(
                  "Please enter a valid email address (gmail.com or yahoo.com only)."
                );
                return;
              }
              // Password validation
              const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){2,})(?=.*[@#$%&!]).{8,}$/;
              if (!passwordRegex.test(password)) {
                setMessage(
                  "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 2 numbers, and 1 special character."
                );
                return;
              }
              handleLogin(e);
            }}
          >
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 mb-3"
              style={{ background: "#0d6efd", color: "white" }}
            >
              Log In
            </button>
          </form>
          <button
            className="btn btn-light w-100 border d-flex align-items-center justify-content-center gap-2"
            onClick={googleAuth}
          >
            <i
              className="bi bi-google"
              style={{ fontSize: "1.3rem", color: "#DB4437" }}
            ></i>
            <span>Sign in with Google</span>
          </button>

          <div className="text-center mt-3">
            New here?{" "}
            <Link to="/signup" style={{ color: "#0d6efd", fontWeight: "500" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
