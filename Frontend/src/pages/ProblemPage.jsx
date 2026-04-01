import { useState } from "react";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditor from "../components/CodeEditor";

export default function ProblemPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const handleRun = async (code, language) => {
    setIsRunning(true);
    setTestResults(null);
    try {
      // Replace with your actual API call
      // const res = await api.post("/submissions/run", { code, language });
      // setTestResults(res.data);
      await new Promise((r) => setTimeout(r, 1500)); // simulate
      setTestResults({ status: "success", output: "1 1" });
    } catch (err) {
      setTestResults({ status: "error", output: err.message });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async (code, language) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual API call
      // const res = await api.post("/submissions/submit", { code, language });
      await new Promise((r) => setTimeout(r, 2000)); // simulate
      console.log("Submitted:", { code, language });
    } catch (err) {
      console.error("Submit error:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#131313]">

      {/* ── Left Panel (35%) ── */}
      <ProblemPanel />

      {/* ── Right Panel (65%) ── */}
      <CodeEditor
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />

      {/* ── Floating AI Button ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 rounded-full bg-[#00e5ff] text-[#00363d] flex items-center justify-center shadow-[0px_20px_40px_rgba(0,218,243,0.3)] hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            question_answer
          </span>
        </button>
      </div>

      {/* ── Background Decorative Glow ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#c3f5ff]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#c3f5ff]/3 blur-[120px] rounded-full" />
      </div>

    </div>
  );
}