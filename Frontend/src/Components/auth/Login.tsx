import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

interface LoginFormState {
  emailid: string;
  pwd: string;
}

const INITIAL_STATE: LoginFormState = {
  emailid: "",
  pwd: "",
};

export default function Login() {
  const [form, setForm] = useState<LoginFormState>(INITIAL_STATE);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let url = "https://stitch-aura.vercel.app/user/loginaxios";

      let response = await axios.post(url, form, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

      let jwt=response.data.token;
    localStorage.setItem("token",jwt);

      const role= response.data.usertype;

        if (role === "customer") {
      navigate("/customer-dashboard");
    } else if (role === "tailor") {
      navigate("/tailor-dashboard");
    }
    else{
      setError(response.data.msg);
    }

    } catch (err: any) {
      setError(err.response?.data?.msg || "Login Failed");
    }
  };

  function doNavigate(url: string) {
    navigate("/" + url);
  }


  return (
    <main className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-slate-900 via-black to-slate-800 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl 
    bg-slate-900/70 backdrop-blur-xl 
    p-8 shadow-2xl border border-slate-700"
      >
        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-white tracking-wide">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-center text-sm text-slate-400">
          Login to manage your stitching orders and profile
        </p>

        <p className="mt-1 text-center text-xs text-slate-500">
          Secure access for Tailors & Customers
        </p>

        {/* Email */}
        <div className="mt-6">
          <p className="mb-1 text-sm font-medium text-slate-300">Email</p>
          <input
            type="email"
            name="emailid"
            value={form.emailid}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-600 
        px-4 py-2 text-white placeholder-slate-400
        outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <div className="flex justify-between">
            <p className="mb-1 text-sm font-medium text-slate-300">Password</p>
            <span className="text-xs text-slate-400 cursor-pointer hover:text-yellow-500 transition">
              Forgot?
            </span>
          </div>

          <input
            type="password"
            name="pwd"
            value={form.pwd}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-600 
        px-4 py-2 text-white placeholder-slate-400
        outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg 
      bg-gradient-to-r from-yellow-500 to-amber-600 
      py-2.5 font-semibold text-black 
      transition duration-300 
      hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/30"
        >
          Login
        </button>

        {/* Divider */}
        <div className="mt-6 text-center text-xs text-slate-500">
          ───────── or ─────────
        </div>

        {/* Signup */}
        <p className="mt-4 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <span
            onClick={() => doNavigate("Signup")}
            className="cursor-pointer font-semibold text-yellow-500 hover:underline">
            Create Account
          </span>
        </p>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-slate-500">
          By logging in, you agree to our Terms & Privacy Policy
        </p>

      </form>
    </main>);
}



