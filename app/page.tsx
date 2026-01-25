"use client";

import React, { useState } from 'react';
import { ScanLine, Zap, Users, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aici vei lega mai tarziu Tally sau Mailchimp
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
<nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* AICI ESTE MODIFICAREA PENTRU LOGO */}
          <div className="flex items-center">
            <Image 
              src="/img/logo_desktop.png"       // Caută automat în folderul public
              alt="BeeFair Logo"
              width={140}           // Lățimea estimată (ajustează dacă e nevoie)
              height={40}           // Înălțimea estimată
              priority              // Încarcă logo-ul instant (fără întârziere)
              className="h-10 w-auto object-contain" // CSS-ul care controlează dimensiunea finală
            />
          </div>

          <a href="#join" className="hidden md:block text-sm font-medium text-neutral-400 hover:text-yellow-400 transition-colors">
            Contact
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6 border border-yellow-400/20">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          Coming Soon
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          Gata cu certurile pe <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            bani în apartament.
          </span>
        </h1>

      <h2 className="text-2xl md:text-3xl font-light text-neutral-300 mb-8 tracking-wide">
          Smart living for <span className="text-yellow-400 font-normal italic">busy bees</span>
      </h2>
        <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          BeeFair scanează facturile, le împarte corect și trimite notificări ("Sting") 
          colegilor care uită să plătească. Primul asistent financiar cu AI pentru Shared Living.
        </p>

        {/* Formular Waitlist */}
        <div id="join" className="max-w-md mx-auto relative">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Adresa ta de email..." 
                className="flex-1 bg-neutral-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder:text-neutral-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                Intră în Stup
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center justify-center gap-2 animate-in fade-in zoom-in">
              <CheckCircle2 className="w-5 h-5" />
              <span>Te-am trecut pe listă! Îți dăm un semn la lansare. 🐝</span>
            </div>
          )}
          <p className="text-neutral-600 text-xs mt-3">
            <ShieldCheck className="w-3 h-3 inline mr-1" />
            Nu trimitem spam. Doar update-uri importante.
          </p>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-20 bg-neutral-900/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-yellow-400/30 transition-colors group">
              <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-yellow-400">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Snap & Scan</h3>
              <p className="text-neutral-400 leading-relaxed">
                Nu mai introduci cifre manual. Faci o poză la contor sau factură, iar AI-ul nostru extrage datele instant.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-yellow-400/30 transition-colors group">
              <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-yellow-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fair Split</h3>
              <p className="text-neutral-400 leading-relaxed">
                Calculăm automat cine cât datorează. Gestionăm situațiile complexe când cineva pleacă în vacanță.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-yellow-400/30 transition-colors group">
              <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-yellow-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Sting</h3>
              <p className="text-neutral-400 leading-relaxed">
                Un coleg întârzie cu banii? Trimite-i un "Sting" (ghiont) anonim din aplicație ca să-i amintești să plătească.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 border-t border-white/10 text-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} BeeFair România. Toate drepturile rezervate.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">TikTok</a>
        </div>
      </footer>
      
    </div>
  );
}