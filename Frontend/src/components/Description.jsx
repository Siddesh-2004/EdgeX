const sampleProblem = {
  title: "Compare the Triplets",
  difficulty: "Easy",
  question:
    "Alice and Bob each created one problem for HackerRank. A reviewer rates the two challenges, awarding points on a scale from 1 to 100 for three categories: problem clarity, originality, and difficulty.\n\nThe rating for Alice's challenge is the triplet a = (a[0], a[1], a[2]), and the rating for Bob's challenge is the triplet b = (b[0], b[1], b[2]).\n\nThe task is to calculate their comparison points by comparing each category:\n- If a[i] > b[i], then Alice is awarded 1 point.\n- If a[i] < b[i], then Bob is awarded 1 point.\n- If a[i] = b[i], then neither person receives a point.\n\nComparison points is the total points a person earned. Given a and b, determine their respective comparison points.",
  inputFormat:
    "The first line contains 3 space-separated integers, a[0], a[1], and a[2], the respective values in triplet a.\nThe second line contains 3 space-separated integers, b[0], b[1], and b[2], the respective values in triplet b.",
  outputFormat: "Return an array of two integers denoting the respective comparison points.",
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

export default function Description({ problem = sampleProblem }) {
  const difficultyStyles = {
    Easy:   "bg-[#c3f5ff]/10 text-[#c3f5ff]",
    Medium: "bg-[#ffeac0]/10 text-[#ffeac0]",
    Hard:   "bg-[#ffb4ab]/10 text-[#ffb4ab]",
  };

  return (
    <div className="max-w-full">

      {/* ── 1. Title + Difficulty ── */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-['Space_Grotesk'] font-bold tracking-tight text-[#e5e2e1]">
          {problem.title}
        </h1>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${difficultyStyles[problem.difficulty] ?? difficultyStyles.Easy}`}>
          {problem.difficulty}
        </span>
      </div>

      {/* ── 2. Problem Narrative ── */}
      <div className="space-y-4 text-[#bac9cc] leading-relaxed text-sm mb-8">
        {problem.question.split("\n").map((para, i) =>
          para.trim() === "" ? null : (
            <p key={i} className="font-light">{para}</p>
          )
        )}
      </div>

      {/* ── 3. Input Format ── */}
      <div className="space-y-2 mb-8 border-t border-white/5 pt-6">
        <h3 className="text-[10px] font-['Space_Grotesk'] font-bold text-[#e5e2e1] uppercase tracking-widest">
          Input Format
        </h3>
        <p className="text-sm font-light text-[#bac9cc] leading-relaxed whitespace-pre-line">
          {problem.inputFormat}
        </p>
      </div>

      {/* ── 4. Output Format ── */}
      <div className="space-y-2 mb-8 border-t border-white/5 pt-6">
        <h3 className="text-[10px] font-['Space_Grotesk'] font-bold text-[#e5e2e1] uppercase tracking-widest">
          Output Format
        </h3>
        <p className="text-sm font-light text-[#bac9cc] leading-relaxed whitespace-pre-line">
          {problem.outputFormat}
        </p>
      </div>

      {/* ── 5. Examples ── */}
      <div className="space-y-6 mb-8 border-t border-white/5 pt-6">
        <h3 className="text-[10px] font-['Space_Grotesk'] font-bold text-[#e5e2e1] uppercase tracking-widest">
          Example
        </h3>
        {problem.examples.map((ex, idx) => (
          <div key={idx} className="space-y-4">

            <div className="space-y-2">
              <h4 className="text-[9px] font-['Space_Grotesk'] font-bold text-[#bac9cc] uppercase tracking-widest">
                Sample Input {problem.examples.length > 1 ? idx + 1 : ""}
              </h4>
              <div className="bg-[#0e0e0e] p-4 rounded border border-white/5 font-['JetBrains_Mono'] text-xs text-[#b8c9d3] whitespace-pre">
                {ex.input}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[9px] font-['Space_Grotesk'] font-bold text-[#bac9cc] uppercase tracking-widest">
                Sample Output {problem.examples.length > 1 ? idx + 1 : ""}
              </h4>
              <div className="bg-[#0e0e0e] p-4 rounded border border-white/5 font-['JetBrains_Mono'] text-xs text-[#c3f5ff] whitespace-pre">
                {ex.output}
              </div>
            </div>

            {ex.explanation && (
              <div className="space-y-2">
                <h4 className="text-[9px] font-['Space_Grotesk'] font-bold text-[#bac9cc] uppercase tracking-widest">
                  Explanation
                </h4>
                <p className="text-sm font-light text-[#bac9cc] leading-relaxed">
                  {ex.explanation}
                </p>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* ── 6. Constraints ── */}
      <div className="space-y-2 mb-8 border-t border-white/5 pt-6">
        <h3 className="text-[10px] font-['Space_Grotesk'] font-bold text-[#e5e2e1] uppercase tracking-widest">
          Constraints
        </h3>
        <ul className="list-disc list-inside text-sm font-light text-[#bac9cc] space-y-1 ml-2">
          {Array.isArray(problem.constraints)
            ? problem.constraints.map((c, i) => <li key={i}>{c}</li>)
            : problem.constraints.split("\n").filter(Boolean).map((c, i) => (
                <li key={i}>{c}</li>
              ))
          }
        </ul>
      </div>

    </div>
  );
}