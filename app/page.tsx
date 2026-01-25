import Image from "next/image";

export default function Home() {
return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-yellow-400">
      {/* Aici vine Hero Section */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">BeeFair 🐝</h1>
        <p className="text-xl">Nu te mai certa pe bani.</p>
        
        {/* Aici pui formularul de Waitlist */}
        <button className="bg-yellow-500 text-black px-4 py-2 rounded mt-4">
          Join the Hive
        </button>
      </div>
    </main>
  )
}
