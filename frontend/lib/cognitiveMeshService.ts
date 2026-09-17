/**
 * cognitiveMeshService.ts
 * Crimson Sentinel — Enterprise Cognitive Assessment Mesh, Candidate Roster, and Socratic Probe Corridors
 */

export type CandidateProfile = {
  id: string;
  name: string;
  jobRole: string;
  yearsExperience: number;
  education: string;
  calibrationTier: 'L5_SENIOR' | 'L6_STAFF' | 'L7_PRINCIPAL';
  primaryDomain: string;
  status: 'PENDING' | 'INTERVIEWING' | 'CALIBRATED' | 'REJECTED';
};

export type CognitiveProbeCorridor = {
  id: string;
  fromDomain: string;
  toDomain: string;
  socraticDepth: number; // 1-5
  escalationTrigger: string;
  targetCompetency: string;
  slaResponseSec: number;
  status: 'ACTIVE' | 'SEVERED';
};

export type AssessmentRubric = {
  id: string;
  dimension: string;
  weightPct: number;
  criteria: string;
  level: string;
};

class CognitiveMeshService {
  private candidates: CandidateProfile[] = [
    {
      id: 'cand-001',
      name: 'Elena Rostova',
      jobRole: 'Principal Distributed Systems Architect',
      yearsExperience: 14,
      education: 'M.S. Computer Science, CMU',
      calibrationTier: 'L7_PRINCIPAL',
      primaryDomain: 'Distributed Consensus & Storage Engines',
      status: 'CALIBRATED'
    },
    {
      id: 'cand-002',
      name: 'Marcus Vance',
      jobRole: 'Senior Staff Reliability Engineer',
      yearsExperience: 11,
      education: 'B.S. Software Engineering, MIT',
      calibrationTier: 'L6_STAFF',
      primaryDomain: 'High-Throughput Ingestion & Chaos Resilience',
      status: 'INTERVIEWING'
    },
    {
      id: 'cand-003',
      name: 'Aisha Patel',
      jobRole: 'Senior Backend Infrastructure Engineer',
      yearsExperience: 8,
      education: 'B.Tech Computer Science, IIT Bombay',
      calibrationTier: 'L5_SENIOR',
      primaryDomain: 'Event-Driven Microservices & Caching Topologies',
      status: 'CALIBRATED'
    }
  ];

  private corridors: CognitiveProbeCorridor[] = [
    {
      id: 'probe-ingest-storage',
      fromDomain: 'Distributed Ingestion',
      toDomain: 'Storage Internals (WAL/LSM)',
      socraticDepth: 4,
      escalationTrigger: 'Kafka partition rebalance & write-ahead log flush backpressure',
      targetCompetency: 'Hardware I/O & Sequential Disk Throughput',
      slaResponseSec: 45,
      status: 'ACTIVE'
    },
    {
      id: 'probe-storage-consensus',
      fromDomain: 'Storage Internals (WAL/LSM)',
      toDomain: 'Consensus & Replication (Raft)',
      socraticDepth: 5,
      escalationTrigger: 'Split-brain quorum loss under asymmetric partition',
      targetCompetency: 'Distributed Leader Election & Log Compaction',
      slaResponseSec: 60,
      status: 'ACTIVE'
    },
    {
      id: 'probe-edge-concurrency',
      fromDomain: 'Edge Networking & Rate Limiting',
      toDomain: 'High-Concurrency & Contention Control',
      socraticDepth: 4,
      escalationTrigger: 'Token bucket synchronization across 12 edge PoPs',
      targetCompetency: 'Atomic CAS & Lock-Free Ring Buffers',
      slaResponseSec: 40,
      status: 'ACTIVE'
    },
    {
      id: 'probe-concurrency-resilience',
      fromDomain: 'High-Concurrency & Contention Control',
      toDomain: 'Resilience & Blast Radius Isolation',
      socraticDepth: 5,
      escalationTrigger: 'Cascading thread pool exhaustion during downstream degradation',
      targetCompetency: 'Adaptive Concurrency Limits & Shedding',
      slaResponseSec: 50,
      status: 'ACTIVE'
    },
    {
      id: 'probe-resilience-observability',
      fromDomain: 'Resilience & Blast Radius Isolation',
      toDomain: 'Observability & Incident Diagnostics',
      socraticDepth: 3,
      escalationTrigger: 'Telemetry cardinality explosion during live failover',
      targetCompetency: 'Distributed Tracing & Dynamic Sampling',
      slaResponseSec: 35,
      status: 'ACTIVE'
    }
  ];

  private rubrics: AssessmentRubric[] = [
    { id: 'rub-01', dimension: 'First-Principles Foundation', weightPct: 30, criteria: 'Hardware memory models, I/O efficiency, theoretical complexity', level: 'L6_STAFF' },
    { id: 'rub-02', dimension: 'Scale & System Trade-offs', weightPct: 25, criteria: 'CAP/PACELC trade-offs, cache invalidation, network partitioning', level: 'L6_STAFF' },
    { id: 'rub-03', dimension: 'Operational Resilience', weightPct: 25, criteria: 'Circuit breakers, graceful degradation, chaos engineering instincts', level: 'L6_STAFF' },
    { id: 'rub-04', dimension: 'Communication Precision', weightPct: 20, criteria: 'Architectural clarity, trade-off articulation, collaborative debugging', level: 'L6_STAFF' }
  ];

  // ── CANDIDATES ────────────────────────────────────────────
  getAllCandidates(): CandidateProfile[] {
    return [...this.candidates];
  }

  getCandidateById(id: string): CandidateProfile | undefined {
    return this.candidates.find(c => c.id === id);
  }

  createCandidate(cand: Partial<CandidateProfile>): CandidateProfile {
    const id = cand.id || `cand-${Date.now().toString(36)}`;
    const newCand: CandidateProfile = {
      id,
      name: cand.name || 'Anonymous Candidate',
      jobRole: cand.jobRole || 'Senior Software Engineer',
      yearsExperience: Number(cand.yearsExperience) || 5,
      education: cand.education || 'B.S. Computer Science',
      calibrationTier: cand.calibrationTier || 'L5_SENIOR',
      primaryDomain: cand.primaryDomain || 'Distributed Systems',
      status: cand.status || 'PENDING'
    };
    this.candidates.push(newCand);
    return newCand;
  }

  deleteCandidate(id: string): boolean {
    const idx = this.candidates.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.candidates.splice(idx, 1);
    return true;
  }

  deleteAllCandidates(): number {
    const count = this.candidates.length;
    this.candidates = [];
    return count;
  }

  bulkCreateCandidates(cands: Partial<CandidateProfile>[]): CandidateProfile[] {
    const created: CandidateProfile[] = [];
    for (const c of cands) {
      if (c && (c.name || c.id)) {
        created.push(this.createCandidate(c));
      }
    }
    return created;
  }

  parseCandidateCSV(csv: string): Partial<CandidateProfile>[] {
    const lines = csv.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const idIdx = headers.findIndex(h => h === 'id');
    const nameIdx = headers.findIndex(h => h.includes('name'));
    const roleIdx = headers.findIndex(h => h.includes('role'));
    const expIdx = headers.findIndex(h => h.includes('exp') || h.includes('year'));
    const eduIdx = headers.findIndex(h => h.includes('edu'));
    const tierIdx = headers.findIndex(h => h.includes('tier') || h.includes('calib'));
    const domIdx = headers.findIndex(h => h.includes('domain'));

    const parsed: Partial<CandidateProfile>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 2) continue;

      parsed.push({
        id: idIdx !== -1 ? cols[idIdx] : undefined,
        name: nameIdx !== -1 ? cols[nameIdx] : cols[0],
        jobRole: roleIdx !== -1 ? cols[roleIdx] : 'Senior Software Engineer',
        yearsExperience: expIdx !== -1 ? parseInt(cols[expIdx], 10) || 5 : 5,
        education: eduIdx !== -1 ? cols[eduIdx] : 'B.S. Computer Science',
        calibrationTier: tierIdx !== -1 ? (cols[tierIdx] as CandidateProfile['calibrationTier']) : 'L6_STAFF',
        primaryDomain: domIdx !== -1 ? cols[domIdx] : 'Distributed Systems'
      });
    }
    return parsed;
  }

  // ── CORRIDORS ─────────────────────────────────────────────
  getAllCorridors(): CognitiveProbeCorridor[] {
    return [...this.corridors];
  }

  getMetrics() {
    const total = this.corridors.length;
    const active = this.corridors.filter(c => c.status === 'ACTIVE').length;
    const avgDepth = total > 0 ? this.corridors.reduce((s, c) => s + c.socraticDepth, 0) / total : 0;
    const avgSla = total > 0 ? this.corridors.reduce((s, c) => s + c.slaResponseSec, 0) / total : 0;

    return {
      totalCorridors: total,
      activeCorridors: active,
      avgSocraticDepth: Math.round(avgDepth * 10) / 10,
      avgSlaResponseSec: Math.round(avgSla),
      candidateCount: this.candidates.length,
      rubricDimensionsCount: this.rubrics.length,
      calibrationConfidencePct: 98.4
    };
  }

  provisionCorridor(corridor: Partial<CognitiveProbeCorridor>): CognitiveProbeCorridor {
    const id = corridor.id || `probe-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const newCorridor: CognitiveProbeCorridor = {
      id,
      fromDomain: corridor.fromDomain || 'Distributed Ingestion',
      toDomain: corridor.toDomain || 'Resilience & Blast Radius Isolation',
      socraticDepth: Number(corridor.socraticDepth) || 4,
      escalationTrigger: corridor.escalationTrigger || 'High-contention lock queue saturation',
      targetCompetency: corridor.targetCompetency || 'Distributed Systems Fundamentals',
      slaResponseSec: Number(corridor.slaResponseSec) || 45,
      status: 'ACTIVE'
    };
    this.corridors.push(newCorridor);
    return newCorridor;
  }

  severCorridor(id: string): boolean {
    const idx = this.corridors.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.corridors.splice(idx, 1);
    return true;
  }

  deleteAllCorridors(): number {
    const count = this.corridors.length;
    this.corridors = [];
    return count;
  }

  bulkCreateCorridors(corrs: Partial<CognitiveProbeCorridor>[]): CognitiveProbeCorridor[] {
    const created: CognitiveProbeCorridor[] = [];
    for (const c of corrs) {
      if (c && c.fromDomain && c.toDomain) {
        created.push(this.provisionCorridor(c));
      }
    }
    return created;
  }

  parseCorridorCSV(csv: string): Partial<CognitiveProbeCorridor>[] {
    const lines = csv.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const fromIdx = headers.findIndex(h => h.includes('from'));
    const toIdx = headers.findIndex(h => h.includes('to'));
    const depthIdx = headers.findIndex(h => h.includes('depth'));
    const triggerIdx = headers.findIndex(h => h.includes('trigger'));
    const compIdx = headers.findIndex(h => h.includes('competency'));
    const slaIdx = headers.findIndex(h => h.includes('sla'));

    const parsed: Partial<CognitiveProbeCorridor>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 2) continue;

      parsed.push({
        fromDomain: fromIdx !== -1 ? cols[fromIdx] : cols[0],
        toDomain: toIdx !== -1 ? cols[toIdx] : cols[1],
        socraticDepth: depthIdx !== -1 ? parseInt(cols[depthIdx], 10) || 4 : 4,
        escalationTrigger: triggerIdx !== -1 ? cols[triggerIdx] : 'System design probe',
        targetCompetency: compIdx !== -1 ? cols[compIdx] : 'Architecture Trade-offs',
        slaResponseSec: slaIdx !== -1 ? parseInt(cols[slaIdx], 10) || 45 : 45
      });
    }
    return parsed;
  }

  // ── RUBRICS ───────────────────────────────────────────────
  getAllRubrics(): AssessmentRubric[] {
    return [...this.rubrics];
  }

  deleteAllRubrics(): number {
    const count = this.rubrics.length;
    this.rubrics = [];
    return count;
  }

  bulkCreateRubrics(rubs: Partial<AssessmentRubric>[]): AssessmentRubric[] {
    const created: AssessmentRubric[] = [];
    for (const r of rubs) {
      if (r && r.dimension) {
        const id = r.id || `rub-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
        const newRub: AssessmentRubric = {
          id,
          dimension: r.dimension,
          weightPct: Number(r.weightPct) || 25,
          criteria: r.criteria || 'Default assessment criteria',
          level: r.level || 'L6_STAFF'
        };
        this.rubrics.push(newRub);
        created.push(newRub);
      }
    }
    return created;
  }
}

export const cognitiveMeshService = new CognitiveMeshService();
