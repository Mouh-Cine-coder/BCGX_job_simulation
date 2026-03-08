"use client";

import axios from "axios";
import { use, useState, Suspense, Component } from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

// ── Constants ─────────────────────────────────────────────────────────────────

const companies = ["Apple", "Microsoft", "Tesla"] as const;

const questions = [
    "What is the total revenue and how has it grown",
    "How profitable it is",
    "How has net income changed over the last year",
    "Is it financially stable",
    "How much cash it's generating",
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
    company: string;
    question: string;
}

interface ApiResponse {
    company: string;
    question: string;
    answer: string;
}

// ── API ───────────────────────────────────────────────────────────────────────

const submitForm = (data: FormData): Promise<ApiResponse> => {
    console.log(data);
    return axios
        .post<ApiResponse>("http://127.0.0.1:8000/", data)
        .then((res) => res.data);
};

// ── Error Boundary ────────────────────────────────────────────────────────────
// Required when using use() — catches rejected Promises that use() throws

class ErrorBoundary extends Component<
    { fallback: React.ReactNode; children: React.ReactNode },
    { hasError: boolean }
> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

// ── Form Result ───────────────────────────────────────────────────────────────
// use() suspends this component until the Promise resolves

const FormResult = ({ promise }: { promise: Promise<ApiResponse> }) => {
    const data = use(promise); // suspends until resolved, throws if rejected

    return (
        <div className="space-y-3 w-full">
            <p className="text-slate-500 text-xs tracking-widest uppercase flex items-center gap-2">
                <span className="w-3 h-px bg-slate-500" />
                Response — {data.company}
            </p>
            <p className="text-slate-400 text-sm italic">"{data.question}?"</p>
            <p className="text-slate-200 text-base leading-relaxed">
                {data.answer}
            </p>
        </div>
    );
};

// ── Chatbot ───────────────────────────────────────────────────────────────────

function ChatBot() {
    const [formData, setFormData] = useState<FormData>({
        company: "",
        question: "",
    });
    const [promise, setPromise] = useState<Promise<ApiResponse> | null>(null);

    const isReady = formData.company !== "" && formData.question !== "";

    const handleSubmit = () => {
        if (!isReady) return;
        console.log("[v0] Form submitted with data:", formData);

        setPromise(submitForm(formData));
    };

    return (
        <div className="space-y-6">
            {/* Query Builder */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-8">
                <p className="text-slate-500 text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
                    <span className="w-3 h-px bg-slate-500" />
                    Query Builder
                </p>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-4 text-xl text-slate-200">
                    <span className="text-slate-400 font-light">From</span>


                    
                    {/* FIX: use onSelect to update formData.company */}
                    <Combobox
                        items={companies}
                       
                    >
                        <ComboboxInput
                            className="
                                bg-slate-800 border border-slate-600 hover:border-blue-500/70
                                focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30
                                text-blue-300 placeholder:text-slate-500
                                rounded-lg px-4 py-2 text-base font-medium
                                transition-all duration-200 min-w-40
                            "
                            placeholder="Company ↓"
                        />
                        <ComboboxContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/60">
                            <ComboboxEmpty className="text-slate-500 text-sm p-3">
                                No companies found.
                            </ComboboxEmpty>
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

                    {/* FIX: use onSelect instead of onChange to update formData.question */}
                    <Combobox items={questions}>
                        <ComboboxInput
                            className="
                                bg-slate-800 border border-slate-600 hover:border-blue-500/70
                                focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30
                                text-blue-300 placeholder:text-slate-500
                                rounded-lg px-4 py-2 text-base font-medium
                                transition-all duration-200 min-w-72
                            "
                            placeholder="select a question ↓"
                        />
                        <ComboboxContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/60 max-w-sm">
                            <ComboboxEmpty className="text-slate-500 text-sm p-3">
                                No questions found.
                            </ComboboxEmpty>
                            <ComboboxList className="p-1">
                                {(item) => (
                                    <ComboboxItem
                                        onSelect={(selectedValue) => {
                                            setFormData({
                                                ...formData,
                                                question:
                                                    selectedValue.currentTarget
                                                        .textContent,
                                            });
                                            console.log(formData);
                                        }}
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

                <div className="mt-8 flex justify-end">
                    {/* FIX: type="button" prevents page reload when inside a form */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isReady}
                        className="
                            px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide
                            bg-blue-500 hover:bg-blue-400 active:bg-blue-600
                            text-white shadow-lg shadow-blue-500/25
                            transition-all duration-200 hover:shadow-blue-400/40
                            disabled:opacity-40 disabled:cursor-not-allowed
                        "
                    >
                        Ask FinSight →
                    </button>
                </div>
            </div>

            {/* Response card */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 backdrop-blur-sm min-h-50 p-8 flex items-center justify-center">
                {/* FIX: show placeholder only when no promise yet */}
                {!promise ? (
                    <div className="text-center space-y-2">
                        <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center mx-auto">
                            <span className="text-slate-600 text-lg">◈</span>
                        </div>
                        <p className="text-slate-600 text-sm">
                            Select a company and a question to get started.
                        </p>
                    </div>
                ) : (
                    // FIX: ErrorBoundary catches rejected Promises from use()
                    <ErrorBoundary
                        fallback={
                            <p className="text-red-400 text-sm">
                                Something went wrong. Please try again.
                            </p>
                        }
                    >
                        {/* Suspense shows loading state while Promise is pending */}
                        <Suspense
                            fallback={
                                <div className="flex items-center gap-3 text-slate-500 text-sm">
                                    <span className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                                    Fetching insight...
                                </div>
                            }
                        >
                            <FormResult promise={promise} />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </div>
        </div>
    );
}

export default ChatBot;
