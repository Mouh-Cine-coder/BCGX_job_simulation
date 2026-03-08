import ChatBot from "./components/ChatBot"

function App() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-start px-6 py-16 font-mono">

      {/* Grid overlay texture */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,179,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,179,237,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          10-K Financial Intelligence
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Fin<span className="text-blue-400">Sight</span>
          <span className="text-slate-500 font-light ml-2 text-2xl">10-K</span>
        </h1>

        <p className="text-slate-400 text-sm tracking-wide max-w-sm">
          Instant financial health insights from 10-K filings.
        </p>

        {/* Divider line */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-blue-500/50" />
          <div className="w-1 h-1 rounded-full bg-blue-500/50" />
          <div className="h-px w-16 bg-linear-to-l from-transparent to-blue-500/50" />
        </div>
      </div>

      {/* Chatbot */}
      <div className="relative z-10 w-full max-w-3xl">
        <ChatBot />
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-16 text-slate-600 text-xs tracking-widest uppercase">
        Apple · Microsoft · Tesla — FY2023–FY2025
      </p>
    </main>
  )
}

export default App