import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import CookieConsent from '@/components/CookieConsent';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <Link href="/" className="inline-flex items-center text-sm text-yellow-400 hover:text-yellow-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Înapoi la prima pagină
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">Politica de Confidențialitate</h1>
        </div>
        
        <p className="text-sm text-neutral-500 mb-8">Ultima actualizare: Ianuarie 2026</p>

        {/* Content */}
        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introducere</h2>
            <p>
              La <strong>BeeFair</strong> ("noi"), respectăm confidențialitatea datelor tale. 
              Această politică explică simplu ce facem cu adresa ta de email atunci când te înscrii pe lista noastră de așteptare.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Ce date colectăm</h2>
            <p>
              Colectăm strict <strong>adresa ta de email</strong>. Nu îți cerem numele, numărul de telefon sau locația în această etapă.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Cum folosim datele</h2>
            <p>
              Folosim adresa ta de email pentru un singur scop: <strong>să te anunțăm când lansăm aplicația BeeFair</strong> sau când avem actualizări majore despre progresul proiectului.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Unde stocăm datele (Terțe Părți)</h2>
            <p>Pentru a funcționa, folosim servicii sigure ale partenerilor noștri:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-400">
              <li><strong>Vercel:</strong> Găzduiește site-ul nostru (Serverele sunt în UE/US).</li>
              <li><strong>Formspree:</strong> Procesează formularul și ne trimite emailul tău în siguranță.</li>
            </ul>
            <p className="mt-2">Nu vindem și nu oferim adresa ta de email altor companii de publicitate.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Drepturile tale</h2>
            <p>
              Dacă te răzgândești, ne poți scrie oricând (răspunzând la emailurile noastre) și te vom șterge imediat de pe listă. E dreptul tău să fii uitat.
            </p>
          </section>
        </div>

        {/* Footer simplu */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-neutral-600">
          <p>BeeFair - Smart Living.</p>
        </div>

      </div>
      <CookieConsent />
    </div>
  );
}