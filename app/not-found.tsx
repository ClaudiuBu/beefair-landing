import Link from 'next/link'
import { Home, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-yellow-400/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <AlertTriangle className="w-12 h-12 text-yellow-400" />
      </div>
      <h2 className="text-4xl font-bold mb-4">Rătăcit în Stup?</h2>
      <p className="text-neutral-400 mb-8 max-w-md">
        Pagina pe care o cauți nu există. S-ar putea să fi zburat.
      </p>
      <Link 
        href="/"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        Înapoi la Bază
      </Link>
    </div>
  )
}