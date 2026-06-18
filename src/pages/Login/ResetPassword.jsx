import { useState } from "react";
import { resetPassword } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(form);
    alert("Password reset successful");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          className="w-full mb-2 p-2 border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="OTP"
          className="w-full mb-2 p-2 border"
          onChange={(e) => setForm({ ...form, otp: e.target.value })}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-2 p-2 border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-500 text-white p-2">
          Reset Password
        </button>
      </form>
    </div>
  );
}