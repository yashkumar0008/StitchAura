import { Routes, Route } from "react-router-dom"

{/*  Navbar  */ }
import Navbarmain from "./Components/Navbar/Navbarmain";
import Navbar from "./Components/Navbar/Navbar";

{/*  Auth  */ }
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import VerifyOtp from "./Components/auth/VerifyOtp";
import ForgotPassword from "./Components/auth/ForgetPwd";
import ResetPwdOtp from "./Components/auth/resetPwdOtp";
import ResetPassword from "./Components/auth/resetPwdPage";

{/*  Customer  */ }
import CustomerDashboard from "./Components/Customer/Dashboard_customer";
import CustomerProfile from "./Components/Customer/CustomerProfile";
import FindTailor from "./Components/Customer/FindTailor";
import RateAndReview from "./Components/Customer/RateAndReview";

// import CategoryDressFilter from "./Components/Customer/CategoryDressFilter";
// import ShowCity from "./Components/Customer/ShowCityComponent";


{/*  Tailor  */ }
import TailorDashboard from "./Components/Tailor/Dashboard_tailor";
import TailorProfile from "./Components/Tailor/TailorProfile";
import HomePage from "./Components/Public/Homepage";


function App() {

  return (
    <>
      <Routes>

        {/* 🌐 PUBLIC ROUTES (Navbarmain) */}
        <Route element={<Navbarmain />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* 🔐 AUTH + APP ROUTES (Navbar) */}
        <Route element={<Navbar />}>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-pwd-otp" element={<ResetPwdOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Customer */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/customer-find-tailor" element={<FindTailor />} />
          <Route path="/customer-rating" element={<RateAndReview />} />

          {/* Tailor */}
          <Route path="/tailor-dashboard" element={<TailorDashboard />} />
          <Route path="/tailor-profile" element={<TailorProfile />} />

        </Route>

      </Routes>


      {/* <Navbarmain /> */}
      {/* <Navbar /> */}



      {/* <Signup /> */}
      {/* <Login /> */}

      {/* <CustomerProfile /> */}
      {/* <TailorProfile /> */}

      {/* <RateAndReview /> */}

      {/* <ShowCity /> */}
      {/* <CategoryDressFilter /> */}
      {/* <FindTailor /> */}

    </>
  )
}

export default App
