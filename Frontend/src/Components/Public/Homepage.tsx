import {useNavigate} from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white">

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight">
          Connecting <span className="text-yellow-500">Customers</span> 
          & <span className="text-yellow-500">Tailors</span> Seamlessly ✂️
        </h1>

        <p className="mt-6 text-slate-400 text-lg">
          A modern platform where customers can discover skilled tailors nearby 
          and tailors can grow their business by connecting with the right audience.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex-col sm:flex-row gap-4 ">
          <button onClick={()=>{navigate("/signup")}} className="m-4 px-6 py-3 border border-yellow-500 text-yellow-500 rounded-xl font-semibold hover:bg-yellow-400 transition duration-300 shadow-lg cursor-pointer" >
            Find Tailors
          </button>

          <button onClick={()=>{navigate("/signup")}} className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-xl font-semibold hover:bg-yellow-500 hover:text-black transition duration-300 cursor-pointer">
            Join Now
          </button>
        </div>
      </section>

      {/* Section 1 */}
      <section className="px-6 py-16 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-yellow-500">
            Designed for Customers
          </h2>

          <p className="mt-4 text-slate-300 leading-relaxed">
            Finding the perfect tailor has never been easier. Explore skilled professionals 
            based on your location, compare their expertise, and choose the one who matches 
            your style and requirements. Whether it's traditional wear or modern fashion, 
            everything is just a few clicks away.
          </p>

          <p className="mt-4 text-slate-400">
            Get high-quality stitching, personalized designs, and a seamless experience 
            tailored just for you.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-yellow-500">
            Built for Tailors
          </h2>

          <p className="mt-4 text-slate-300 leading-relaxed">
            Showcase your tailoring skills and connect with customers who are actively 
            looking for your services. Grow your reach, build your reputation, and 
            manage your profile effortlessly on a platform designed for your success.
          </p>

          <p className="mt-4 text-slate-400">
            Turn your craftsmanship into a thriving business by reaching the right audience 
            at the right time.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="px-6 py-16 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-yellow-500">
            Why Choose Us?
          </h2>

          <ul className="mt-6 space-y-4 text-slate-300">
            <li>✔ Smart search based on city and category</li>
            <li>✔ Verified and skilled tailors</li>
            <li>✔ Easy profile management</li>
            <li>✔ Transparent ratings and reviews</li>
            <li>✔ Modern and user-friendly experience</li>
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-yellow-500">
            A Platform Built for Growth
          </h2>

          <p className="mt-6 text-slate-300 leading-relaxed">
            Our goal is to bridge the gap between customers and talented tailors. 
            We believe in empowering local businesses while providing customers 
            with the best possible service experience.
          </p>

          <p className="mt-4 text-slate-400">
            Whether you're here to find the perfect outfit or grow your tailoring 
            business, this platform is built for you.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 text-center max-w-5xl mx-auto">

      {/* Profile */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg shadow-yellow-500/30 hover:scale-105 transition duration-500">
            <img 
              src="https://res.cloudinary.com/dnuxsfoop/image/upload/v1775726714/IMG-20250728-WA0004_kbrakb.jpg" 
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="mt-4 text-xl text-slate-400">
            Developed by <span className="text-yellow-500 font-semibold">Yash Kumar</span> <br />
            BCA Student, Sri Guru Gobind Singh College, Sector-26, Chandigarh
           <p> Contact - 7988077133 | Gmail - yashdahiya0008@gmail.com </p>
          </p>
        </div>
        </section>

    </div>
  );
}