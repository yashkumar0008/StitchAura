import { useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaStar, FaSignOutAlt } from "react-icons/fa";

export default function TailorDashboard() {
  const navigate = useNavigate();

  const Card = ({ icon: Icon, text, button, onClick }: any) => (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition duration-300">
      
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
          <Icon className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-300 text-center mb-6 text-sm sm:text-base leading-relaxed">
        {text}
      </p>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={onClick}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:opacity-90 transition"
        >
          {button}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-10">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 tracking-wide text-center">
        Tailor Dashboard
      </h1>

      {/* Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Profile */}
        <Card
          icon={FaUser}
          text="Save/Update profile to find the best customers near you."
          button="Your Profile"
          onClick={() => navigate("/tailor-profile")}
        />


        {/* Logout */}
        <Card
          icon={FaSignOutAlt}
          text="You can log out of your account here."
          button="Logout"
          onClick={() => navigate("/login")}
        />

      </div>
    </div>
  );
}