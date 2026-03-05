import ChatBot from "./components/ChatBot"

function App() {
  
  return (
    <main className="p-10  h-screen flex flex-col items-center bg-slate-200">
      <h1 className="p-3 text-3xl font-bold">Financial insights from 10-K data, at a glance.</h1>
      <ChatBot />
    </main>
  )
}

export default App
