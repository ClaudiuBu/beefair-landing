import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col items-center justify-center p-6 text-center">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-400/20 blur-[100px] rounded-full -z-10"></div>

      {/* Logo (Optional - dacă vrei să apară și aici) */}
      <div className="mb-8">
        <Image src="/img/logo_desktop.png" alt="BeeFair" width={120} height={40} className="mx-auto opacity-80" />
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-500">
        
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold mb-3 text-white">
          Bine ai venit în Stup! 🐝
        </h1>
        
        <p className="text-neutral-400 mb-8 leading-relaxed">
          Te-am adăugat pe lista de așteptare. Ești printre primii care vor afla când lansăm aplicația.
        </p>

        {/* Butoane */}
        <div className="space-y-3">
            {/* Link spre Instagram (Exemplu) */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/5"
            >
              <Instagram className="w-5 h-5 text-pink-500" />
              Urmărește progresul pe Instagram
            </a>

            <Link 
              href="/" 
              className="w-full text-neutral-500 hover:text-yellow-400 text-sm font-medium py-3 flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h4" />
              Înapoi la prima pagină
            </Link>
        </div>
      </div>

      <p className="mt-8 text-neutral-600 text-xs">
        &copy; 2026 BeeFair. Smart living.
      </p>
    </div>
  );
}