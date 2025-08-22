import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "../../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Local Baba!</h2>
        <p className="login-subtitle">
          Find your perfect room quickly and easily.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Signup Section */}
        <div className="signup-section">
          <p>Don’t have an account?</p>
          <p className="signup-link" onClick={() => navigate("/signup")}>
            Create Account
          </p>
        </div>

        {/* Offer Section */}
        <div className="signup-offer">
          <p>🎉 Special Offer!</p>
          <p className="signup-text">
            Sign up now and get <span>10% off</span> on your first room booking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
