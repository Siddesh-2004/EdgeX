export default function Landing() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-['Inter'] selection:bg-[#00e5ff] selection:text-[#001f24]">

      {/* ── Nav ── */}
      <nav className="bg-[#131313]/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center w-full px-8 py-4 shadow-[0px_20px_40px_rgba(0,218,243,0.08)] border-b border-white/5">
        <div className="flex items-center gap-12">
          <span className="font-['Space_Grotesk'] text-2xl font-bold tracking-tighter text-[#C3F5FF]">EdgeX</span>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-tight">
            <a href="#" className="text-[#00E5FF] border-b-2 border-[#00E5FF] pb-1">Features</a>
            <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors">Docs</a>
            <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-lg bg-transparent text-slate-100 hover:bg-slate-800/50 transition-all duration-300 active:scale-95 text-sm font-medium">
            Sign In
          </button>
          <button className="px-5 py-2 rounded-lg bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff] text-[#00363d] font-bold text-sm transition-all duration-300 active:scale-95 shadow-[0px_10px_20px_rgba(0,218,243,0.2)]">
            Get Started
          </button>
        </div>
      </nav>

      <main>

        {/* ── Hero ── */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00e5ff] blur-[120px] opacity-20 pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#00626e] blur-[100px] opacity-20 pointer-events-none z-0" />

          <div className="relative z-10 max-w-5xl w-full text-center mb-16">
            <div className="font-['Space_Grotesk'] text-[#00e5ff] text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
              EdgeX
            </div>
            <h1 className="font-['Space_Grotesk'] text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Find where your <span className="text-[#00e5ff] italic">code fails</span>
            </h1>
            <p className="text-[#bac9cc] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              The code execution platform that lets you run code against auto-generated test cases in a LeetCode-style environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff] text-[#00363d] font-bold text-lg hover:brightness-110 transition-all active:scale-95">
                Get Started
              </button>
              <button className="px-8 py-4 rounded-lg border border-[rgba(132,147,150,0.15)] bg-[#2a2a2a] text-[#e5e2e1] font-medium text-lg hover:bg-[#393939] transition-all active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_circle</span>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Editor visual */}
          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <div className="bg-[#0e0e0e] rounded-xl border border-[rgba(132,147,150,0.15)] overflow-hidden shadow-2xl">

              {/* Chrome bar */}
              <div className="bg-[#1c1b1b] px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/40" />
                  <div className="w-3 h-3 rounded-full bg-[#ffeac0]/40" />
                  <div className="w-3 h-3 rounded-full bg-[#c3f5ff]/40" />
                </div>
                <div className="text-xs font-['JetBrains_Mono'] text-slate-500 uppercase tracking-widest">
                  solution.py — EdgeX Runner
                </div>
                <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 18 }}>settings</span>
              </div>

              {/* Editor body */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">

                {/* Code panel */}
                <div className="md:col-span-7 p-6 font-['JetBrains_Mono'] text-sm bg-[#0e0e0e]">
                  <div className="flex gap-4">
                    <div className="text-slate-600 text-right select-none w-8 leading-6">
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <div key={n}>{n}</div>)}
                    </div>
                    <div className="text-slate-300 leading-6">
                      <div><span className="text-[#ffeac0]">def </span><span className="text-[#c3f5ff]">solve</span>(nums, target):</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;seen = {"{}"}</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ffeac0]">for </span>i, n <span className="text-[#ffeac0]">in </span><span className="text-[#c3f5ff]">enumerate</span>(nums):</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;diff = target - n</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ffeac0]">if </span>diff <span className="text-[#ffeac0]">in </span>seen:</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ffeac0]">return </span>[seen[diff], i]</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seen[n] = i</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ffeac0]">return </span>[]</div>
                      <div>&nbsp;</div>
                      <div className="bg-[#c3f5ff]/10 border-l-2 border-[#00e5ff] px-2 py-1 block w-full">
                        # EdgeX generating edge cases...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test runner panel */}
                <div className="md:col-span-5 bg-[#201f1f] border-l border-white/5 p-6 flex flex-col">
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#00e5ff] mb-4">Test Runner</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-[#0e0e0e] p-3 rounded-lg border-l-2 border-[#c3f5ff]">
                        <span className="text-sm font-['JetBrains_Mono'] text-slate-300">Case #1: Standard</span>
                        <span className="text-xs text-[#c3f5ff] font-bold">PASSED</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#0e0e0e] p-3 rounded-lg border-l-2 border-[#c3f5ff]">
                        <span className="text-sm font-['JetBrains_Mono'] text-slate-300">Case #2: Empty Array</span>
                        <span className="text-xs text-[#c3f5ff] font-bold">PASSED</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#0e0e0e] p-3 rounded-lg border-l-2 border-[#ffb4ab] animate-pulse">
                        <span className="text-sm font-['JetBrains_Mono'] text-slate-300">Case #3: Large Input</span>
                        <span className="text-xs text-[#ffb4ab] font-bold">EXECUTING...</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="bg-[#0e0e0e] p-4 rounded-lg font-['JetBrains_Mono'] text-xs">
                      <p className="text-slate-500 mb-2">// Diagnostic Data</p>
                      <p className="text-slate-300">Memory: 124MB</p>
                      <p className="text-slate-300">Time: 42ms</p>
                      <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00e5ff] w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Auto-Generated Test Cases ── */}
        <section className="py-24 px-6 bg-[#1c1b1b]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div>
                <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Auto-Generated <br /><span className="text-[#c3f5ff]">Test Cases</span>
                </h2>
                <p className="text-[#bac9cc] text-lg mb-8 leading-relaxed">
                  Stop writing repetitive boilerplate. EdgeX uses intelligent fuzzing to generate hundreds of critical edge cases that catch the bugs you missed.
                </p>
                <ul className="space-y-6">
                  {[
                    { icon: "filter_alt",    title: "Extreme Bounds",    desc: "Testing against INT_MAX, very large strings, and deep recursion." },
                    { icon: "layers_clear",  title: "Null & Empty Safety", desc: "Automatic injection of null pointers, empty arrays, and malformed objects." },
                    { icon: "speed",         title: "Race Conditions",   desc: "Simulating concurrent access to identify non-deterministic failures." },
                  ].map(({ icon, title, desc }) => (
                    <li key={title} className="flex gap-4 items-start">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-[#c3f5ff]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#c3f5ff]" style={{ fontSize: 18 }}>{icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#e5e2e1]">{title}</h4>
                        <p className="text-sm text-slate-400">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#201f1f] p-6 rounded-xl border border-[rgba(132,147,150,0.15)] flex flex-col justify-between aspect-square">
                  <span className="font-['JetBrains_Mono'] text-3xl font-bold text-[#00e5ff]">NaN</span>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Floating Point Error</p>
                </div>
                <div className="bg-[#2a2a2a] p-6 rounded-xl border border-[rgba(132,147,150,0.15)] flex flex-col justify-between aspect-square translate-y-8">
                  <span className="font-['JetBrains_Mono'] text-3xl font-bold text-[#c3f5ff]">0x00</span>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Memory Leak Check</p>
                </div>
                <div className="bg-[#2a2a2a] p-6 rounded-xl border border-[rgba(132,147,150,0.15)] flex flex-col justify-between aspect-square">
                  <span className="font-['JetBrains_Mono'] text-3xl font-bold text-slate-400">∞</span>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Overflow Simulation</p>
                </div>
                <div className="bg-[#201f1f] p-6 rounded-xl border border-[rgba(132,147,150,0.15)] flex flex-col justify-between aspect-square translate-y-8">
                  <span className="font-['JetBrains_Mono'] text-3xl font-bold text-[#ffb4ab]">ERR</span>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Stack Trace Insight</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Features Bento Grid ── */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-['Space_Grotesk'] text-4xl font-bold mb-4 tracking-tight">Built for Performance</h2>
              <p className="text-[#bac9cc] max-w-xl mx-auto">
                A monolith of engineering designed to provide instant feedback on every line of code you write.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">

              {/* Card 1 — 2×2 */}
              <div className="md:col-span-2 md:row-span-2 bg-[#201f1f] rounded-xl p-8 border border-[rgba(132,147,150,0.15)] flex flex-col justify-between group hover:bg-[#393939] transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[#00e5ff]">bolt</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Fast Execution</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Our proprietary kernel executes code in isolated micro-containers in under 20ms, providing near-instantaneous feedback loops for developers.
                  </p>
                </div>
                <div className="mt-8 overflow-hidden h-32 rounded-lg bg-[#0e0e0e] relative">
                  <svg className="w-full h-full opacity-30 group-hover:opacity-60 transition-all duration-700" viewBox="0 0 400 128" preserveAspectRatio="none">
                    {[...Array(7)].map((_, i) => (
                      <line key={i} x1="0" y1={10 + i * 17} x2="400" y2={10 + i * 17}
                        stroke="#00e5ff" strokeWidth={0.4 + (i % 3) * 0.3}
                        strokeOpacity={0.25 + (i % 4) * 0.15}
                        strokeDasharray={`${18 + i * 9} ${8 + i * 5}`} />
                    ))}
                    <circle cx="200" cy="64" r="22" fill="none" stroke="#00e5ff" strokeWidth="0.6" strokeOpacity="0.5" />
                    <circle cx="200" cy="64" r="38" fill="none" stroke="#00e5ff" strokeWidth="0.3" strokeOpacity="0.25" />
                    <circle cx="200" cy="64" r="55" fill="none" stroke="#00e5ff" strokeWidth="0.2" strokeOpacity="0.12" />
                  </svg>
                </div>
              </div>

              {/* Card 2 — 2×1 */}
              <div className="md:col-span-2 bg-[#201f1f] rounded-xl p-8 border border-[rgba(132,147,150,0.15)] flex items-start gap-6 group hover:bg-[#393939] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#c3f5ff]/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#c3f5ff]">edit_note</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Custom Test Cases</h3>
                  <p className="text-slate-400 text-sm">
                    Define your own edge cases with our intuitive JSON-based schema or simple text input for specialized domain logic.
                  </p>
                </div>
              </div>

              {/* Card 3 — 1×1 */}
              <div className="md:col-span-1 bg-[#201f1f] rounded-xl p-8 border border-[rgba(132,147,150,0.15)] flex flex-col group hover:bg-[#393939] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#c3f5ff]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#c3f5ff]">troubleshoot</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Error Diagnostics</h3>
                <p className="text-slate-500 text-xs">Rich visualization of memory usage and flame graphs for bottlenecks.</p>
              </div>

              {/* Card 4 — 1×1 */}
              <div className="md:col-span-1 bg-[#201f1f] rounded-xl p-8 border border-[rgba(132,147,150,0.15)] flex flex-col group hover:bg-[#393939] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#c3f5ff]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#c3f5ff]">code_blocks</span>
                </div>
                <h3 className="text-lg font-bold mb-2">20+ Languages</h3>
                <p className="text-slate-500 text-xs">From C++ and Rust to Python and Zig. We support the cutting edge.</p>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#2a2a2a] p-12 md:p-20 text-center relative overflow-hidden border border-[rgba(132,147,150,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c3f5ff]/5 to-transparent pointer-events-none" />
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
              Start Coding Now
            </h2>
            <p className="text-[#bac9cc] text-lg mb-10 max-w-xl mx-auto">
              Join thousands of developers who are shipping more reliable code with EdgeX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="px-10 py-5 rounded-lg bg-gradient-to-br from-[#c3f5ff] to-[#00e5ff] text-[#00363d] font-bold text-xl hover:scale-105 transition-all active:scale-95">
                Launch Console
              </button>
              <button className="px-10 py-5 rounded-lg bg-[#0e0e0e] text-[#e5e2e1] font-medium border border-white/5 hover:bg-[#131313] transition-all active:scale-95">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#131313] w-full border-t border-white/5 px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <span className="font-['Space_Grotesk'] font-bold text-[#C3F5FF] text-xl">EdgeX</span>
          <p className="text-xs uppercase tracking-widest text-slate-500">© 2024 EdgeX. Kinetic Precision.</p>
        </div>
        <div className="flex gap-12">
          {[
            { label: "Platform", links: ["Features", "Status"] },
            { label: "Company",  links: ["Legal", "Privacy"] },
            { label: "Social",   links: ["X / Twitter", "GitHub"] },
          ].map(({ label, links }) => (
            <div key={label} className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-bold">{label}</p>
              {links.map(l => (
                <a key={l} href="#" className="text-slate-500 hover:text-[#C3F5FF] transition-colors duration-200 text-xs">{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-[#201f1f] flex items-center justify-center hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 18 }}>alternate_email</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#201f1f] flex items-center justify-center hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 18 }}>public</span>
          </button>
        </div>
      </footer>

    </div>
  );
}