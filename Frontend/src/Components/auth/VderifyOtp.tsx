import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

   useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    try {
      let res = await axios.post("https://stitch-aura.vercel.app/user/verify-otp", {
        emailid: email,
        otp: otp,
      });

      alert(res.data.msg);

      if (res.data.status) {
        navigate("/login");
      }
    } catch (err: any) {
      alert(err.response?.data?.msg || "Error verifying OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-slate-900 p-8 rounded-xl w-80">
        <h2 className="text-xl mb-4 text-center">Verify OTP</h2>

        <p className="text-sm text-gray-400 mb-3">
          OTP sent to: {email}
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 rounded bg-slate-800 mb-4"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-yellow-500 text-black py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
}