'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STORIES = [
  { id: 1, name: "Tu", img: "https://i.pravatar.cc/150?u=1", border: "border-red-500", queen: true },
  { id: 2, name: "Andrei", img: "https://i.pravatar.cc/150?u=2", border: "border-green-500" },
  { id: 3, name: "Ioana", img: "https://i.pravatar.cc/150?u=3", border: "border-yellow-400" },
  { id: 4, name: "Radu", img: "https://i.pravatar.cc/150?u=4", border: "border-pink-500" },
  { id: 5, name: "Maria", img: "https://i.pravatar.cc/150?u=5", border: "border-yellow-600" },
  { id: 6, name: "Vlad", img: "https://i.pravatar.cc/150?u=6", border: "border-emerald-500" },
];

const TRANSACTIONS = [
  {
    id: 1,
    user: "Andrei",
    rank: "QUEEN",
    action: <>Settled the payment for <span className="font-black">Pizza Party 🍕</span></>,
    amount: "120",
    color: "text-green-500",
    time: "2m ago",
    reactions: [{ e: "🔥", c: 2 }, { e: "🐝", c: 1 }],
    comments: [
      { user: "Ioana", text: "Mulțumesc! Am trimis partea mea." },
      { user: "Radu", text: "Perfect, am primit confirmarea." }
    ]
  },
  {
    id: 2,
    user: "Vlad",
    rank: "DRONE",
    rankIcon: "🐌",
    action: <>Added a new expense for <span className="font-black">Factura Enel ⚡</span></>,
    amount: "340",
    color: "text-yellow-400",
    time: "1h ago",
    reactions: [{ e: "😭", c: 3 }],
    hasSting: true,
    comments: []
  }
];

const HeroAppMockup = () => {
  return (
    <div className="relative mx-auto w-[320px] h-[640px] border-[10px] border-[#1a1a1a] rounded-[3rem] bg-black shadow-[0_0_50px_rgba(247,224,28,0.15)] overflow-hidden font-sans">
      
      {/* Dynamic Island / Notch */}
      <div className="absolute top-0 inset-x-0 h-7 bg-[#1a1a1a] w-36 mx-auto rounded-b-2xl z-50"></div>

      {/* FIXED HEADER */}
      <div className="pt-10 px-5 bg-black/90 backdrop-blur-xl z-40 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="w-9 h-9 bg-[#F7E01C] rounded-full flex items-center justify-center text-black text-xl font-black shadow-lg shadow-yellow-400/20 cursor-pointer">+</div>
          <div className="bg-[#1a1a1a] px-4 py-1.5 rounded-full text-[11px] text-white font-medium border border-white/5 flex items-center gap-2">
            Public feed <span className="text-[8px] opacity-50">▼</span>
          </div>
          <div className="text-[#F7E01C] text-xl">♡</div>
        </div>
        
        {/* STORIES (STING LINE) */}
        <div className="flex gap-4 overflow-hidden pb-4 border-b border-white/5">
          {STORIES.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`w-14 h-14 rounded-full border-2 ${s.border} p-0.5 relative`}>
                <img src={s.img} className="w-full h-full rounded-full grayscale-[30%]" alt={s.name} />
                {s.queen && (
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#F7E01C] text-[7px] text-black font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ring-2 ring-black">
                     👑 Queen
                   </div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">{s.name}</span>
            </div>
          ))}
        </div>

        <div className="py-4">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Public</p>
        </div>
      </div>

      {/* INFINITE SCROLLING FEED */}
      <div className="h-full relative">
        <motion.div 
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="px-4 space-y-4 pb-40"
        >
          {[...TRANSACTIONS, ...TRANSACTIONS, ...TRANSACTIONS].map((item, idx) => (
            <div key={idx} className="bg-[#121212] rounded-[2rem] p-5 border border-white/[0.03] shadow-xl relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${item.user}`} alt="" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-bold">{item.user}</span>
                      <span className="bg-yellow-400/10 text-yellow-400 text-[8px] px-1.5 py-0.5 rounded font-black border border-yellow-400/20">
                        {item.rankIcon || "👑"} {item.rank}
                      </span>
                    </div>
                    <span className="text-gray-500 text-[10px]">{item.time}</span>
                  </div>
                </div>
                <div className="text-gray-600 text-lg">•••</div>
              </div>
              
              <p className="text-white/90 text-[13px] mb-3 leading-relaxed tracking-tight">{item.action}</p>
              
              <div className={`text-3xl font-black mb-4 flex items-baseline gap-1 ${item.color}`}>
                {item.amount} <span className="text-xs text-gray-600 font-bold uppercase">Ron</span>
              </div>

              {/* REACTIONS & STING BUTTON */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  {item.reactions.map((r, i) => (
                    <div key={i} className="bg-white/5 px-2.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/5">
                      <span className="text-xs">{r.e}</span>
                      <span className="text-[10px] font-bold text-gray-400">{r.c}</span>
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 text-xs border border-white/5">+</div>
                </div>
                {item.hasSting && (
                  <button className="bg-[#F7E01C] text-black text-[10px] font-black px-4 py-2 rounded-full shadow-lg shadow-yellow-400/10 uppercase italic">
                    Sting 🐝
                  </button>
                )}
              </div>

              {/* COMMENTS */}
              {item.comments.length > 0 && (
                <div className="border-t border-white/5 pt-4 space-y-3">
                   <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                     <span>🗨️</span> {item.comments.length} comentarii
                   </div>
                  {item.comments.map((c, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-zinc-700 flex-shrink-0 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${c.user}`} alt="" />
                      </div>
                      <p className="text-gray-300 text-[11px] leading-tight">
                        <span className="text-white font-bold block mb-0.5">{c.user}</span>
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* TAB BAR (FIXED BOTTOM) */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-black/90 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-6 pb-4 z-50">
        <div className="flex flex-col items-center gap-1">
          <div className="text-[#F7E01C] text-xl">🏠</div>
          <span className="text-[8px] text-[#F7E01C] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="text-white text-xl">👥</div>
          <span className="text-[8px] text-white">My Hive</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="text-white text-xl">📥</div>
          <span className="text-[8px] text-white">Inbox</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="text-white text-xl">👤</div>
          <span className="text-[8px] text-white">My Profile</span>
        </div>
      </div>
    </div>
  );
};

export default HeroAppMockup;