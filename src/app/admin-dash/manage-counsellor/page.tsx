"use client";

import { useState } from "react";

export default function ManageCounsellors() {
  const [counsellors, setCounsellors] = useState<
    { name: string; email: string; phone: string; qualification: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");

  const addCounsellor = () => {
    if (name && email && phone && qualification) {
      setCounsellors([
        ...counsellors,
        { name, email, phone, qualification },
      ]);
      // Reset form & close modal
      setName("");
      setEmail("");
      setPhone("");
      setQualification("");
      setIsOpen(false);
    } else {
      alert("Please fill all fields");
    }
  };

  const removeCounsellor = (index: number) => {
    const updated = counsellors.filter((_, i) => i !== index);
    setCounsellors(updated);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-sky-400/70 to-purple-500/40 p-10 font-[Montserrat]">
      <h1 className="text-4xl font-bold text-white mb-8">
        Manage Counsellors
      </h1>

      <div className="bg-white/90 p-6 rounded-xl shadow-lg w-full max-w-5xl">
        <button
          className="mb-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow transition text-3xl"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>

        <table className="w-full border-collapse text-lg text-black">
          <thead>
            <tr className="bg-blue-500/90 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Qualification</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {counsellors.map((c, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.qualification}</td>
                <td className="p-3">
                  <button
                    onClick={() => removeCounsellor(i)}
                    className="px-4 py-2 bg-red-600/70 hover:bg-red-700 text-white rounded-lg shadow transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {counsellors.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-4 text-gray-600 italic"
                >
                  No counsellors added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Add Counsellor
            </h3>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 border rounded-lg text-black"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 border rounded-lg text-black"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-3 border rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg text-black"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={addCounsellor}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
              >
                Add
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
