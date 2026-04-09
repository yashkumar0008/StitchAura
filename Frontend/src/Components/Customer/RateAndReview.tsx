import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Loader from "../Common/Spinner";

interface ReviewState {
    mobile: string;
    star: number;
    review: string;
}

const INITIAL_STATE: ReviewState = {
    mobile: "",
    star: 0,
    review: "",
};

export default function RateAndReview() {
    const [form, setForm] = useState<ReviewState>(INITIAL_STATE);
    const [tailorName, setTailorName] = useState("");
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);

    // Universal change handler (object theme)
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Fetch tailor name by mobile
    async function fetchTailor() {
        if (form.mobile.trim().length !== 10) {
            setTailorName("");
            return;
        }

        try {
            setLoading(true);

            let token = localStorage.getItem("token");

            const resp = await axios.post(
                "https://stitch-aura.vercel.app/tailor/findtailorbymobile",
                { mobile: form.mobile },
                { headers: { 'authorization': `Bearer ${token}` } });

            if (resp.data.status) {
                setTailorName(resp.data.doc.name);
            } else {
                setTailorName("No Tailor Found");
            }
        } catch (err) {
            console.log(err);
            setTailorName("Server Error");
        } finally {
            setLoading(false);
        }
    }

    // Auto search after typing (debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTailor();
        }, 800);

        return () => clearTimeout(timer);
    }, [form.mobile]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.mobile || !form.star || !form.review) {
            alert("Please fill all fields");
            return;
        }

        try {
            setSubmitLoading(true);

            const resp = await axios.post(
                "https://stitch-aura.vercel.app/review/addreview",
                form
            );

            alert(resp.data.msg);

            setForm(INITIAL_STATE);
            setTailorName("");
        } catch (error) {
            alert("Error submitting review");
        } finally {
            setSubmitLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex justify-center items-center p-6">
                <Loader show={submitLoading} text="Submitting Review..." />
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/40 rounded-3xl p-10"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-2 tracking-wide">
                    Share Your Experience
                </h2>
                <p className="text-center text-slate-400 mb-8 text-sm tracking-wide">
                    Help others by rating and reviewing the tailor
                </p>

                {/* MOBILE INPUT */}
                <div className="mb-6">
                    <label className="text-sm text-slate-300">
                        Enter Mobile Number
                    </label>

                    <input
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full mt-2 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        placeholder="Enter 10 digit mobile"
                    />

                    {/* Dynamic Name Div */}
                    {form.mobile && (
                        <div className="mt-4 flex justify-center">
                            <div className="px-6 py-4 rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg shadow-indigo-900/30 backdrop-blur-xl text-center transition-all duration-500">
                                {loading ? (
                                    <p className="text-slate-400 text-sm animate-pulse">
                                        Searching tailor...
                                    </p>
                                ) : tailorName && tailorName !== "No Tailor Found" ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-indigo-400 font-bold text-xl tracking-wide">
                                            {tailorName}
                                        </span>

                                        {/* Attractive Tick */}
                                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 shadow-lg shadow-green-500/40 animate-bounce">
                                            ✓
                                        </span>
                                    </div>
                                ) : (
                                    <p className="text-red-400 text-sm">
                                        No Tailor Found
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* STAR RATING */}
                <div className="mb-6">

                    <div className="text-center mb-3">
                        <p className="text-slate-300 text-sm tracking-wide uppercase">
                            Give Star Rating
                        </p>


                    </div>

                    <div className=" bg-slate-800/50 py-4 rounded-2xl border border-slate-700 backdrop-blur-md">
                        <div className="w-full flex justify-center gap-3">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <FaStar
                                    key={num}
                                    size={34}
                                    onClick={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            star: num,
                                        }))
                                    }
                                    onMouseEnter={() => setHover(num)}
                                    onMouseLeave={() => setHover(0)}
                                    className={`cursor-pointer transition-all duration-300 ${(hover || form.star) >= num
                                        ? "text-yellow-400 scale-110 drop-shadow-lg"
                                        : "text-slate-600"
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="w-full flex justify-center gap-3 mt-3">
                            {form.star > 0 && (
                                <p className="text-indigo-400 font-semibold mt-1 transition-all duration-300">
                                    {
                                        {
                                            1: "Very Poor 😞",
                                            2: "Poor 😕",
                                            3: "Average 🙂",
                                            4: "Very Good 😊",
                                            5: "Excellent 🤩"
                                        }[form.star]
                                    }
                                </p>
                            )}
                        </div>
                    </div>


                </div>

                {/* REVIEW TEXTAREA */}
                <div className="mb-8">
                    <label className="text-sm text-slate-300 tracking-wide">
                        Write Your Detailed Review
                    </label>
                    <p className="text-xs text-slate-500 mt-1">

                    </p>

                    <textarea
                        name="review"
                        value={form.review}
                        onChange={handleChange}
                        rows={5}
                        maxLength={250}
                        className="w-full mt-2 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        placeholder="Share your honest experience to help others"
                    />
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Minimum 10 characters recommended</span>
                        <span>{form.review.length}/250</span>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-12 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-xl shadow-indigo-900/40"
                    >
                        Publish Review
                    </button>
                </div>
            </form>
        </main>
    );
}