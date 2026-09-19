"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PolygraphAnalyzer({ onClose }: { onClose: () => void }) {
  const [analyzing, setAnalyzing] = useState(true);
  const [metrics, setMetrics] = useState({ deception: 0, confidence: 0, cognitiveLoad: 0 });

  useEffect(() => {
    if (analyzing) {
      const interval = setInterval(() => {
        setMetrics({
          deception: Math.random() * 20 + 5,
          confidence: Math.random() * 40 + 50,
          cognitiveLoad: Math.random() * 50 + 40,
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [analyzing]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl rounded-2xl border border-red-900/50 bg-[#0d0e0f] p-8 shadow-2xl shadow-red-900/20"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-red-500/50 hover:text-red-400"
          >
            Close (Esc)
          </button>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter text-red-500">
                AI Polygraph & Micro-expression Analyzer
              </h2>
              <p className="text-sm text-red-500/60">
                Real-time vocal stress & semantic coherence tracking
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
              <div className="h-4 w-4 animate-ping rounded-full bg-red-500" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl border border-red-900/30 bg-black/50 p-6">
              <div className="text-xs font-bold uppercase text-red-500/60">Deception Index</div>
              <div className="mt-2 text-4xl font-black text-red-500">
                {metrics.deception.toFixed(1)}<span className="text-xl opacity-50">%</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-red-900/20">
                <motion.div
                  className="h-full bg-red-500"
                  animate={{ width: `${metrics.deception}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-red-900/30 bg-black/50 p-6">
              <div className="text-xs font-bold uppercase text-red-500/60">Cognitive Load</div>
              <div className="mt-2 text-4xl font-black text-red-400">
                {metrics.cognitiveLoad.toFixed(1)}<span className="text-xl opacity-50">%</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-red-900/20">
                <motion.div
                  className="h-full bg-red-400"
                  animate={{ width: `${metrics.cognitiveLoad}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-emerald-900/30 bg-black/50 p-6">
              <div className="text-xs font-bold uppercase text-emerald-500/60">Truth Confidence</div>
              <div className="mt-2 text-4xl font-black text-emerald-500">
                {metrics.confidence.toFixed(1)}<span className="text-xl opacity-50">%</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-emerald-900/20">
                <motion.div
                  className="h-full bg-emerald-500"
                  animate={{ width: `${metrics.confidence}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-red-900/30 bg-black/50 p-6">
             <div className="text-xs font-bold uppercase text-red-500/60 mb-4">Semantic Resonance Graph</div>
             <div className="h-32 w-full flex items-end space-x-1 opacity-70">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-full bg-red-500 rounded-t-sm"
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: Math.random() * 1 + 0.5,
                    }}
                  />
                ))}
             </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
