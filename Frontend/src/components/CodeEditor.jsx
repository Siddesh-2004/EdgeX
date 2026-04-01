import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

const LANGUAGES = [
  { label: "Python 3",   value: "python"     },
  { label: "C++",        value: "cpp"        },
  { label: "Java",       value: "java"       },
  { label: "JavaScript", value: "javascript" },
];

const DEFAULT_CODE = {
  python: `def compareTriplets(a, b):
    # Write your code here
    alice = 0
    bob = 0

    for i in range(3):
        if a[i] > b[i]:
            alice += 1
        elif a[i] < b[i]:
            bob += 1

    return [alice, bob]
`,
  cpp: `#include <vector>
using namespace std;

vector<int> compareTriplets(vector<int> a, vector<int> b) {
    // Write your code here
    int alice = 0, bob = 0;
    for (int i = 0; i < 3; i++) {
        if (a[i] > b[i]) alice++;
        else if (a[i] < b[i]) bob++;
    }
    return {alice, bob};
}
`,
  java: `import java.util.*;

public class Solution {
    // Write your code here
    public static List<Integer> compareTriplets(List<Integer> a, List<Integer> b) {
        int alice = 0, bob = 0;
        for (int i = 0; i < 3; i++) {
            if (a.get(i) > b.get(i)) alice++;
            else if (a.get(i) < b.get(i)) bob++;
        }
        return Arrays.asList(alice, bob);
    }
}
`,
  javascript: `function compareTriplets(a, b) {
    // Write your code here
    let alice = 0, bob = 0;
    for (let i = 0; i < 3; i++) {
        if (a[i] > b[i]) alice++;
        else if (a[i] < b[i]) bob++;
    }
    return [alice, bob];
}
`,
};

export default function CodeEditor({ onRun, onSubmit, isRunning, isSubmitting }) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(DEFAULT_CODE["python"]);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const editorRef = useRef(null);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang]);
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeCursorPosition((e) => {
      setCursor({ line: e.position.lineNumber, col: e.position.column });
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE[language]);
  };

  const handleRun = () => {
    if (onRun) onRun(code, language);
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(code, language);
  };

  return (
    <section className="w-[65%] flex flex-col bg-[#131313] h-screen">

      {/* ── Top Bar ── */}
      <div className="h-12 flex items-center justify-between px-4 bg-[#1c1b1b] border-b border-white/10 shrink-0">

        {/* Left: file tab + language selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#201f1f] rounded-md px-3 py-1 border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="text-xs font-['JetBrains_Mono'] font-medium text-[#e5e2e1]">
              solution.{language === "python" ? "py" : language === "cpp" ? "cpp" : language === "java" ? "java" : "js"}
            </span>
          </div>

          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-transparent text-xs font-medium text-[#bac9cc] hover:text-[#e5e2e1] transition-all border-none focus:ring-0 pr-8 py-1 cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23849396'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1rem",
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value} className="bg-[#2a2a2a]">
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right: icon actions + run/submit */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-4 border-r border-white/10 pr-4">
            <button
              onClick={handleCopy}
              title="Copy code"
              className="material-symbols-outlined text-gray-500 hover:text-white transition-all"
              style={{ fontSize: 18 }}
            >
              content_copy
            </button>
            <button
              onClick={handleReset}
              title="Reset to default"
              className="material-symbols-outlined text-gray-500 hover:text-white transition-all"
              style={{ fontSize: 18 }}
            >
              settings_backup_restore
            </button>
            <button
              title="Settings"
              className="material-symbols-outlined text-gray-500 hover:text-white transition-all"
              style={{ fontSize: 18 }}
            >
              settings
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded bg-[#353534] text-[#e5e2e1] text-[12px] font-bold hover:bg-white/10 transition-all border border-white/10 tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-1.5 rounded bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff] text-[#00363d] font-black text-[12px] flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
              >
                {isRunning ? "hourglass_top" : "play_arrow"}
              </span>
              {isRunning ? "Running..." : "Run"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Monaco Editor ── */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(val) => setCode(val ?? "")}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            tabSize: 4,
            wordWrap: "off",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              verticalScrollbarSize: 4,
              horizontalScrollbarSize: 4,
            },
          }}
        />
      </div>

      {/* ── Status Bar ── */}
      <div className="h-10 bg-[#201f1f] border-t border-white/10 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-6 text-[10px] font-medium tracking-wider uppercase">
          <div className="flex items-center gap-2 text-[#c3f5ff]">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            Ready to Run
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>memory</span>
            42.8 MB
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
            0ms
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-['JetBrains_Mono'] text-gray-500">
          <span>Ln {cursor.line}, Col {cursor.col}</span>
          <span>Spaces: 4</span>
          <span>UTF-8</span>
        </div>
      </div>

    </section>
  );
}