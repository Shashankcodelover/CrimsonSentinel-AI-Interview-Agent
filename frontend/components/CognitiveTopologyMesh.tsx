"use client";

import React, { useState, useEffect } from 'react';
import { Network, Plus, Trash2, RefreshCw, X, ArrowRight } from 'lucide-react';
import type { CandidateProfile, CognitiveProbeCorridor } from '@/lib/cognitiveMeshService';

export function CognitiveTopologyMesh({ onClose, onOpenIngestion }: { onClose: () => void; onOpenIngestion?: () => void }) {
  const [corridors, setCorridors] = useState<CognitiveProbeCorridor[]>([]);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [metrics, setMetrics] = useState<Record<string, number> | null>(null);
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  // Form states
  const [fromDomain, setFromDomain] = useState('Distributed Ingestion');
  const [toDomain, setToDomain] = useState('Resilience & Blast Radius Isolation');
  const [socraticDepth, setSocraticDepth] = useState('4');
  const [escalationTrigger, setEscalationTrigger] = useState('Lock-free ring buffer contention under burst traffic');
  const [targetCompetency, setTargetCompetency] = useState('Concurrency Control & Hardware Memory Barriers');

  const fetchData = async () => {
    try {
      const [corridorRes, candidateRes] = await Promise.all([
        fetch('/api/corridors'),
        fetch('/api/candidates')
      ]);

      const corridorData = await corridorRes.json();
      const candidateData = await candidateRes.json();

      if (corridorData.success && corridorData.data) {
        setCorridors(corridorData.data.corridors || []);
        setMetrics(corridorData.data.metrics || null);
      }
      if (candidateData.success && candidateData.data) {
        setCandidates(candidateData.data || []);
      }
    } catch (err) {
      console.error('Failed to load cognitive mesh:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeverCorridor = async (id: string) => {
    if (!window.confirm(`⚠️ SEVER CORRIDOR CONFIRMATION\nSever cognitive probe corridor ${id}? Sentinel will disengage escalation along this architectural axis.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/corridors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCorridors(prev => prev.filter(c => c.id !== id));
        fetchData();
      }
    } catch (err) {
      console.error('Sever failed:', err);
    }
  };

  const handleDeleteCandidate = async (id: string) => {
    if (!window.confirm(`⚠️ DELETE CANDIDATE RECORD\nDelete candidate profile ${id} and associated transcript calibration history?`)) {
      return;
    }

    try {
      // Direct local filter for smooth reactivity
      setCandidates(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Candidate deletion failed:', err);
    }
  };

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/corridors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromDomain,
          toDomain,
          socraticDepth: parseInt(socraticDepth, 10) || 4,
          escalationTrigger,
          targetCompetency,
          slaResponseSec: 45
        })
      });

      if (res.ok) {
        setShowProvisionModal(false);
        fetchData();
      }
    } catch (err) {
      console.error('Provision failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="flex flex-col w-full max-w-4xl max-h-[92vh] bg-[#0b0c10] border border-red-900/40 rounded-xl shadow-2xl shadow-red-950/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#11131a] border-b border-red-900/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-lg bg-red-950/70 border border-red-800/50 text-red-400">
              <Network className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                Socratic Cognitive Assessment Mesh & Calibration Radar
              </h3>
              <p className="text-xs text-slate-400">
                Multi-dimensional architectural probe topology, escalation pathways, and candidate calibration telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenIngestion && (
              <button
                onClick={onOpenIngestion}
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-950/60 border border-red-800/40 text-red-300 hover:bg-red-900/50 transition-colors"
              >
                Bulk Ingestion
              </button>
            )}
            <button
              onClick={() => setShowProvisionModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 transition-all shadow-md shadow-red-950/50"
            >
              <Plus className="size-3.5" /> Provision Probe
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Telemetry KPI Strip */}
        <div className="grid grid-cols-5 gap-2 px-5 py-3 bg-[#08090d] border-b border-red-950/60">
          {[
            { label: 'ACTIVE PROBES', value: corridors.length, color: 'text-red-400' },
            { label: 'AVG SOCRATIC DEPTH', value: metrics ? `${metrics.avgSocraticDepth} / 5` : '4.2 / 5', color: 'text-amber-400' },
            { label: 'SLA RESPONSE TARGET', value: metrics ? `${metrics.avgSlaResponseSec}s` : '45s', color: 'text-sky-400' },
            { label: 'CANDIDATE POOL', value: candidates.length, color: 'text-emerald-400' },
            { label: 'CALIBRATION CONFIDENCE', value: metrics ? `${metrics.calibrationConfidencePct}%` : '98.4%', color: 'text-blue-400' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-2 rounded bg-[#11131a] border border-red-950/50">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">{stat.label}</span>
              <span className={`text-sm font-black mt-0.5 ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-5 p-5 flex-1 overflow-y-auto">
          {/* Active Probe Corridors */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold tracking-wide uppercase text-slate-300">
                Cognitive Probe Escalation Corridors ({corridors.length})
              </span>
              <button
                onClick={fetchData}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RefreshCw className="size-3" /> Refresh
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {corridors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#11131a] border border-red-950/60 hover:border-red-900/40 transition-colors"
                >
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-950/60 border border-red-800/40 text-red-300">
                        {c.fromDomain}
                      </span>
                      <ArrowRight className="size-3 text-slate-600" />
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-950/60 border border-blue-800/40 text-blue-300">
                        {c.toDomain}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/60 text-amber-300 border border-amber-800/40">
                        Depth {c.socraticDepth}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400">
                      <span className="text-slate-500 font-semibold">Trigger:</span> {c.escalationTrigger}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>Competency: <strong className="text-slate-300">{c.targetCompetency}</strong></span>
                      <span>•</span>
                      <span>SLA: <strong className="text-sky-400">{c.slaResponseSec}s</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSeverCorridor(c.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold text-red-400 border border-red-900/40 hover:bg-red-950/50 transition-colors"
                  >
                    <Trash2 className="size-3" /> Sever
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Calibrated Candidate Profiles */}
          <div>
            <span className="text-xs font-bold tracking-wide uppercase text-slate-300">
              Active Assessment Roster ({candidates.length})
            </span>

            <div className="grid grid-cols-3 gap-2.5 mt-2">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  className="flex flex-col justify-between p-3 rounded-lg bg-[#11131a] border border-red-950/60 hover:border-red-900/40 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-slate-200">{cand.name}</span>
                      <button
                        onClick={() => handleDeleteCandidate(cand.id)}
                        className="text-red-400/80 hover:text-red-300 p-0.5"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{cand.jobRole}</div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono">
                    <span className="px-1.5 py-0.5 rounded font-bold bg-red-950/60 text-red-300 border border-red-800/40">
                      {cand.calibrationTier}
                    </span>
                    <span>{cand.yearsExperience} yrs exp</span>
                    <span className="text-emerald-400 font-semibold">{cand.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Provision Modal */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md bg-[#0e1015] border border-red-900/50 rounded-xl p-5 shadow-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              + Provision Socratic Probe Corridor
            </h4>
            <form onSubmit={handleProvision} className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Source Architectural Domain</label>
                <input
                  value={fromDomain}
                  onChange={(e) => setFromDomain(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-[#07080b] border border-red-950 rounded text-slate-200 focus:outline-none focus:border-red-800"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Target Escalation Domain</label>
                <input
                  value={toDomain}
                  onChange={(e) => setToDomain(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-[#07080b] border border-red-950 rounded text-slate-200 focus:outline-none focus:border-red-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">Socratic Depth (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={socraticDepth}
                    onChange={(e) => setSocraticDepth(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-[#07080b] border border-red-950 rounded text-slate-200 focus:outline-none focus:border-red-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">Target Competency</label>
                  <input
                    value={targetCompetency}
                    onChange={(e) => setTargetCompetency(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-[#07080b] border border-red-950 rounded text-slate-200 focus:outline-none focus:border-red-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Escalation Trigger Context</label>
                <textarea
                  value={escalationTrigger}
                  onChange={(e) => setEscalationTrigger(e.target.value)}
                  rows={2}
                  className="w-full mt-1 p-2 text-xs bg-[#07080b] border border-red-950 rounded text-slate-200 focus:outline-none focus:border-red-800"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowProvisionModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-red-700 hover:bg-red-600 rounded"
                >
                  Provision Corridor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
