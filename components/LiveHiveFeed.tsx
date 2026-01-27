'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// === 1. BAZA DE DATE DE SIMULARE (Fake Data) ===
// Aici punem scenarii care se rotesc random ca să pară "alive"
const MOCK_EVENTS = [
  { type: 'payment', user: 'Andrei', action: 'a plătit', target: 'Pizza Party', amount: '85 RON', time: 'acum 2 sec', avatar: 'A', color: 'bg-blue-500' },
  { type: 'sting', user: 'Maria', action: 'i-a dat STING lui', target: 'Vlad', emoji: '🐝', time: 'acum 5 sec', avatar: 'M', color: 'bg-pink-500' },
  { type: 'add', user: 'Alex', action: 'a adăugat', target: 'Chirie Ianuarie', amount: '1200 RON', time: 'acum 12 sec', avatar: 'A', color: 'bg-green-500' },
  { type: 'settle', user: 'Diana', action: 'a stins datoria către', target: 'Andrei', amount: 'Completed ✅', time: 'acum 30 sec', avatar: 'D', color: 'bg-purple-500' },
  { type: 'reaction', user: 'Vlad', action: 'a reacționat cu 🔥 la', target: 'Nota Kaufland', amount: '', time: 'acum 45 sec', avatar: 'V', color: 'bg-orange-500' },
  { type: 'payment', user: 'Bogdan', action: 'a plătit', target: 'Uber spre Club', amount: '25 RON', time: 'acum 1 min', avatar: 'B', color: 'bg-indigo-500' },
];

export default function LiveHiveFeed() {
  const [feed, setFeed] = useState<any[]>(MOCK_EVENTS.slice(0, 3)); // Începem cu 3 iteme

  // === 2. MOTORUL DE SIMULARE ===
  useEffect(() => {
    const interval = setInterval(() => {
      // Alegem un event random din listă
      const randomEvent = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)];
      
      // Adăugăm un pic de variație la ID ca să fie unic pentru React key
      const newEvent = { ...randomEvent, id: Date.now() };

      setFeed((prev) => {
        // Păstrăm doar ultimele 5 evenimente ca să nu încărcăm pagina
        const newFeed = [newEvent, ...prev];
        return newFeed.slice(0, 5);
      });
    }, 3500); // Se adaugă un nou card la fiecare 3.5 secunde

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header-ul Widget-ului */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7E01C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F7E01C]"></span>
          </div>
          <h3 className="text-white font-bold tracking-wider text-sm uppercase">Live Hive Feed</h3>
        </div>
        <span className="text-neutral-500 text-xs">Realtime Activity</span>
      </div>

      {/* Containerul Listei */}
      <div className="relative h-[400px] overflow-hidden mask-gradient-b">
        {/* Un gradient mask să pară că dispar frumos jos (CSS class necesită definire sau style inline) */}
        <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 70%, #0A0A0A 100%)' }}
        ></div>

        <AnimatePresence initial={false}>
          {feed.map((item) => (
            <motion.div
              key={item.id}
              layout // Magia Framer Motion: celelalte elemente glisează lin când apare unul nou
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="mb-3"
            >
              {/* === CARDUL DE TRANZACȚIE === */}
              <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl flex items-center gap-4 shadow-lg hover:border-[#F7E01C]/30 transition-colors cursor-default">
                
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold">{item.avatar}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline flex-wrap gap-1">
                    <span className="text-white font-bold text-sm">{item.user}</span>
                    <span className="text-neutral-400 text-xs">{item.action}</span>
                    <span className="text-[#F7E01C] font-bold text-sm truncate">{item.target}</span>
                  </div>
                  <div className="text-neutral-500 text-xs mt-1 flex items-center gap-2">
                    {item.type === 'sting' && <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">STING 🐝</span>}
                    <span>{item.time}</span>
                  </div>
                </div>

                {/* Amount / Action Right */}
                <div className="text-right">
                    {item.type === 'sting' ? (
                        <div className="text-2xl animate-pulse">{item.emoji}</div>
                    ) : (
                        <span className={`font-mono font-bold text-sm ${item.type === 'settle' ? 'text-green-400' : 'text-white'}`}>
                            {item.amount}
                        </span>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}