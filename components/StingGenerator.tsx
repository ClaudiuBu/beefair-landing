'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Opțional: Pentru animații fine (npm install framer-motion)
// Dacă nu vrei framer-motion, scoate <motion.div> și pune doar <div>

const STING_TEMPLATES = {
  polite: [
    (name: string, item: string, cost: string) => `Hey ${name} 👋, mic reminder pentru ${item}. Sunt ${cost} RON. Mersi! 🐝`,
    (name: string, item: string, cost: string) => `Salut ${name}! Am pus ${item} (${cost} RON) pe BeeFair. Verifici când poți?`,
  ],
  funny: [
    (name: string, item: string, cost: string) => `Alo ${name}, ${item} a fost bun, dar nu e gratis. ${cost} RON, te rog! 🍕`,
    (name: string, item: string, cost: string) => `Breaking News: ${name} are o datorie de ${cost} RON pentru ${item}. Poliția BeeFair e pe drum! 🚓`,
    (name: string, item: string, cost: string) => `${name}, portofelul meu plânge după cei ${cost} RON de la ${item}. Help a bro out! 💸`,
  ],
  savage: [
    (name: string, item: string, cost: string) => `Băi ${name}, nu fi trântor! 🐌 ${item} nu se plătește singur. ${cost} RON. ACUM. 💀`,
    (name: string, item: string, cost: string) => `Dacă ${name} nu dă ${cost} RON pentru ${item} în 10 minute, îl scoatem din Stup. Tic-tac. 💣`,
    (name: string, item: string, cost: string) => `Văd că ai bani de cafea, dar de ${item} (${cost} RON) ai uitat? Rușinică ${name}. 🐝🔪`,
  ]
};

export default function StingGenerator() {
  const [name, setName] = useState('');
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const [vibe, setVibe] = useState<'polite' | 'funny' | 'savage'>('funny');
  const [generatedSting, setGeneratedSting] = useState<string | null>(null);

  const handleGenerate = () => {
    // Default values if empty
    const tName = name || 'Andrei';
    const tItem = item || 'Pizza';
    const tCost = cost || '50';

    const templates = STING_TEMPLATES[vibe];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    setGeneratedSting(randomTemplate(tName, tItem, tCost));
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 bg-neutral-950 text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Test <span className="text-[#F7E01C]">The Sting</span> 🐝
        </h2>
        <p className="text-neutral-400 text-lg">
          Vezi cum îți recuperezi banii fără să fii tu "ăla rău". Lasă aplicația să o facă.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* === PARTEA 1: INPUTS (Panoul de Comandă) === */}
        <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <div className="space-y-6">
            
            {/* Input: Cine? */}
            <div>
              <label className="block text-neutral-400 text-sm font-bold mb-2">Cine e trântorul?</label>
              <input 
                type="text" 
                placeholder="ex: Andrei" 
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#F7E01C] transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Input: Ce? & Cât? */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-neutral-400 text-sm font-bold mb-2">Pe ce?</label>
                <input 
                  type="text" 
                  placeholder="ex: Pizza" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#F7E01C]"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-neutral-400 text-sm font-bold mb-2">RON</label>
                <input 
                  type="number" 
                  placeholder="50" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#F7E01C]"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
            </div>

            {/* Vibe Selector */}
            <div>
              <label className="block text-neutral-400 text-sm font-bold mb-3">Nivel de Răutate:</label>
              <div className="flex bg-neutral-800 p-1 rounded-xl">
                {(['polite', 'funny', 'savage'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                      vibe === v 
                      ? 'bg-[#F7E01C] text-neutral-950 shadow-lg' 
                      : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {v} {v === 'savage' ? '💀' : v === 'funny' ? '😂' : '😇'}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button 
              onClick={handleGenerate}
              className="w-full bg-[#F7E01C] hover:bg-[#ffe600] text-neutral-950 font-black py-4 rounded-xl text-lg shadow-lg shadow-yellow-500/20 transform active:scale-95 transition-all"
            >
              GENERATE STING 🐝
            </button>
          </div>
        </div>

        {/* === PARTEA 2: RESULT (Telefonul Virtual) === */}
        <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-neutral-800 shadow-2xl flex flex-col overflow-hidden">
          {/* Notch & Status Bar */}
          <div className="absolute top-0 w-full h-8 bg-black z-20 flex justify-center">
            <div className="w-32 h-6 bg-neutral-900 rounded-b-xl"></div>
          </div>
          
          {/* Screen Content */}
          <div 
            className="flex-1 bg-cover bg-center flex items-center justify-center p-4"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1000&auto=format&fit=crop")' }} // Un wallpaper dark abstract
          >
            {/* The Notification Card */}
            {generatedSting && (
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                key={generatedSting} // Re-animate on change
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl overflow-hidden"
              >
                {/* Header Notificare */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#F7E01C] rounded-md flex items-center justify-center">
                      <span className="text-xs font-bold">B</span>
                    </div>
                    <span className="text-white text-xs font-bold uppercase tracking-wider">BEEFAIR • ACUM</span>
                  </div>
                </div>
                
                {/* Body Notificare */}
                <div className="text-white text-sm font-medium leading-relaxed drop-shadow-md">
                  {generatedSting}
                </div>
              </motion.div>
            )}

            {!generatedSting && (
              <div className="text-white/50 text-center text-sm px-4">
                Apasă "Generate" să vezi magia.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}