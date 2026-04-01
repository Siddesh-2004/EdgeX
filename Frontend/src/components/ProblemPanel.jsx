import { useState } from "react";
import Description from "./Description";

const sampleProblem = {
  title: "Compare the Triplets",
  difficulty: "Easy",
  question:
    "Alice and Bob each created one problem for HackerRank. A reviewer rates the two challenges, awarding points on a scale from 1 to 100 for three categories: problem clarity, originality, and difficulty.\n\nThe rating for Alice's challenge is the triplet a = (a[0], a[1], a[2]), and the rating for Bob's challenge is the triplet b = (b[0], b[1], b[2]).\n\nThe task is to calculate their comparison points by comparing each category:\n- If a[i] > b[i], then Alice is awarded 1 point.\n- If a[i] < b[i], then Bob is awarded 1 point.\n- If a[i] = b[i], then neither person receives a point.\n\nComparison points is the total points a person earned. Given a and b, determine their respective comparison points.",
  inputFormat:
    "The first line contains 3 space-separated integers, a[0], a[1], and a[2], the respective values in triplet a.\nThe second line contains 3 space-separated integers, b[0], b[1], and b[2], the respective values in triplet b.",
  outputFormat:
    "Return an array of two integers denoting the respective comparison points.",
  constraints: ["1 ≤ a[i] ≤ 100", "1 ≤ b[i] ≤ 100"],
  examples: [
    {
      input: "5 6 7\n3 6 10",
      output: "1 1",
      explanation:
        "Comparing the 0th elements, 5 > 3 so Alice receives a point. Comparing the 1st and 2nd elements, 6 = 6 and 7 < 10 so Bob receives a point. The return array is [1, 1].",
    },
  ],
};

export default function ProblemPanel({ problem = sampleProblem }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="w-[35%] flex flex-col border-r border-white/10 bg-[#1c1b1b] h-screen">

      {/* ── Branding Header ── */}
      <div className="h-12 flex items-center px-6 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#00e5ff] flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[#00363d]"
              style={{ fontSize: 14 }}
            >
              code
            </span>
          </div>
          <span className="font-['Space_Grotesk'] font-bold text-md tracking-tight text-[#e5e2e1]">
            EdgeX{" "}
            <span className="text-[#c3f5ff]/50 font-normal">IDE</span>
          </span>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="flex h-12 bg-[#1c1b1b] px-4 items-end border-b border-white/5 shrink-0">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-6 py-2.5 text-sm font-medium transition-all ${
            activeTab === "description"
              ? "border-b-2 border-[#c3f5ff] text-[#c3f5ff]"
              : "text-[#bac9cc] hover:text-[#e5e2e1]"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("testcases")}
          className={`px-6 py-2.5 text-sm font-medium transition-all ${
            activeTab === "testcases"
              ? "border-b-2 border-[#c3f5ff] text-[#c3f5ff]"
              : "text-[#bac9cc] hover:text-[#e5e2e1]"
          }`}
        >
          Test Cases
        </button>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {activeTab === "description" && <Description problem={problem} />}
        {activeTab === "testcases" && (
          <p className="text-[#849396] font-['JetBrains_Mono'] text-xs uppercase tracking-widest">
            Test Cases coming soon...
          </p>
        )}
      </div>

    </section>
  );
}