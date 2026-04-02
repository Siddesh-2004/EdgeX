import { useState ,useEffect} from "react";
import Description from "./Description";
import TestCaseCard from "./TestCaseCard";
import api from "../axios/axios.config";
import { useParams } from "react-router-dom";

export default function ProblemPanel({ problem ,isRunning,testCase,setTestCase}) {
  const [activeTab, setActiveTab] = useState("description");
  const { problemId } = useParams();

useEffect(()=>{
    const loadTestCase=async()=>{
      try{
        const response=await api.get(`/problems/getSolutionForTestCases/${problemId}`);
        console.log("Response for testCase",response.data.data);
        setTestCase(response.data.data);
      }catch(err){
        console.log(err);
      }
    }
    loadTestCase();
  },[])

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
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar ">
        {activeTab === "description" && <Description problem={problem} />}
        {isRunning || (activeTab === "testcases") && (
         testCase? testCase.map((testCase, index) => {
          return (
            <div>
            <TestCaseCard key={index} testCase={testCase} index={index} className="mb-4" />
            <div className="mb-4"></div>
            </div>
          );
        }): <p> Loading test cases...</p>
        )}
      </div>

    </section>
  );
}