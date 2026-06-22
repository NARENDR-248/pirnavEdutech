import { useState } from "react";
import { changePassword } from "../services/authApi";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(form, token);
    alert("Password changed successfully");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          className="w-full mb-2 p-2 border"
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-2 p-2 border"
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <button className="w-full bg-purple-500 text-white p-2">
          Change Password
        </button>
      </form>
    </div>
  );
}