import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function NavbarMain() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Tailor<span className="text-purple-500">Hub</span>
          </h1>

        </div>
      </nav>
      
        <Outlet />

      <Footer />
    </>
  );
}