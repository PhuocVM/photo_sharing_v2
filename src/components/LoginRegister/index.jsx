import React, { useState } from "react";
import { postModel } from "../../lib/fetchModelData";

function LoginRegister({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  // Login
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  // Register
  const [regLoginName, setRegLoginName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await postModel("/admin/login", {
        login_name: loginName,
        password: password,
      });
      
      if (response && response._id) {
        localStorage.setItem("user", JSON.stringify(response));
        onLoginSuccess(response);
      }
    } catch (err) {
      setError("Login failed!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (regPassword !== regPasswordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await postModel("/user", {
        login_name: regLoginName,
        password: regPassword,
        first_name: regFirstName,
        last_name: regLastName,
        location: "",
        description: "",
        occupation: "",
      });

      if (response && response._id) {
        setIsRegister(false);
        setLoginName(regLoginName);
        setPassword(regPassword);
        setRegLoginName("");
        setRegPassword("");
        setRegPasswordConfirm("");
        setRegFirstName("");
        setRegLastName("");
      }
    } catch (err) {
      setError("Registration failed!");
    }
  };

  if (!isRegister) {
    // Login Form
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Photo App</h1>
          <input
            type="text"
            placeholder="Login Name"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
          <p>
            New user? <a onClick={() => setIsRegister(true)}>Register here</a>
          </p>
        </form>
      </div>
    );
  } else {
    // Register Form
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="Login Name"
            value={regLoginName}
            onChange={(e) => setRegLoginName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={regPasswordConfirm}
            onChange={(e) => setRegPasswordConfirm(e.target.value)}
          />
          <input
            type="text"
            placeholder="First Name"
            value={regFirstName}
            onChange={(e) => setRegFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={regLastName}
            onChange={(e) => setRegLastName(e.target.value)}
          />
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
          <p>
            Have an account? <a onClick={() => setIsRegister(false)}>Login here</a>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginRegister;
