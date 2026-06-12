import { useState } from "react";
import axios from "axios";
import CityCombo from "../Customer/ShowCityComponent";
import CategoryDress from "../Customer/CategoryDressFilter";
import Loader from "../Common/Spinner";

export default function FindTailor() {

    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [dress, setDress] = useState("");
    const [loading, setLoading] = useState(false);

    const [tailors, setTailors] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedTailor, setSelectedTailor] = useState<any | null>(null);

    const limit = 6;

    async function fetchTailors(pageNumber = 1) {

        try {
            setLoading(true);

        let token = localStorage.getItem("token");
        
        const res = await axios.post("http://localhost:2007/tailor/tailor-data", {
                city,
                category,
                dress,
                page: pageNumber,
                limit}, {headers: {'authorization': `Bearer ${token}`} });

        setTailors(res.data.data);

        setTotalPages(Math.ceil(res.data.total / limit));

        setPage(pageNumber);
        } catch (error) {
            alert("Error fetching tailors");
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col lg:flex-row p-4 lg:p-6 gap-6">

                <Loader show={loading} text="Finding Tailors..." />

                {/* LEFT SIDE FILTER */}
                <div className="w-full lg:w-80 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">

                    {/* HEADING */}
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Discover Tailors Near You
                    </h2>

                    <CityCombo value={city} onChange={setCity} />

                    <CategoryDress
                        onSelectDress={(data) => {
                            setCategory(data.category);
                            setDress(data.speciality);
                        }}
                    />

                    <button
                        onClick={() => fetchTailors(1)}
                        className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:scale-105 transition"
                    >
                        Find Tailor
                    </button>
                </div>

                {/* RIGHT SIDE CARDS */}
                <div
                    className={`flex-1 transition-all duration-300 ${selectedTailor ? "blur-sm pointer-events-none" : ""
                        }`}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tailors.map((t) => (
                            <div
                                key={t.emailid}
                                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl hover:scale-105 transition text-center flex flex-col items-center"
                            >
                                <img
                                    src={t.profilepic}
                                    alt={t.name}
                                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-800 shadow-lg mx-auto"
                                />

                                <h3 className="text-white font-bold text-lg mt-4">{t.name}</h3>

                                <p className="text-slate-400 text-sm">{t.emailid}</p>

                                <p className="text-slate-400 text-sm mb-4">{t.contact}</p>

                                <button
                                    onClick={() => setSelectedTailor(t)}
                                    className="mt-auto w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                                >
                                    View Full Detail
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-center mt-10 gap-3">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => fetchTailors(i + 1)}
                                className={`px-4 py-2 rounded-xl ${page === i + 1
                                    ? "bg-indigo-600 text-white"
                                    : "bg-slate-800 text-white hover:bg-slate-700"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* DETAIL MODAL */}
            {selectedTailor && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4">

                    <div className="relative w-full max-w-md sm:max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto p-6">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedTailor(null)}
                            className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition"
                        >
                            ✕
                        </button>

                        {/* Profile Image */}
                        <div className="flex justify-center">
                            <img
                                src={selectedTailor.profilepic || "/default-profile.png"}
                                alt={selectedTailor.name}
                                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-800 shadow-lg"
                            />
                        </div>

                        {/* Name */}
                        <div className="text-center mt-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                {selectedTailor.name}
                            </h2>
                        </div>

                        {/* Details */}
                        <div className="mt-6 space-y-3 text-slate-300 text-sm sm:text-base">

                            <p><span className="text-white font-semibold">Email:</span> {selectedTailor.emailid}</p>

                            <p><span className="text-white font-semibold">Contact:</span> {selectedTailor.contact}</p>

                            <p><span className="text-white font-semibold">Category:</span> {selectedTailor.category}</p>

                            <p><span className="text-white font-semibold">Speciality:</span> {selectedTailor.speciality}</p>

                            <p><span className="text-white font-semibold">Since:</span> {selectedTailor.since}</p>

                            <p><span className="text-white font-semibold">Address:</span> {selectedTailor.shopaddress}</p>

                            <p><span className="text-white font-semibold">City:</span> {selectedTailor.shopcity}</p>

                            {selectedTailor.social && (
                                <p>
                                    <span className="text-white font-semibold">Social:</span>{" "}
                                    <a
                                        href={selectedTailor.social}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:underline"
                                    >
                                        Visit Profile
                                    </a>
                                </p>
                            )}

                        </div>

                    </div>
                </div>
            )}
        </>
    );
}