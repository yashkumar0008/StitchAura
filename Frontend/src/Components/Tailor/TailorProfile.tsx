import { useState, useEffect } from "react";
import axios from "axios";

interface TailorProfileState {
    emailid: string;
    name: string;
    contact: string;
    address: string;
    city: string;
    dob: string;
    aadharno: string;
    category: string;
    speciality: string;
    social: string;
    since: string;
    worktype: string;
    shopaddress: string;
    shopcity: string;
    otherinfo: string;
    profilepic: File | null;
    aadharFront: File | null;
    aadharBack: File | null;
}

const INITIAL_STATE: TailorProfileState = {
    emailid: "",
    name: "",
    contact: "",
    address: "",
    city: "",
    dob: "",
    aadharno: "",
    category: "",
    speciality: "",
    social: "",
    since: "",
    worktype: "",
    shopaddress: "",
    shopcity: "",
    otherinfo: "",
    profilepic: null,
    aadharFront: null,
    aadharBack: null,
};

export default function ProfileTailor() {
    const [form, setForm] = useState(INITIAL_STATE);
    const [profilePrev, setProfilePrev] = useState<string | null>(null);
    const [aadharFrontPrev, setAadharFrontPrev] = useState<string | null>(null);
    const [aadharBackPrev, setAadharBackPrev] = useState<string | null>(null);
    const [isExisting, setIsExisting] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleFile(
        e: React.ChangeEvent<HTMLInputElement>,
        field: "profilepic" | "aadharFront" | "aadharBack",
        setPrev: (v: string) => void
    ) {
        const file = e.target.files?.[0];
        if (!file) return;

        setForm((prev) => ({ ...prev, [field]: file }));
        setPrev(URL.createObjectURL(file));
    }



    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let url = isExisting ? "https://stitch-aura.vercel.app/tailor/updatetailoraxios" : "https://stitch-aura.vercel.app/tailor/profileaxios";

        let formData = new FormData();

        formData.append("emailid", form.emailid);
        formData.append("name", form.name);
        formData.append("contact", form.contact);
        formData.append("address", form.address);
        formData.append("city", form.city);
        formData.append("dob", form.dob);
        formData.append("aadharno", form.aadharno);
        formData.append("category", form.category);
        formData.append("speciality", form.speciality);
        formData.append("social", form.social);
        formData.append("since", form.since);
        formData.append("worktype", form.worktype);
        formData.append("shopaddress", form.shopaddress);
        formData.append("shopcity", form.shopcity);
        formData.append("otherinfo", form.otherinfo);

        if (form.profilepic) {
            formData.append("profilepic", form.profilepic);
        }

        if (form.aadharFront) {
            formData.append("aadharFront", form.aadharFront);
        }


        if (form.aadharBack) {
            formData.append("aadharBack", form.aadharBack);
        }

        let response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });

        alert(response.data.msg);

        if (!isExisting) {
            setIsExisting(true);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (form.emailid.trim() !== "") {
                autoFindTailor();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [form.emailid]);

    async function autoFindTailor() {
        try {
            let url = "https://stitch-aura.vercel.app/tailor/findtailoraxios";

            let resp = await axios.post(url, { emailid: form.emailid }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

            console.log(resp.data)
            if (resp.data.status) {
                setForm(prev => ({
                    ...prev,
                    name: resp.data.doc.name,
                    contact: resp.data.doc.contact,
                    address: resp.data.doc.address,
                    city: resp.data.doc.city,
                    aadharno: resp.data.doc.aadharno,
                    dob: resp.data.doc.dob,
                    category: resp.data.doc.category,
                    speciality: resp.data.doc.speciality,
                    social: resp.data.doc.social,
                    since: resp.data.doc.since,
                    worktype: resp.data.doc.worktype,
                    shopaddress: resp.data.doc.shopaddress,
                    shopcity: resp.data.doc.shopcity,
                    otherinfo: resp.data.doc.otherinfo,
                    profilepic: null,
                    aadharFront: null,
                    aadharBack: null,

                }));

                setProfilePrev(resp.data.doc.profilepic);
                setAadharFrontPrev(resp.data.doc.aadharFront);
                setAadharBackPrev(resp.data.doc.aadharBack);
                setIsExisting(true);
            }
            else {
                setIsExisting(false);
            }
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex justify-center items-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-6xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/40 rounded-3xl p-10"
            >
                {/* HEADER */}
                <h2 className="text-4xl font-bold text-center mb-10 text-white tracking-wide">
                    Profile Tailor
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    {/* LEFT SIDE */}
                    <div className="md:col-span-2 space-y-6">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Id</label>
                            <input
                                name="emailid"
                                value={form.emailid}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                            />
                        </div>

                        {/* CONTACT */}

                        <div>
                            <label className="text-sm font-medium text-slate-300">Contact Number</label>
                            <input
                                name="contact"
                                value={form.contact}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                            />
                        </div>

                    </div>

                    {/* RIGHT SIDE PROFILE PIC */}
                    <div className="flex flex-col items-center">
                        <label className="text-sm font-medium text-slate-300">Upload Profile Pic</label>

                        <div className="w-36 h-36 rounded-full border border-slate-700 flex justify-center items-center overflow-hidden bg-slate-800 text-slate-500">
                            {profilePrev ? (
                                <img src={profilePrev} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm">No Image</span>
                            )}
                        </div>

                        <input
                            type="file"
                            hidden
                            id="profile"
                            onChange={(e) => handleFile(e, "profilepic", setProfilePrev)}
                        />

                        <label
                            htmlFor="profile"
                            className="mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2 rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-900/40"
                        >
                            Upload
                        </label>
                    </div>

                </div>

                {/* LEFT SIDE */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    {/* AADHAR UPLOAD front side */}
                    <div className="flex flex-col items-center">
                        <label className="text-sm font-medium text-slate-300">Upload Aadhaar Card</label>

                        <div className="w-45 h-36 rounded-2xl border border-slate-700 flex justify-center items-center overflow-hidden bg-slate-800 text-slate-500 mt-2">
                            {aadharFrontPrev ? (
                                <img src={aadharFrontPrev} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm">No Image</span>
                            )}
                        </div>

                        <input
                            type="file"
                            hidden
                            id="aadharFront"
                           onChange={(e) => handleFile(e, "aadharFront", setAadharFrontPrev)}
                        />

                        <label
                            htmlFor="aadharFront"
                            className="mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2 rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-900/40"
                        >
                            Upload Aadhaar
                        </label>
                    </div>

                    {/* AADHAR UPLOAD back side */}
                    <div className="flex flex-col items-center">
                        <label className="text-sm font-medium text-slate-300">Upload Aadhaar Card</label>

                        <div className="w-45 h-36 rounded-2xl border border-slate-700 flex justify-center items-center overflow-hidden bg-slate-800 text-slate-500 mt-2">
                            {aadharBackPrev ? (
                                <img src={aadharBackPrev} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm">No Image</span>
                            )}
                        </div>

                        <input
                            type="file"
                            hidden
                            id="aadharBack"
                           onChange={(e) => handleFile(e, "aadharBack", setAadharBackPrev)}
                        />

                        <label
                            htmlFor="aadharBack"
                            className="mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2 rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-900/40"
                        >
                            Upload Aadhaar
                        </label>
                    </div>

                    {/* ADDRESS AADHAR */}

                    <div className="md:col-span-2 space-y-6">

                        <div>
                            <label className="text-sm font-medium text-slate-300">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                            />
                        </div>


                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-slate-300">Date Of Birth</label>
                                <input
                                    name="dob"
                                    value={form.dob}
                                    onChange={handleChange}
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-300">Aadhaar Number</label>
                                <input
                                    name="aadharno"
                                    value={form.aadharno}
                                    onChange={handleChange}
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* ADDRESS + CITY */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-slate-300">Address</label>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-300">City</label>
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        />
                    </div>
                </div>


                {/* PROFESSIONAL INFO */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold tracking-wide text-white">
                        Professional Information
                    </h3>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
                </div>

                {/* CATEGORY + SPECIALITY */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-slate-300">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        >
                            <option value="">Select</option>
                            <option>Men</option>
                            <option>Women</option>
                            <option>Children</option>
                            <option>Both</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-300">Speciality</label>
                        <input
                            name="speciality"
                            value={form.speciality}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        />
                    </div>
                </div>

                {/* SOCIAL + SINCE + WORKTYPE */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-slate-300">Social Media Link</label>
                        <input
                            name="social"
                            value={form.social}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-300">Working Since</label>
                        <input
                            name="since"
                            value={form.since}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-300">Work Type</label>
                        <select
                            name="worktype"
                            value={form.worktype}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        >
                            <option value="">Select</option>
                            <option>Home</option>
                            <option>Shop</option>
                            <option>Both</option>
                        </select>
                    </div>
                </div>

                {/* SHOP ADDRESS */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {(form.worktype === "Shop" || form.worktype === "Both") && (
                        <div>
                            <label className="text-sm font-medium text-slate-300">Shop Address</label>
                            <input
                                name="shopaddress"
                                value={form.shopaddress}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                            />
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-slate-300">Shop City</label>
                        <input
                            name="shopcity"
                            value={form.shopcity}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                        />
                    </div>
                </div>

                {/* OTHER INFO */}
                <div className="mb-8">
                    <label className="text-sm font-medium text-slate-300">Other Information</label>
                    <textarea
                        name="otherinfo"
                        value={form.otherinfo}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mt-1 h-28 resize-none text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition-all duration-300"
                    />
                </div>

                {/* BUTTON */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-12 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-xl shadow-indigo-900/40"
                    >
                        {isExisting ? "Update Profile" : "Save Profile"}
                    </button>
                </div>
            </form>
        </main>
    );
}
