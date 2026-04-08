import { useEffect, useState } from "react";
import axios from "axios";

interface ShowCategoryDressProps {
    onSelectDress: (data: { category: string; speciality: string }) => void;
}

export default function ShowCategoryDress({ onSelectDress }: ShowCategoryDressProps) {

    const [category, setCategory] = useState("");
    const [specialities, setSpecialities] = useState<string[]>([]);
    const [selectedDress, setSelectedDress] = useState("");

    // Category change hone par backend call
    useEffect(() => {
        async function fetchSpecialities() {
            if (!category) return;

            try {
                const res = await axios.get(
                    "http://localhost:2007/tailor/category-dress",
                    { params: { category } }
                );

                setSpecialities(res.data);
                setSelectedDress(""); // reset dress
            } catch (error) {
                console.error(error);
            }
        }

        fetchSpecialities();
    }, [category]);

    function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCategory(e.target.value);
    }

    function handleDressChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const dress = e.target.value;
        setSelectedDress(dress);
        onSelectDress({ category, speciality: dress });
    }

    return (
        <div className="w-full max-w-md mx-auto mt-10">

    {/* CATEGORY LABEL */}
    <label className="block text-sm text-slate-300 mb-3">
        Select Category
    </label>

    {/* RADIO BUTTONS */}
    <div className="grid grid-cols-2 gap-4 mb-8">

        {["Men", "Women", "Child", "All"].map((cat) => (
            <label
                key={cat}
                className={`flex items-center justify-center cursor-pointer 
                rounded-xl border border-slate-700 bg-slate-800 
                py-3 text-white text-sm font-medium
                transition-all duration-300
                ${category === cat
                        ? "border-indigo-500 ring-2 ring-white bg-slate-700"
                        : "hover:border-slate-500"
                    }`}
            >
                <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={handleCategoryChange}
                    className="hidden"
                />
                {cat}
            </label>
        ))}

    </div>

    {/* DRESS LABEL */}
    <label className="block text-sm text-slate-300 mb-3">
        Select Dress
    </label>

    {/* DRESS SELECT */}
    <select
        value={selectedDress}
        onChange={handleDressChange}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 
        px-4 py-3 text-white 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 
        outline-none transition-all duration-300"
    >
        <option value="">-- Select Dress --</option>

        {specialities.map((dress, index) => (
            <option key={index} value={dress}>
                {dress}
            </option>
        ))}
    </select>

</div>
    );
}