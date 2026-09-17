import { describe, it, expect, beforeEach } from 'vitest';
import { cognitiveMeshService } from './cognitiveMeshService';

describe('Crimson Sentinel: Enterprise Cognitive Probe Mesh & Bulk Ingestion Suite', () => {
  beforeEach(() => {
    // Reset to ensure clean state
    cognitiveMeshService.deleteAllCandidates();
    cognitiveMeshService.deleteAllCorridors();
    cognitiveMeshService.deleteAllRubrics();

    cognitiveMeshService.createCandidate({
      id: 'cand-001',
      name: 'Elena Rostova',
      jobRole: 'Principal Systems Architect',
      yearsExperience: 14,
      education: 'M.S. Computer Science, CMU',
      calibrationTier: 'L7_PRINCIPAL',
      primaryDomain: 'Distributed Consensus',
      status: 'CALIBRATED'
    });

    cognitiveMeshService.provisionCorridor({
      id: 'probe-01',
      fromDomain: 'Distributed Ingestion',
      toDomain: 'Storage Internals (WAL/LSM)',
      socraticDepth: 4,
      escalationTrigger: 'Kafka partition rebalance backpressure',
      targetCompetency: 'Hardware I/O',
      slaResponseSec: 45
    });
  });

  describe('Candidate Lifecycle & Universal Purge', () => {
    it('retrieves candidate profiles', () => {
      const candidates = cognitiveMeshService.getAllCandidates();
      expect(candidates.length).toBe(1);
      expect(candidates[0].name).toBe('Elena Rostova');
      expect(candidates[0].calibrationTier).toBe('L7_PRINCIPAL');
    });

    it('creates new candidate with calibration tier', () => {
      const cand = cognitiveMeshService.createCandidate({
        name: 'David K.',
        jobRole: 'Staff Infrastructure Engineer',
        yearsExperience: 10,
        calibrationTier: 'L6_STAFF'
      });
      expect(cand.id).toBeDefined();
      expect(cand.name).toBe('David K.');
      expect(cognitiveMeshService.getAllCandidates().length).toBe(2);
    });

    it('executes universal purge of candidate records', () => {
      const deleted = cognitiveMeshService.deleteAllCandidates();
      expect(deleted).toBe(1);
      expect(cognitiveMeshService.getAllCandidates().length).toBe(0);
    });
  });

  describe('Cognitive Probe Corridors & Severing Controls', () => {
    it('calculates live telemetry metrics', () => {
      const metrics = cognitiveMeshService.getMetrics();
      expect(metrics.totalCorridors).toBe(1);
      expect(metrics.activeCorridors).toBe(1);
      expect(metrics.avgSocraticDepth).toBe(4);
      expect(metrics.candidateCount).toBe(1);
      expect(metrics.calibrationConfidencePct).toBeGreaterThan(95);
    });

    it('provisions new Socratic probe corridor', () => {
      const corridor = cognitiveMeshService.provisionCorridor({
        fromDomain: 'High-Concurrency & Contention Control',
        toDomain: 'Resilience & Blast Radius Isolation',
        socraticDepth: 5,
        escalationTrigger: 'Thread pool starvation',
        targetCompetency: 'Lock-Free Ring Buffers'
      });
      expect(corridor.id).toBeDefined();
      expect(corridor.socraticDepth).toBe(5);
      expect(cognitiveMeshService.getAllCorridors().length).toBe(2);
    });

    it('severs a cognitive probe corridor', () => {
      const ok = cognitiveMeshService.severCorridor('probe-01');
      expect(ok).toBe(true);
      expect(cognitiveMeshService.getAllCorridors().length).toBe(0);
    });

    it('executes universal purge of probe corridors', () => {
      const count = cognitiveMeshService.deleteAllCorridors();
      expect(count).toBe(1);
      expect(cognitiveMeshService.getAllCorridors().length).toBe(0);
    });
  });

  describe('Batch Ingestion (CSV & JSON)', () => {
    it('parses candidate CSV and bulk ingests profiles', () => {
      const csv = `id,name,role,experience,education,tier,domain
c-101,Maya Lin,Senior Staff Engineer,12,Stanford MS,L6_STAFF,Consensus & Raft
c-102,Zack Chen,Staff SRE,9,Berkeley BS,L5_SENIOR,Chaos Engineering`;

      const parsed = cognitiveMeshService.parseCandidateCSV(csv);
      expect(parsed.length).toBe(2);
      expect(parsed[0].name).toBe('Maya Lin');
      expect(parsed[0].yearsExperience).toBe(12);

      const created = cognitiveMeshService.bulkCreateCandidates(parsed);
      expect(created.length).toBe(2);
      expect(cognitiveMeshService.getAllCandidates().length).toBe(3);
    });

    it('parses probe corridor CSV and bulk provisions corridors', () => {
      const csv = `from,to,depth,trigger,competency,sla
Edge PoP,Auth Vault,4,JWT replay attack,Cryptographic Verification,30
API Mesh,Rate Limiter,5,DDoS volumetric surge,Token Bucket Leaks,25`;

      const parsed = cognitiveMeshService.parseCorridorCSV(csv);
      expect(parsed.length).toBe(2);
      expect(parsed[0].fromDomain).toBe('Edge PoP');
      expect(parsed[0].socraticDepth).toBe(4);

      const created = cognitiveMeshService.bulkCreateCorridors(parsed);
      expect(created.length).toBe(2);
      expect(cognitiveMeshService.getAllCorridors().length).toBe(3);
    });
  });
});
