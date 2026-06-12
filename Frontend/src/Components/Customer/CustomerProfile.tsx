import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Common/Spinner";

interface CustomerProfileState {
    emailid: string;
    name: string;
    address: string;
    city: string;
    state: string;
    gender: string;
    profilepic: File | null;
}

const INITIAL_STATES: CustomerProfileState = {
    emailid: "",
    name: "",
    address: "",
    city: "",
    state: "",
    gender: "",
    profilepic: null,
};

export default function CustomerProfile() {
    const [form, setForm] = useState<CustomerProfileState>(INITIAL_STATES);
    const [prev, setPrev] = useState<string | null>(null);
    const [isExisting, setIsExisting] = useState(false);
    const [loading, setLoading] = useState(false);


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        let selFileObj = e.target.files?.[0];

        if (selFileObj) {
            setForm((prev) => (
                { ...prev, ["profilepic"]: selFileObj }))

            const prevObj = URL.createObjectURL(selFileObj);
            setPrev(prevObj)
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !form.emailid ||
            !form.name ||
            !form.address ||
            !form.city ||
            !form.state ||
            !form.gender ||
            (!form.profilepic && !prev)
        ) {
            alert("All fields including profile picture are required");
            return;
        }

        try{
            setLoading(true);
        let url = isExisting
            ? "http://localhost:2007/customer/updatecustomeraxios"
            : "http://localhost:2007/customer/profileaxios";



        let formData = new FormData();

        formData.append("emailid", form.emailid);
        formData.append("name", form.name);
        formData.append("address", form.address);
        formData.append("city", form.city);
        formData.append("state", form.state);
        formData.append("gender", form.gender);

        if (form.profilepic) {
            formData.append("profilepic", form.profilepic);
        }

        let token = localStorage.getItem("token");

        let response = await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data", 'authorization': `Bearer ${token}` }
        });

        alert(response.data.msg);

        if (!isExisting) {
            setIsExisting(true);
        }
    } catch (err) {
        alert("An error occurred while saving the profile. Please try again.");
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (form.emailid.trim() !== "") {
                autoFindCustomer();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [form.emailid]);

    async function autoFindCustomer() {
        try {
            let url = "http://localhost:2007/customer/findcustomeraxios";

            let token = localStorage.getItem("token");
            let resp = await axios.post(
                url,
                { emailid: form.emailid },
                { headers: { "Content-Type": "application/x-www-form-urlencoded", 'authorization': `Bearer ${token}` } }
            );

            if (resp.data.status) {
                setForm(prev => ({
                    ...prev,
                    name: resp.data.doc.name,
                    address: resp.data.doc.address,
                    city: resp.data.doc.city,
                    state: resp.data.doc.state,
                    gender: resp.data.doc.gender,
                    profilepic: null
                }));

                setPrev(resp.data.doc.profilepic);
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
        <main className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] px-4 py-10">

    <Loader show={loading} text="Saving Profile..." />

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-6xl 
        bg-slate-900/70 backdrop-blur-xl 
        rounded-2xl shadow-2xl border border-slate-700 
        p-6 sm:p-10 md:p-14">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                        Customer Profile
                    </h2>
                    <p className="text-slate-400 mt-3">
                        Complete your profile to unlock all features.
                    </p>
                </div>

                {/* EMAIL + NAME + PIC */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                    <div className="lg:col-span-2 space-y-6">

                        <p className="mb-1 ml-3 text-sm font-semibold text-slate-300">Email</p>

                        <input
                            type="email"
                            name="emailid"
                            value={form.emailid}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-slate-800 border border-slate-600 
                    px-4 py-3 text-white placeholder-slate-400
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />

                        <p className="mb-1 mt-3 ml-3 text-sm font-semibold text-slate-300">
                            Enter Full Name
                        </p>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-slate-800 border border-slate-600 
                    px-4 py-3 text-white placeholder-slate-400
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />

                    </div>

                    {/* PIC */}
                    <div className="flex flex-col items-center">

                        <p className="mb-2 text-sm font-semibold text-slate-300">
                            Upload Your Picture
                        </p>

                        <div className="w-36 h-36 rounded-2xl border border-slate-600 
                overflow-hidden flex items-center justify-center 
                bg-slate-800 shadow-inner">
                            {prev ? (
                                <img src={prev} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-slate-500">No Image</span>
                            )}
                        </div>

                        <input
                            type="file"
                            hidden
                            id="pic"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <label
                            htmlFor="pic"
                            className="mt-4 cursor-pointer rounded-xl 
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    px-6 py-2 text-white font-semibold 
                    hover:scale-105 transition duration-300 shadow-lg"
                        >
                            Upload Photo
                        </label>

                    </div>
                </div>

                {/* OTHER FIELDS */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">

                    <div className="w-full">
                        <p className="mb-1 ml-3 text-sm font-semibold text-slate-300">Gender</p>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-slate-800 border border-slate-600 
                    px-4 py-3 text-white
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <p className="mb-1 ml-3 text-sm font-semibold text-slate-300">City</p>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-slate-800 border border-slate-600 
                    px-4 py-3 text-white
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="w-full">
                        <p className="mb-1 ml-3 text-sm font-semibold text-slate-300">State</p>
                        <select
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-slate-800 border border-slate-600 
                    px-4 py-3 text-white
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="">Select</option>
                            <option>Andhra Pradesh</option>
                            <option>Arunachal Pradesh</option>
                            <option>Assam</option>
                            <option>Bihar</option>
                            <option>Chhattisgarh</option>
                            <option>Goa</option>
                            <option>Gujarat</option>
                            <option>Haryana</option>
                            <option>Himachal Pradesh</option>
                            <option>Jharkhand</option>
                            <option>Karnataka</option>
                            <option>Kerala</option>
                            <option>Madhya Pradesh</option>
                            <option>Maharashtra</option>
                            <option>Manipur</option>
                            <option>Meghalaya</option>
                            <option>Mizoram</option>
                            <option>Nagaland</option>
                            <option>Odisha</option>
                            <option>Punjab</option>
                            <option>Rajasthan</option>
                            <option>Sikkim</option>
                            <option>Tamil Nadu</option>
                            <option>Telangana</option>
                            <option>Tripura</option>
                            <option>Uttar Pradesh</option>
                            <option>Uttarakhand</option>
                            <option>West Bengal</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <p className="mb-1 ml-3 text-sm font-semibold text-slate-300">Address</p>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-slate-800 border border-slate-600 
                    px-4 py-3 text-white
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                </div>

                {/* BUTTON */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                px-12 py-3 text-white font-semibold
                hover:scale-105 transition duration-300 shadow-xl"
                    >
                        {isExisting ? "Update Profile" : "Save Profile"}
                    </button>
                </div>

            </form>
        </main>
    );

}
