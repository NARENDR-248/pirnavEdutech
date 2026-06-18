import { useState } from "react";
import { forgotPassword } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ email });
    alert("OTP sent to email");
    navigate("/reset-password");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-3 p-2 border"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-2">
          Send OTP
        </button>
      </form>
    </div>
  );
}