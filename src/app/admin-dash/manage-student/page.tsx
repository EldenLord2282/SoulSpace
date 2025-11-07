"use client";
import { useState } from "react";

export default function ManageStudentsPage() {
  const [students, setStudents] = useState<
    { name: string; email: string; phone: string; course: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const addStudent = () => {
    if (!form.name || !form.email || !form.phone || !form.course) {
      alert("Please fill all fields");
      return;
    }
    setStudents([...students, form]);
    setForm({ name: "", email: "", phone: "", course: "" });
    closeModal();
  };

  const removeStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400/70 to-purple-500/40 p-10 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Manage Students
        </h1>

        {/* Card */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-6">
          <button
            onClick={openModal}
            className="mb-6 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-3xl"
          >
            + 
          </button>

          {/* Table */}
          <table className="w-full border-collapse text-lg text-black">
            <thead>
              <tr className="bg-blue-500/90 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition border-b border-gray-200"
                >
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.phone}</td>
                  <td className="p-3">{s.course}</td>
                  <td className="p-3">
                    <button
                      onClick={() => removeStudent(index)}
                      className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No students added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
              <h3 className="text-2xl text-black font-bold mb-4 text-center">
                Add Student
              </h3>

              <input
                type="text"
                id="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 mb-3 border rounded-md text-black"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 mb-3 border rounded-md text-black"
              />
              <input
                type="tel"
                id="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 mb-3 border rounded-md text-black"
              />
              <input
                type="text"
                id="course"
                placeholder="Course"
                value={form.course}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-md text-black"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={addStudent}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold"
                >
                  Add
                </button>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
