import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://task-manager-backend-2l2t.onrender.com/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      setMessage("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      setMessage("Invalid Email or Password!");
      console.log(error);
    }
  };

  return (
  <div className="login-container">
    <h2>Task Manager</h2>

    <p className="subtitle">
      Welcome back! Sign in to continue
    </p>

    {message && (
      <p
        className={
          message.includes("Successful")
            ? "success-message"
            : "error-message"
        }
      >
        {message}
      </p>
    )}

    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button onClick={handleLogin}>
      Login
    </button>

    <p>
      Don't have an account?
      <a href="/register"> Register</a>
    </p>
  </div>
);
}

export default Login;