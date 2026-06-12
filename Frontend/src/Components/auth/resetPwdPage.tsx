import { useState } from "react";
import axios from "axios";
import Loader from "../Common/Spinner";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const email = localStorage.getItem("resetEmail");

      await axios.post("https://stitch-aura.vercel.app/user/reset-password", {
        emailid: email,
        pwd: password,
      });

      alert("Password reset successful! Please login with your new password.");

      navigate("/");

    } catch (err: any) {
      setMsg(err.response?.data?.msg || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-black to-slate-800 px-4">

      <Loader show={loading} text="Updating Password..." />

      <form onSubmit={resetPassword}
        className="w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur-xl p-8 shadow-2xl border border-slate-700">

        <h1 className="text-center text-3xl font-bold text-white">Reset Password</h1>

        <p className="mt-2 text-center text-sm text-slate-400">
          Enter your new password
        </p>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-6 rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
        />

        {msg && <p className="text-red-400 mt-3 text-center">{msg}</p>}

        <button className="mt-6 w-full bg-yellow-500 text-black py-2.5 rounded-lg font-semibold hover:scale-[1.02]">
          Reset Password
        </button>
      </form>
    </main>
  );
}