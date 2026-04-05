export default function HomePage() {
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

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-slate-700 text-center text-slate-500">
        © 2026 Tailor Finder. Crafted with precision ✂️
      </footer>

    </div>
  );
}