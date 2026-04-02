import { useState } from "react";
import api from "../axios/axios.config.js";
import { useNavigate } from "react-router-dom";

export default function CreateProblem() {
  const [question, setQuestion] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [constraints, setConstraints] = useState([{ id: 1, value: "" }]);
  const [examples, setExamples] = useState([{}]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // ── Constraints ──
  const addConstraint = () =>
    setConstraints((prev) => [...prev, { id: Date.now(), value: "" }]);
  const removeConstraint = (id) =>
    setConstraints((prev) => prev.filter((c) => c.id !== id));
  const updateConstraint = (id, value) =>
    setConstraints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value } : c)),
    );

  // ── Examples ──
  const addExample = () =>
    setExamples((prev) => [
      ...prev,
      { id: Date.now(), input: "", output: "", explanation: "" },
    ]);
  const removeExample = (id) =>
    setExamples((prev) => prev.filter((e) => e.id !== id));
  const updateExample = (id, field, value) =>
    setExamples((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );

  // ── Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const payload = {
      title,
      question,
      inputFormat,
      outputFormat,
      constraints: constraints
        .map((c) => c.value)
        .filter(Boolean)
        .join("\n"),
      examples: examples.map(({ input, output, explanation }) => ({
        input,
        output,
        explanation,
      })),
    };

    try {
      const res = await api.post("/problems/createProblem", payload);

      if (!res.data) {
        throw new Error("Failed to save problem.");
      }
      const problemId = res.data.data._id;

      setSubmitSuccess(true);
      setTitle("");
      setQuestion("");
      setInputFormat("");
      setOutputFormat("");
      setConstraints([{ id: Date.now(), value: "" }]);
      setExamples([{ id: Date.now(), input: "", output: "", explanation: "" }]);
      let path = "/problems/" + problemId;
      navigate(path);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || err.message || "Failed to save problem.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-['Inter'] selection:bg-[#00e5ff] selection:text-[#00363d]">
      <main className="pt-12 pb-24 px-8 max-w-[1000px] mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[#00daf3] mb-4"></div>
          <h1 className="font-['Space_Grotesk'] font-bold text-5xl tracking-tight text-[#e5e2e1] mb-4">
            Create New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff]">
              Problem
            </span>
          </h1>
          <p className="text-[#bac9cc] text-lg max-w-2xl leading-relaxed">
            Define the parameters for a new algorithmic challenge. Precision in
            constraints ensures high-quality solutions from the community.
          </p>
        </header>

        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* ── Title Section ── */}
          <section className="bg-[#201f1f] p-8 rounded-xl border border-[rgba(132,147,150,0.15)] relative overflow-hidden">
            <label className="block font-['Space_Grotesk'] text-xl font-semibold mb-6 text-[#e5e2e1]">
              Title (Name the Question)
            </label>
            <input type="text" className="w-full bg-[#0e0e0e] border-none rounded-lg p-6  font-['Inter'] text-[#e5e2e1] placeholder:text-[rgba(132,147,150,0.4)] focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#c3f5ff] transition-all resize-none leading-relaxed text-sm" placeholder="Two Sum" onChange={(e)=>setTitle(e.target.value)}/>


          </section>

          {/* ── Question Section ── */}
          <section className="bg-[#201f1f] p-8 rounded-xl border border-[rgba(132,147,150,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 64, fontVariationSettings: "'FILL' 1" }}
              >
                description
              </span>
            </div>
            <label className="block font-['Space_Grotesk'] text-xl font-semibold mb-6 text-[#e5e2e1]">
              Question Description
            </label>
            <textarea
              className="w-full bg-[#0e0e0e] border-none rounded-lg p-6 min-h-[300px] font-['Inter'] text-[#e5e2e1] placeholder:text-[rgba(132,147,150,0.4)] focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#c3f5ff] transition-all resize-none leading-relaxed text-sm"
              placeholder="Detail the problem logic, expected behavior, and core objective..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </section>

          {/* ── Input / Output Format Section ── */}
          <section className="bg-[#201f1f] p-8 rounded-xl border border-[rgba(132,147,150,0.15)]">
            <div className="flex justify-between items-center mb-8">
              <label className="block font-['Space_Grotesk'] text-xl font-semibold text-[#e5e2e1]">
                Format
              </label>
              <span className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-widest">
                I/O Specification
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-tighter">
                  Input Format
                </label>
                <textarea
                  className="w-full bg-[#0e0e0e] border-none rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#e5e2e1] placeholder:text-[rgba(132,147,150,0.4)] focus:outline-none focus:ring-1 focus:ring-[#c3f5ff]/20 resize-none h-36 leading-relaxed"
                  placeholder={
                    "First line contains n (size of array).\nSecond line contains n space-separated integers.\nThird line contains target."
                  }
                  value={inputFormat}
                  onChange={(e) => setInputFormat(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-tighter">
                  Output Format
                </label>
                <textarea
                  className="w-full bg-[#0e0e0e] border-none rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#e5e2e1] placeholder:text-[rgba(132,147,150,0.4)] focus:outline-none focus:ring-1 focus:ring-[#c3f5ff]/20 resize-none h-36 leading-relaxed"
                  placeholder={
                    "Print two space-separated integers representing the indices of the two numbers."
                  }
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                />
              </div>
            </div>
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
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 18 }}
                      >
                        key
                      </span>
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
                      <textarea
                        className="w-full bg-[#0e0e0e] border-none rounded-md px-4 py-3 font-['JetBrains_Mono'] text-sm text-[#9cf0ff] focus:outline-none focus:ring-1 focus:ring-[#c3f5ff]/20 resize-none h-28 leading-relaxed placeholder:text-[#849396]/40"
                        placeholder={"4\n2 7 11 15\n9"}
                        value={ex.input}
                        onChange={(e) =>
                          updateExample(ex.id, "input", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-['JetBrains_Mono'] text-[#849396] uppercase tracking-tighter">
                        Output Data
                      </label>
                      <textarea
                        className="w-full bg-[#0e0e0e] border-none rounded-md px-4 py-3 font-['JetBrains_Mono'] text-sm text-[#ffdf96] focus:outline-none focus:ring-1 focus:ring-[#c3f5ff]/20 resize-none h-28 leading-relaxed placeholder:text-[#849396]/40"
                        placeholder={"0 1"}
                        value={ex.output}
                        onChange={(e) =>
                          updateExample(ex.id, "output", e.target.value)
                        }
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
                      onChange={(e) =>
                        updateExample(ex.id, "explanation", e.target.value)
                      }
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
              disabled={isSubmitting}
              className="w-full md:w-auto bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff] px-12 py-4 rounded-lg font-['Space_Grotesk'] font-extrabold text-[#00363d] shadow-[0px_10px_30px_rgba(0,218,243,0.2)] hover:shadow-[0px_15px_40px_rgba(0,218,243,0.3)] hover:-translate-y-1 transform transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isSubmitting ? "hourglass_top" : "save"}
              </span>
              {isSubmitting ? "Saving..." : "Start Coding"}
            </button>
          </div>

          {/* ── Feedback ── */}
          {submitError && (
            <p className="text-[#ffb4ab] text-sm font-['JetBrains_Mono'] text-right">
              ✕ {submitError}
            </p>
          )}
          {submitSuccess && (
            <p className="text-[#00daf3] text-sm font-['JetBrains_Mono'] text-right">
              ✓ Problem saved successfully.
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
