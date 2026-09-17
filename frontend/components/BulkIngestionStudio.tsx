"use client";

import React, { useState } from 'react';
import { Upload, Users, Network, Trash2, CheckCircle2, AlertTriangle, RefreshCw, FileText, Code2, X } from 'lucide-react';

const TEMPLATES = {
  candidates: {
    endpoint: '/api/candidates/upload',
    csv: `name,role,experience,education,tier,domain
Dr. Aris Thorne,Principal Architect,15,Ph.D. Distributed Systems MIT,L7_PRINCIPAL,Consensus & Raft
Kiran Shah,Senior Staff Reliability Engineer,11,M.S. Software Engineering CMU,L6_STAFF,Chaos & Contention
Liam Gallagher,Staff Distributed Systems Engineer,9,B.S. Computer Science UC Berkeley,L5_SENIOR,Storage Engines WAL`,
    json: JSON.stringify([
      {
        name: "Dr. Aris Thorne",
        jobRole: "Principal Architect",
        yearsExperience: 15,
        education: "Ph.D. Distributed Systems MIT",
        calibrationTier: "L7_PRINCIPAL",
        primaryDomain: "Consensus & Raft"
      },
      {
        name: "Kiran Shah",
        jobRole: "Senior Staff Reliability Engineer",
        yearsExperience: 11,
        education: "M.S. Software Engineering CMU",
        calibrationTier: "L6_STAFF",
        primaryDomain: "Chaos & Contention"
      }
    ], null, 2)
  },
  corridors: {
    endpoint: '/api/corridors/upload',
    csv: `from,to,depth,trigger,competency,sla
Distributed Ingestion,Storage Internals (WAL/LSM),4,Kafka consumer lag backpressure,Sequential Disk I/O,45
Storage Internals (WAL/LSM),Consensus & Replication (Raft),5,Asymmetric network split-brain,Quorum Consensus,60
Edge Networking,High-Concurrency Limits,4,Multi-region token bucket sync,Lock-Free CAS,35`,
    json: JSON.stringify([
      {
        fromDomain: "Distributed Ingestion",
        toDomain: "Storage Internals (WAL/LSM)",
        socraticDepth: 4,
        escalationTrigger: "Kafka consumer lag backpressure",
        targetCompetency: "Sequential Disk I/O",
        slaResponseSec: 45
      }
    ], null, 2)
  }
};

export function BulkIngestionStudio({ onClose, onRefresh }: { onClose: () => void; onRefresh?: () => void }) {
  const [entity, setEntity] = useState<'candidates' | 'corridors'>('candidates');
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [payload, setPayload] = useState(TEMPLATES.candidates.csv);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleEntityChange = (newEntity: 'candidates' | 'corridors') => {
    setEntity(newEntity);
    setPayload(format === 'csv' ? TEMPLATES[newEntity].csv : TEMPLATES[newEntity].json);
    setStatusMsg(null);
  };

  const handleFormatChange = (newFormat: 'csv' | 'json') => {
    setFormat(newFormat);
    setPayload(newFormat === 'csv' ? TEMPLATES[entity].csv : TEMPLATES[entity].json);
    setStatusMsg(null);
  };

  const handleUpload = async () => {
    if (!payload.trim()) {
      setStatusMsg({ type: 'error', text: 'Payload buffer cannot be empty.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    try {
      const endpoint = TEMPLATES[entity].endpoint;
      const isCsv = format === 'csv';

      let bodyData: BodyInit | null = payload;
      const headers: Record<string, string> = {};

      if (isCsv) {
        headers['Content-Type'] = 'text/csv';
      } else {
        headers['Content-Type'] = 'application/json';
        try {
          bodyData = JSON.stringify(JSON.parse(payload));
        } catch (e: unknown) {
          const errMessage = e instanceof Error ? e.message : String(e);
          throw new Error(`Invalid JSON format: ${errMessage}`);
        }
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: bodyData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Upload failed with HTTP ${res.status}`);
      }

      setStatusMsg({
        type: 'success',
        text: data.message || `Successfully ingested records into assessment pipeline!`
      });
      if (onRefresh) onRefresh();
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      setStatusMsg({ type: 'error', text: errMessage });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUniversalPurge = async () => {
    const labels = {
      candidates: 'All Candidate Profiles & Evaluation History',
      corridors: 'All Socratic Cognitive Probe Corridors'
    };

    if (!window.confirm(`⚠️ UNIVERSAL PURGE WARNING\nAre you sure you want to delete ${labels[entity]}?\nThis action cannot be undone.`)) {
      return;
    }

    try {
      const purgeEndpoints = {
        candidates: '/api/candidates',
        corridors: '/api/corridors'
      };

      const res = await fetch(purgeEndpoints[entity], {
        method: 'DELETE'
      });
      const data = await res.json();

      setStatusMsg({
        type: 'success',
        text: data.message || 'Universal deletion executed successfully.'
      });
      if (onRefresh) onRefresh();
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      setStatusMsg({ type: 'error', text: errMessage });
    }
  };

  const lineCount = payload.split('\n').length;
  const charCount = payload.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="flex flex-col w-full max-w-3xl max-h-[90vh] bg-[#0c0d12] border border-red-900/40 rounded-xl shadow-2xl shadow-red-950/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#12131a] border-b border-red-900/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400">
              <Upload className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                Enterprise Batch Ingestion & Calibration Studio
              </h3>
              <p className="text-xs text-slate-400">
                Bulk ETL pipeline for Senior/Staff Candidates & Socratic Probe Corridors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleUniversalPurge}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-red-950/80 border border-red-800/50 text-red-300 hover:bg-red-900/50 transition-colors"
            >
              <Trash2 className="size-3.5" /> Universal Purge
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-4 p-5 flex-1 overflow-y-auto">
          {/* Entity Selector */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'candidates' as const, label: 'Candidate Profiles', icon: <Users className="size-4" />, desc: 'L5 to L7+ engineers and evaluation tiers' },
              { id: 'corridors' as const, label: 'Socratic Probe Corridors', icon: <Network className="size-4" />, desc: 'Cognitive domain links & escalation paths' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleEntityChange(tab.id)}
                className={`flex flex-col p-3 rounded-lg border text-left transition-all ${
                  entity === tab.id
                    ? 'border-red-600 bg-red-950/30 text-red-200'
                    : 'border-slate-800 bg-[#12131a] text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  {tab.icon} {tab.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{tab.desc}</div>
              </button>
            ))}
          </div>

          {/* Format & Template Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => handleFormatChange('csv')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold border transition-all ${
                  format === 'csv'
                    ? 'border-red-500 bg-red-950/50 text-red-300'
                    : 'border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <FileText className="size-3.5" /> RFC 4180 CSV
              </button>
              <button
                onClick={() => handleFormatChange('json')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold border transition-all ${
                  format === 'json'
                    ? 'border-red-500 bg-red-950/50 text-red-300'
                    : 'border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <Code2 className="size-3.5" /> JSON Schema
              </button>
            </div>

            <button
              onClick={() => setPayload(format === 'csv' ? TEMPLATES[entity].csv : TEMPLATES[entity].json)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RefreshCw className="size-3.5" /> Reset Template
            </button>
          </div>

          {/* Monospace Code Buffer */}
          <div className="flex flex-col flex-1 min-h-[220px]">
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full min-h-[200px] p-3 font-mono text-xs text-red-200 bg-[#07080b] border border-red-950 rounded-lg resize-y focus:outline-none focus:border-red-800/80"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-mono">
              <span>{lineCount} lines | {charCount} chars</span>
              <span>Target: {TEMPLATES[entity].endpoint}</span>
            </div>
          </div>

          {/* Status Alert */}
          {statusMsg && (
            <div className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium border ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                : 'bg-red-950/40 border-red-800/50 text-red-300'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="size-4" /> : <AlertTriangle className="size-4" />}
              {statusMsg.text}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3.5 bg-[#12131a] border-t border-red-900/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 disabled:opacity-50 transition-all shadow-lg shadow-red-950/50"
          >
            <Upload className="size-3.5" />
            {isUploading ? 'Calibrating...' : `Ingest Batch (${format.toUpperCase()})`}
          </button>
        </div>
      </div>
    </div>
  );
}
