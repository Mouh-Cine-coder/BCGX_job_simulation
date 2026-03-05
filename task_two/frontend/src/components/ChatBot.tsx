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
    "is it financially stable",
    "How much cash it's generating"
] as const 


function ChatBot() {
    return (
        <section className="pt-10 flex items-center text-2xl bg-amber-100">
            From
            <Combobox items={companies}>
                <ComboboxInput className="ml-1"  placeholder="Select a Company" />
                <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                        {item}
                        </ComboboxItem>
                    )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            ,
            <Combobox items={questions}>
                <ComboboxInput className="mx-1" placeholder="Select a Question" />
                <ComboboxContent >
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList >
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                        {item}
                        </ComboboxItem>
                    )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            ?
        </section>
    )
}

export default ChatBot;