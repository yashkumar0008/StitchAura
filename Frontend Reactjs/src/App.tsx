import { Routes,Route } from "react-router-dom"

{/*  Navbar  */}
import Navbarmain from "./Components/Navbar/Navbarmain";
import Navbar from "./Components/Navbar/Navbar";

{/*  Auth  */}
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";

{/*  Customer  */}
import CustomerDashboard from "./Components/Customer/Dashboard_customer";
import CustomerProfile from "./Components/Customer/CustomerProfile";
import FindTailor from "./Components/Customer/FindTailor";
import RateAndReview from "./Components/Customer/RateAndReview";

import CategoryDressFilter from "./Components/Customer/CategoryDressFilter";
import ShowCity from "./Components/Customer/ShowCityComponent";


{/*  Tailor  */}
import TailorDashboard from "./Components/Tailor/Dashboard_tailor";
import TailorProfile from "./Components/Tailor/TailorProfile";
import HomePage from "./Components/Public/Homepage";


function App() {

  return (
    <>

    

     <Routes>

      {/* Homepage */}
      <Route path="/" element={<Navbarmain />}>
       <Route index element={<HomePage />}></Route>
       </Route>

      {/*  Auth  */}
      <Route path="/" element={<Navbar />}>
       <Route index element={<Signup />}></Route>
       <Route path="/login" element={<Login />}></Route>
       <Route path="/signup" element={<Signup />}></Route>

      {/*  Customer  */}
      <Route path="/customer-dashboard" element={<CustomerDashboard />}></Route>
      <Route path="/customer-profile" element={<CustomerProfile />}></Route>
      <Route path="/customer-find-tailor" element={<FindTailor />}></Route>
      <Route path="/customer-rating" element={<RateAndReview />}></Route>
      <Route path="/login" element={<Login />}></Route>

       {/*  Tailor  */}
      <Route path="/tailor-dashboard" element={<TailorDashboard />}></Route>
      <Route path="/tailor-profile" element={<TailorProfile />}></Route>
      <Route path="/login" element={<Login />}></Route>
      
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
