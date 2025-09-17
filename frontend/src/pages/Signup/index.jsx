import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../components/logo";
import Logo1 from "../../components/logom";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google`, "_self");
  };

  // Regex for alphabets and spaces only
  const isAlpha = (str) => /^[A-Za-z\s]+$/.test(str);

  // Regex for allowed email domains
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i;
    return emailRegex.test(email);
  };

  // Password validation
  const isValidPassword = (password) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const digitCheck = (password.match(/\d/g) || []).length >= 2;
    return lengthCheck && upperCheck && lowerCheck && specialCheck && digitCheck;
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
          {/* Logo on Mobile */}
          <div className="d-flex d-md-none justify-content-center mb-4">
            <Logo1 />
          </div>

          <h3 className="text-center mb-4 fw-bold" style={{ color: "#0d6efd" }}>
            Create Account
          </h3>

          {message && (
            <p className="text-center mb-3" style={{ color: "red" }}>
              {message}
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isAlpha(fullName)) {
                setMessage("Full Name should contain alphabets and spaces only.");
                return;
              }
              if (!isValidEmail(email)) {
                setMessage("Email must be gmail.com or yahoo.com only.");
                return;
              }
              if (!isValidPassword(password)) {
                setMessage(
                  "Password must be 8+ chars, 1 uppercase, 1 lowercase, 2 numbers, 1 special char."
                );
                return;
              }
              handleSubmit(e);
            }}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || isAlpha(value)) {
                    setFullName(value);
                  }
                }}
                required
              />
            </div>
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
              Sign Up
            </button>
          </form>

          {/* Google Signup */}
          <button
            className="btn btn-light w-100 border d-flex align-items-center justify-content-center gap-2"
            onClick={googleAuth}
          >
            <i className="bi bi-google" style={{ fontSize: "1.3rem", color: "#DB4437" }}></i>
            <span>Sign up with Google</span>
          </button>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/" style={{ color: "#0d6efd", fontWeight: "500" }}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
