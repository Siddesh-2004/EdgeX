import { useEffect, useState } from "react";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditor from "../components/CodeEditor";
import api from "../axios/axios.config";
import {useParams} from "react-router-dom";
export default function ProblemPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const  [testCase,setTestCase] = useState(null);
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  console.log(problemId)
  useEffect(()=>{
    const loadProblem=async()=>{
      try{
        const response=await api.get(`/problems/getProblem/${problemId}`);
        console.log(response.data.data);
        setProblem(response.data.data);
        
      }catch(err){
        console.log(err);
      }
    }
    loadProblem();      
  },[])
  useEffect(()=>{
    const loadTestCase=async()=>{
      try{
        const response=await api.get(`/testCases/getTestCase/${problemId}`);
        console.log(response.data.data);
        setTestCase(response.data.data);
      }catch(err){
        console.log(err);
      }
    }
    loadTestCase();
  },[])
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
  if(!problem){
    return <p>Loading..</p>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#131313]">

      {/* ── Left Panel (35%) ── */}
      <ProblemPanel problem={problem} />

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