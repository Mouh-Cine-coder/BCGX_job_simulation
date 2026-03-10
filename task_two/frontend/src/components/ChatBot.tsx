"use client";

import axios from "axios";
import { use, useState, Suspense, Component } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
            <p className="text-slate-200 text-base leading-relaxed whitespace-pre-wrap">
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

                    <Select
                        onValueChange={(value) =>
                            setFormData({ ...formData, company: value })
                        }
                    >
                        <SelectTrigger
                            className="
                                w-40 bg-slate-800 border border-slate-600
                                hover:border-blue-500/70 focus:ring-1 focus:ring-blue-400/30
                                text-blue-300 rounded-lg px-4 py-2 text-base font-medium
                                transition-all duration-200
                            "
                        >
                            <SelectValue placeholder="Company ↓" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/60">
                            <SelectGroup>
                                {companies.map((company) => (
                                    <SelectItem
                                        key={company}
                                        value={company}
                                        className="text-slate-300 hover:bg-blue-500/10 hover:text-blue-300 rounded-lg text-sm cursor-pointer transition-colors"
                                    >
                                        {company}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <span className="text-slate-600">,</span>

                    <Select
                        onValueChange={(value) =>
                            setFormData({ ...formData, question: value })
                        }
                    >
                        <SelectTrigger
                            className="
                                w-72 bg-slate-800 border border-slate-600
                                hover:border-blue-500/70 focus:ring-1 focus:ring-blue-400/30
                                text-blue-300 rounded-lg px-4 py-2 text-base font-medium
                                transition-all duration-200
                            "
                        >
                            <SelectValue placeholder="Select a question ↓" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/60 max-w-sm">
                            <SelectGroup>
                                {questions.map((question) => (
                                    <SelectItem
                                        key={question}
                                        value={question}
                                        className="text-slate-300 hover:bg-blue-500/10 hover:text-blue-300 rounded-lg text-sm cursor-pointer transition-colors"
                                    >
                                        {question}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <span className="text-slate-400 font-light">?</span>
                </div>

                <div className="mt-8 flex justify-end">
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
