import { useState } from "react";

const sampleTestCase = {
  status: "accepted",
  input: "5 6 7\n3 6 10",
  expectedOutput: "1 1",
  actualOutput: "1 1",
};

export default function TestCaseCard({ testCase = sampleTestCase, index = 0, total = 1 }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!testCase) return null;

  const isAccepted = testCase.status === "accepted";

  const statusStyles = isAccepted
    ? "border-[#c3f5ff]/40 text-[#c3f5ff] bg-[#c3f5ff]/5"
    : "border-[#ffb4ab]/40 text-[#ffb4ab] bg-[#ffb4ab]/5";

  const passedText = isAccepted
    ? `${index + 1}/${total} PASSED`
    : `${index + 1}/${total} FAILED`;

  const passedColor = isAccepted ? "text-[#00daf3]" : "text-[#ffb4ab]";

  return (
    <div className="border border-[#3b494c]/30 rounded-xl overflow-hidden bg-[#1c1b1b] shadow-2xl">

      {/* ── Row Header (always visible) ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-5 bg-[#201f1f]/50 border-b border-[#3b494c]/10 hover:bg-[#201f1f] transition-colors"
      >
        <div className="flex items-center gap-4">
          <span
            className="material-symbols-outlined text-[#00daf3] transition-transform duration-200"
            style={{
              fontSize: 20,
              transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          >
            expand_more
          </span>
          <span className="font-['Space_Grotesk'] font-semibold text-lg tracking-tight text-[#e5e2e1]">
            Test Case {index}
          </span>
        </div>
        <span className={`px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase border rounded-full ${statusStyles}`}>
          {isAccepted ? "Accepted" : "Wrong Answer"}
        </span>
      </button>

      {/* ── Expanded Content ── */}
      {isOpen && (
        <div className="p-6 space-y-6">

          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <span className="material-symbols-outlined text-[#b8c9d3]" style={{ fontSize: 14 }}>input</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8c9d3]">Input</span>
            </div>
            <div className="bg-[#0e0e0e] p-4 rounded-lg border border-[#3b494c]/10 font-['JetBrains_Mono'] text-sm text-[#bac9cc] leading-relaxed whitespace-pre">
              {testCase.input}
            </div>
          </div>

          {/* Expected Output */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <span className="material-symbols-outlined text-[#00daf3]" style={{ fontSize: 14 }}>check_circle</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8c9d3]">Expected Output</span>
            </div>
            <div className="bg-[#0e0e0e] p-4 rounded-lg border border-[#3b494c]/10 font-['JetBrains_Mono'] text-sm text-[#00daf3] leading-relaxed whitespace-pre">
              {testCase.expectedOutput}
            </div>
          </div>

          {/* Actual Output */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <span className="material-symbols-outlined text-[#e5e2e1]" style={{ fontSize: 14 }}>terminal</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8c9d3]">Output</span>
            </div>
            <div className="bg-[#0e0e0e] p-4 rounded-lg border border-[#3b494c]/10 font-['JetBrains_Mono'] text-sm text-[#e5e2e1] leading-relaxed whitespace-pre">
              {testCase.actualOutput ?? "—"}
            </div>
          </div>

        </div>
      )}

      {/* ── Footer (only when expanded) ── */}
      {isOpen && (
        <div className="px-6 py-3 bg-[#353534]/20 border-t border-[#3b494c]/5 flex justify-between items-center">
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#bac9cc]/50 uppercase tracking-tighter">
            Status: {isAccepted ? "Synchronized" : "Mismatch"}
          </span>
          <span className={`text-[10px] font-['JetBrains_Mono'] ${passedColor}`}>
            {passedText}
          </span>
        </div>
      )}

    </div>
  );
}