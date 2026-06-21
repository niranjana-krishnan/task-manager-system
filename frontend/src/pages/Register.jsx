import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://task-manager-backend-2l2t.onrender.com/register",
        {
          name,
          email,
          password,
        }
      );

      setMessage("Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Registration Failed!"
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

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

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;