import { useState } from "react";
import axios from "axios";
import { useNavigate ,Outlet} from 'react-router-dom'


interface SignupFormState {
  emailid: string;
  pwd: string;
  usertype: string;
}

const INITIAL_STATE: SignupFormState = {
  emailid: "",
  pwd: "",
  usertype: "",
};

export default function Signup() {
  const [form, setForm] = useState<SignupFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<SignupFormState>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let err: Partial<SignupFormState> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/;


    if (!form.emailid) err.emailid = "Email is required";
    else if (!emailRegex.test(form.emailid))
      err.emailid = "Invalid email format";

    if (!form.pwd) {
      err.pwd = "Password is required";
    } else if (!passwordRegex.test(form.pwd)) {
      err.pwd = "Password must be at least 8 characters, include lowercase, number & symbol (-!@#$%^&*?)";
    }

    if (!form.usertype) err.usertype = "Please select user type";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let url = "https://stitch-aura.vercel.app/user/signupaxios";

      let response = await axios.post(url, form, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      alert(response.data.msg)
    }
    catch (err: any) {
      alert(err.response.data.msg);
    }
  };


    function doNavigate(url:string)
    {
      navigate("/"+url);
    }

  

  return (
    <>
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur-xl 
    p-8 shadow-2xl border border-slate-700"
      >
        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-white tracking-wide">
          Create Account
        </h1>
        <p className="mt-1 text-center text-sm text-slate-400">
          Sign up as Tailor or Customer
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
          {errors.emailid && (
            <p className="mt-1 text-xs text-red-400">{errors.emailid}</p>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <p className="mb-1 text-sm font-medium text-slate-300">Password</p>
          <input
            type="password"
            name="pwd"
            value={form.pwd}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-600 
        px-4 py-2 text-white placeholder-slate-400
        outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
          {errors.pwd && (
            <p className="mt-1 text-xs text-red-400">{errors.pwd}</p>
          )}
        </div>

        {/* User Type */}
        <div className="mt-4">
          <p className="mb-1 text-sm font-medium text-slate-300">User Type</p>
          <select
            name="usertype"
            value={form.usertype}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-600 
        px-4 py-2 text-white
        outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          >
            <option value="">Select user type</option>
            <option value="tailor">Tailor</option>
            <option value="customer">Customer</option>
          </select>
          {errors.usertype && (
            <p className="mt-1 text-xs text-red-400">{errors.usertype}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 
      py-2.5 font-semibold text-black transition duration-300 
      hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/30"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="mt-6 text-center text-xs text-slate-500">
          ───────── or ─────────
        </div>


        {/* Login */}
        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span 
          onClick={()=>doNavigate("Login")}
          className="cursor-pointer font-semibold text-yellow-500 hover:underline">
            Login
          </span>
        </p>
      </form>
    </main>
    <Outlet></Outlet>
    </>
  );
}

