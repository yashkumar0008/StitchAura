import { useNavigate,Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function NavbarMain() {

const navigate = useNavigate();

  return (
    <>
    <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Stitch<span className="text-purple-500">Aura</span>
        </h1>

        {/* Menu */}
        <div className="flex items-center gap-4 text-gray-300">

          {/* Buttons */}
          <button
            type="submit"
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition"
          >
            Signup
          </button>

          <button
            type="submit"
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition"
          >
            Login
          </button>

        </div>
      </div>
    </nav>
    
    <div>
    <Outlet />
    </div>

    <Footer></Footer>
    </>
  );
}