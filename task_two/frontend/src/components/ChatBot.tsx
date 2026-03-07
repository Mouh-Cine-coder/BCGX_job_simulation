"use client"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const companies = [
    "Apple",
    "Microsoft",
    "Tesla",
] as const

const questions = [
    "What is the total revenue and how has it grown",
    "How profitable it is",
    "How has net income changed over the last year",
    "Is it financially stable",
    "How much cash it's generating"
] as const


function ChatBot() {
    return (
        <div className="space-y-6">

            {/* Query builder card */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-8">

                {/* Card label */}
                <p className="text-slate-500 text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
                    <span className="w-3 h-px bg-slate-500" />
                    Query Builder
                </p>

                {/* Template sentence */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-4 text-xl text-slate-200">
                    <span className="text-slate-400 font-light">From</span>

                    <Combobox items={companies}>
                        <ComboboxInput
                            className="
                                bg-slate-800 border border-slate-600 hover:border-blue-500/70
                                focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30
                                text-blue-300 placeholder:text-slate-500
                                rounded-lg px-4 py-2 text-base font-medium
                                transition-all duration-200 min-w-[160px]
                            "
                            placeholder="Company ↓"
                        />
                        <ComboboxContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/60">
                            <ComboboxEmpty className="text-slate-500 text-sm p-3">No companies found.</ComboboxEmpty>
                            <ComboboxList className="p-1">
                                {(item) => (
                                    <ComboboxItem
                                        key={item}
                                        value={item}
                                        className="text-slate-300 hover:bg-blue-500/10 hover:text-blue-300 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
                                    >
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>

                    <span className="text-slate-600">,</span>

                    <Combobox items={questions}>
                        <ComboboxInput
                            className="
                                bg-slate-800 border border-slate-600 hover:border-blue-500/70
                                focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30
                                text-blue-300 placeholder:text-slate-500
                                rounded-lg px-4 py-2 text-base font-medium
                                transition-all duration-200 min-w-[280px]
                            "
                            placeholder="select a question ↓"
                        />
                        <ComboboxContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/60 max-w-sm">
                            <ComboboxEmpty className="text-slate-500 text-sm p-3">No questions found.</ComboboxEmpty>
                            <ComboboxList className="p-1">
                                {(item) => (
                                    <ComboboxItem
                                        key={item}
                                        value={item}
                                        className="text-slate-300 hover:bg-blue-500/10 hover:text-blue-300 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
                                    >
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>

                    <span className="text-slate-400 font-light">?</span>
                </div>

                {/* Ask button */}
                <div className="mt-8 flex justify-end">
                    <button className="
                        px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide
                        bg-blue-500 hover:bg-blue-400 active:bg-blue-600
                        text-white shadow-lg shadow-blue-500/25
                        transition-all duration-200 hover:shadow-blue-400/40
                        disabled:opacity-40 disabled:cursor-not-allowed
                    ">
                        Ask FinSight →
                    </button>
                </div>
            </div>

            {/* Response area */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 backdrop-blur-sm min-h-[200px] p-8 flex items-center justify-center">
                <div className="text-center space-y-2">
                    <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center mx-auto">
                        <span className="text-slate-600 text-lg">◈</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                        Select a company and a question to get started.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ChatBot