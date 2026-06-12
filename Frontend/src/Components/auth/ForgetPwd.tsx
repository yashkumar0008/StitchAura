import { useState } from "react";
import axios from "axios";
import Loader from "../Common/Spinner";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    let response = await axios.post("https://stitch-aura.vercel.app/user/send-otp-reset", {
      emailid: email,
    });
    

    if (response.data.status) {
      alert(response.data.msg);
      localStorage.setItem("resetEmail", email);
      navigate("/reset-pwd-otp");
    } else {
      setMsg(response.data.msg || "Something went wrong");
    }

  } catch (err: any) {
    console.log(err); // Terminal me error dekhne ke liye
    setMsg(err.response?.data?.msg || "Error sending OTP");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-black to-slate-800 px-4">

      <Loader show={loading} text="Sending OTP..." />

      <form onSubmit={sendOtp}
        className="w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur-xl p-8 shadow-2xl border border-slate-700">

        <h1 className="text-center text-3xl font-bold text-white">Forgot Password</h1>

        <p className="mt-2 text-center text-sm text-slate-400">
          Enter your email to receive OTP
        </p>

        <div className="mt-6">
          <p className="text-sm text-slate-300">Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
        </div>

        {msg && <p className="text-red-400 mt-3 text-center">{msg}</p>}

        <button className="mt-6 w-full bg-yellow-500 text-black py-2.5 rounded-lg font-semibold hover:scale-[1.02]">
          Send OTP
        </button>
      </form>
    </main>
  );
}