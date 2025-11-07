"use client";
import { useState } from "react";

type TestType = "phq9" | "gad7" | "ghq12" | "cbt" | "htq16" | null;

export default function TestHub() {
  const [activeTest, setActiveTest] = useState<TestType>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<string>("");

  // Questions
  const phq9Qs = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself — or that you are a failure?",
    "Trouble concentrating on things?",
    "Moving or speaking slowly, or being fidgety/restless?",
    "Thoughts of being better off dead or hurting yourself?",
  ];
  const gad7Qs = [
    "Feeling nervous, anxious or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it’s hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid as if something awful might happen?",
  ];
  const ghq12Qs = [
    "Been able to concentrate on what you’re doing?",
    "Lost much sleep over worry?",
    "Felt that you are playing a useful part in things?",
    "Felt capable of making decisions?",
    "Felt constantly under strain?",
    "Felt you couldn’t overcome your difficulties?",
    "Been able to enjoy your normal day-to-day activities?",
    "Been able to face up to your problems?",
    "Been feeling unhappy or depressed?",
    "Been losing confidence in yourself?",
    "Been thinking of yourself as a worthless person?",
    "Been feeling reasonably happy, all things considered?",
  ];
  const cbtQs = [
    "Do you often have negative thoughts that interfere with your daily life?",
    "Do you find yourself avoiding situations because of fear or anxiety?",
    "Do you engage in behaviors that temporarily reduce anxiety but are harmful?",
    "Do you have difficulty challenging irrational beliefs?",
    "Do you notice recurring patterns of self-criticism?",
    "Do you struggle to control impulsive behaviors?",
    "Do you often feel stuck in repetitive negative cycles?",
    "Do you have trouble setting or achieving personal goals?",
    "Do you frequently ruminate about past mistakes?",
    "Do you experience significant emotional swings?",
  ];
  const htq16Qs = [
    "Have you experienced nightmares related to trauma?",
    "Do you avoid situations that remind you of trauma?",
    "Do you have intrusive thoughts about traumatic events?",
    "Do you feel detached from people or surroundings?",
    "Do you experience emotional numbness?",
    "Do you feel irritable or have angry outbursts?",
    "Do you have trouble sleeping due to trauma memories?",
    "Do you feel constantly on guard or alert?",
    "Do you have physical reactions when reminded of trauma?",
    "Do you feel hopeless or helpless?",
    "Do you experience flashbacks?",
    "Do you avoid talking about trauma experiences?",
    "Do you feel guilt or shame related to trauma?",
    "Do you have difficulty concentrating?",
    "Do you feel jumpy or easily startled?",
    "Do you have persistent anxiety or panic?",
  ];

  const questionSets: Record<string, string[]> = {
    phq9: phq9Qs,
    gad7: gad7Qs,
    ghq12: ghq12Qs,
    cbt: cbtQs,
    htq16: htq16Qs,
  };

  // Handle answer
  const handleAnswer = (qIndex: number, value: number) => {
    if (!activeTest) return;
    setAnswers((prev) => ({ ...prev, [`${activeTest}-${qIndex}`]: value }));
  };

  // Calculate score
  const calculateScore = () => {
    if (!activeTest) return;

    const questions = questionSets[activeTest];
    let total = 0;
    questions.forEach((_, i) => {
      total += answers[`${activeTest}-${i}`] || 0;
    });

    let text = "";
    if (activeTest === "phq9") {
      text =
        total <= 4
          ? "Minimal depression"
          : total <= 9
          ? "Mild depression"
          : total <= 14
          ? "Moderate depression"
          : total <= 19
          ? "Moderately severe depression"
          : "Severe depression";
    } else if (activeTest === "gad7") {
      text =
        total <= 4
          ? "Minimal anxiety"
          : total <= 9
          ? "Mild anxiety"
          : total <= 14
          ? "Moderate anxiety"
          : "Severe anxiety";
    } else if (activeTest === "ghq12") {
      text =
        total <= 11
          ? "Normal"
          : total <= 20
          ? "Mild distress"
          : "Severe distress";
    } else if (activeTest === "cbt") {
      text =
        total <= 3
          ? "Low CBT risk"
          : total <= 6
          ? "Moderate CBT risk"
          : "High CBT risk";
    } else if (activeTest === "htq16") {
      text =
        total <= 16
          ? "Low trauma risk"
          : total <= 32
          ? "Moderate trauma risk"
          : "High trauma risk";
    }

    setResult(`Score: ${total} — ${text}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-cyan-300/70 to-blue-200/70 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">🧠 Test Hub</h1>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(questionSets).map((test) => (
          <div
            key={test}
            className="card bg-white/20 backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2 uppercase">{test}</h2>
            <p className="mb-4">
              {test === "phq9"
                ? "Depression screening"
                : test === "gad7"
                ? "Anxiety screening"
                : test === "ghq12"
                ? "General Health Questionnaire"
                : test === "cbt"
                ? "Cognitive Behavioral patterns"
                : "Trauma questionnaire"}
            </p>
            <button
              onClick={() => {
                setActiveTest(test as TestType);
                setAnswers({});
                setResult("");
              }}
              className="submit-btn w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              Start Test
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeTest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveTest(null)}
              className="float-right text-2xl text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 uppercase">{activeTest}</h2>

            {/* Questions */}
            {questionSets[activeTest].map((q, i) => (
              <div key={i} className="mb-4">
                <p className="mb-2 font-medium">
                  {i + 1}. {q}
                </p>
                {activeTest === "cbt" ? (
                  <div className="space-x-4">
                    <label>
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value="1"
                        onChange={() => handleAnswer(i, 1)}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value="0"
                        onChange={() => handleAnswer(i, 0)}
                      />{" "}
                      No
                    </label>
                  </div>
                ) : (
                  <div className="space-x-4">
                    <label>
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value="0"
                        onChange={() => handleAnswer(i, 0)}
                      />{" "}
                      Not at all
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value="1"
                        onChange={() => handleAnswer(i, 1)}
                      />{" "}
                      Several days
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value="2"
                        onChange={() => handleAnswer(i, 2)}
                      />{" "}
                      More than half the days
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value="3"
                        onChange={() => handleAnswer(i, 3)}
                      />{" "}
                      Nearly every day
                    </label>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={calculateScore}
              className="w-full mt-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Submit
            </button>

            {result && (
              <p className="mt-4 text-lg font-bold text-center">{result}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
