import "./Register.css";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [message, setMessage] = useState("");
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
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
    setMessage("Registration Failed!");
    console.log(error);
  }
};

  return (
    <div className="register-container">
      <h2>Register Page</h2>
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
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>
      <p>
  Already have an account?
  <a href="/"> Login</a>
</p>
    </div>
  );
}

export default Register;