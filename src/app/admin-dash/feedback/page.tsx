"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackPage() {
  const counsellors = [
    {
      name: "Dr. A. Sharma",
      feedbacks: [
        "Explains concepts very clearly and gives real-world examples.",
        "Sometimes the sessions feel rushed, but overall very helpful.",
      ],
    },
    {
      name: "Ms. R. Gupta",
      feedbacks: [
        "Friendly and approachable, makes us feel comfortable.",
        "More practical examples would make it even better.",
      ],
    },
    {
      name: "Mr. V. Nair",
      feedbacks: [
        "Guides us patiently and answers all questions.",
        "Timings could be managed better.",
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFeedback = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200/50 to-indigo-500/90 p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          View Feedback
        </h1>

        <div className="space-y-6">
          {counsellors.map((c, index) => (
            <div key={index} className="border-b border-white/40 pb-4">
              {/* Counsellor name */}
              <div
                className="flex justify-between items-center cursor-pointer text-white font-semibold text-xl hover:text-yellow-200 transition"
                onClick={() => toggleFeedback(index)}
              >
                <span>{c.name}</span>
                <span className="text-sm opacity-70">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </div>

              {/* Feedback list with animation */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-2 pl-4 text-gray-900 bg-white/60 rounded-lg p-4">
                      {c.feedbacks.map((fb, i) => (
                        <p
                          key={i}
                          className="italic text-[15px] leading-relaxed"
                        >
                          “{fb}”
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
