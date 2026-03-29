import { useState } from "react";

export default function CreateProblem() {
  const [constraints, setConstraints] = useState([
    { id: 1, value: "" },
  ]);
  const [examples, setExamples] = useState([
    { id: 1, input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "" },
  ]);

  const addConstraint = () =>
    setConstraints((prev) => [...prev, { id: Date.now(), value: "" }]);

  const removeConstraint = (id) =>
    setConstraints((prev) => prev.filter((c) => c.id !== id));

  const updateConstraint = (id, value) =>
    setConstraints((prev) => prev.map((c) => (c.id === id ? { ...c, value } : c)));

  const addExample = () =>
    setExamples((prev) => [
      ...prev,
      { id: Date.now(), input: "", output: "", explanation: "" },
    ]);

  const removeExample = (id) =>
    setExamples((prev) => prev.filter((e) => e.id !== id));

  const updateExample = (id, field, value) =>
    setExamples((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-['Inter'] selection:bg-[#00e5ff] selection:text-[#00363d]">

      {/* ── Main ── */}
      <main className="pt-12 pb-24 px-8 max-w-[1000px] mx-auto min-h-screen">

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[#00daf3] mb-4">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>terminal</span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em]">
              Kinetic Architect // V2.04
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] font-bold text-5xl tracking-tight text-[#e5e2e1] mb-4">
            Create New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff]">
              Problem
            </span>
          </h1>
          <p className="text-[#bac9cc] text-lg max-w-2xl leading-relaxed">
            Define the parameters for a new algorithmic challenge. Precision in constraints ensures
            high-quality solutions from the community.
          </p>
        </header>

        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>

          {/* ── Question Section ── */}
          <section className="bg-[#201f1f] p-8 rounded-xl border border-[rgba(132,147,150,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: 64, fontVariationSettings: "'FILL' 1" }}>
                description
              </span>
            </div>
            <label className="block font-['Space_Grotesk'] text-xl font-semibold mb-6 text-[#e5e2e1]">
              Question Description
            </label>
            <textarea
              className="w-full bg-[#0e0e0e] border-none rounded-lg p-6 min-h-[300px] font-['Inter'] text-[#e5e2e1] placeholder:text-[rgba(132,147,150,0.4)] focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#c3f5ff] transition-all resize-none leading-relaxed text-sm"
              placeholder="Detail the problem logic, expected behavior, and core objective..."
            />
          </section>

          {/* ── Constraints Section ── */}
          <section className="bg-[#201f1f] p-8 rounded-xl border border-[rgba(132,147,150,0.15)]">
            <div className="flex justify-between items-center mb-8">
              <label className="block font-['Space_Grotesk'] text-xl font-semibold text-[#e5e2e1]">
                Constraints
              </label>
              <span className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-widest">
                Technical Boundaries
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {constraints.map((c) => (
                <div key={c.id} className="flex gap-4 items-center group">
                  <div className="flex-grow bg-[#0e0e0e] rounded-lg overflow-hidden flex items-center">
                    <div className="px-4 py-3 bg-[#2a2a2a] text-[#00daf3] border-r border-[rgba(59,73,76,0.1)]">
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>key</span>
                    </div>
                    <input
                      className="w-full bg-transparent border-none py-4 px-6 focus:outline-none focus:ring-0 text-[#e5e2e1] font-['JetBrains_Mono'] text-sm placeholder:text-[#849396]/40"
                      placeholder="e.g. 1 <= nums.length <= 10^5"
                      type="text"
                      value={c.value}
                      onChange={(e) => updateConstraint(c.id, e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeConstraint(c.id)}
                    className="material-symbols-outlined text-[#ffb4ab] opacity-40 hover:opacity-100 transition-opacity"
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addConstraint}
              className="group flex items-center gap-3 w-full justify-center py-4 border-2 border-dashed border-[rgba(59,73,76,0.2)] rounded-lg hover:border-[rgba(0,218,243,0.4)] transition-all bg-[#1c1b1b]/50"
            >
              <span className="material-symbols-outlined text-[#00daf3] group-hover:scale-110 transition-transform">
                add_circle
              </span>
              <span className="font-['Space_Grotesk'] font-medium text-[#00daf3] tracking-wide">
                Add Constraint
              </span>
            </button>
          </section>

          {/* ── Examples Section ── */}
          <section className="bg-[#201f1f] p-8 rounded-xl border border-[rgba(132,147,150,0.15)]">
            <div className="flex justify-between items-center mb-8">
              <label className="block font-['Space_Grotesk'] text-xl font-semibold text-[#e5e2e1]">
                Examples
              </label>
              <span className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-widest">
                Case Definitions
              </span>
            </div>

            <div className="space-y-8 mb-10">
              {examples.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="bg-[#1c1b1b] p-6 rounded-lg border-l-4 border-[#00e5ff]"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-[#00e5ff]/10 text-[#00e5ff] text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Example #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExample(ex.id)}
                      className="material-symbols-outlined text-[#3b494c] hover:text-[#ffb4ab] transition-colors"
                    >
                      close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-tighter">
                        Input Data
                      </label>
                      <input
                        className="w-full bg-[#0e0e0e] border-none rounded-md px-4 py-3 font-['JetBrains_Mono'] text-sm text-[#9cf0ff] focus:outline-none focus:ring-1 focus:ring-[#c3f5ff]/20"
                        type="text"
                        value={ex.input}
                        onChange={(e) => updateExample(ex.id, "input", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-tighter">
                        Output Data
                      </label>
                      <input
                        className="w-full bg-[#0e0e0e] border-none rounded-md px-4 py-3 font-['JetBrains_Mono'] text-sm text-[#ffdf96] focus:outline-none focus:ring-1 focus:ring-[#c3f5ff]/20"
                        type="text"
                        value={ex.output}
                        onChange={(e) => updateExample(ex.id, "output", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-tighter">
                      Explanation
                    </label>
                    <textarea
                      className="w-full bg-[#0e0e0e] border-none rounded-md px-4 py-3 font-['Inter'] text-sm text-[#bac9cc] h-24 focus:outline-none focus:ring-1 focus:ring-[#c3f5ff]/20 resize-none placeholder:text-[#849396]/40"
                      placeholder="Explain why the input leads to this output..."
                      value={ex.explanation}
                      onChange={(e) => updateExample(ex.id, "explanation", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addExample}
              className="group flex items-center gap-3 w-full justify-center py-4 border-2 border-dashed border-[rgba(59,73,76,0.2)] rounded-lg hover:border-[rgba(0,218,243,0.4)] transition-all bg-[#1c1b1b]/50"
            >
              <span className="material-symbols-outlined text-[#00daf3] group-hover:scale-110 transition-transform">
                library_add
              </span>
              <span className="font-['Space_Grotesk'] font-medium text-[#00daf3] tracking-wide">
                Add New Example Set
              </span>
            </button>
          </section>

          {/* ── Action Buttons ── */}
          <div className="flex flex-col md:flex-row items-center justify-end gap-6 pt-6 border-t border-[rgba(59,73,76,0.1)]">
            <button
              type="button"
              className="w-full md:w-auto px-10 py-4 font-['Space_Grotesk'] font-bold text-[#849396] hover:text-[#e5e2e1] transition-colors tracking-wide active:scale-95"
            >
              Cancel Changes
            </button>
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff] px-12 py-4 rounded-lg font-['Space_Grotesk'] font-extrabold text-[#00363d] shadow-[0px_10px_30px_rgba(0,218,243,0.2)] hover:shadow-[0px_15px_40px_rgba(0,218,243,0.3)] hover:-translate-y-1 transform transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                save
              </span>
              Save Problem
            </button>
          </div>

        </form>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#131313] w-full py-12 border-t border-zinc-800/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full gap-8">
          <div className="font-['Space_Grotesk'] font-black text-lg text-zinc-100">
            EDGEX KINETIC MONOLITH
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-['Inter'] text-[10px] uppercase tracking-[0.2em] font-semibold">
            {["API Reference", "System Status", "Privacy Policy", "Security", "Community"].map((l) => (
              <a key={l} href="#" className="text-zinc-600 hover:text-[#00E5FF] transition-colors duration-300">
                {l}
              </a>
            ))}
          </div>
          <div className="text-zinc-600 font-['Inter'] text-[10px] uppercase tracking-[0.2em] font-semibold opacity-80">
            © 2024 EDGEX KINETIC MONOLITH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Nav ── */}
      <div className="md:hidden fixed bottom-0 w-full bg-[#1c1b1b] border-t border-[rgba(59,73,76,0.1)] z-50 flex justify-around items-center py-4 px-6">
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[8px] uppercase tracking-tighter">Challenges</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#00E5FF]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            add_box
          </span>
          <span className="text-[8px] uppercase tracking-tighter">Create</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="text-[8px] uppercase tracking-tighter">Ranks</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[8px] uppercase tracking-tighter">Account</span>
        </button>
      </div>

    </div>
  );
}