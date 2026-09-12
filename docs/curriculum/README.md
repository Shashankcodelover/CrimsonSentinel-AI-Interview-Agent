# Technical Interview Curriculum & Question Bank

### Module A: High-Throughput Stream Processing
- Partitioning strategies, consumer rebalancing storms, backpressure propagation (TCP flow control vs reactive streams).
- At-least-once vs Exactly-once semantics via 2-phase commit or idempotent deduplication keys.

### Module B: High-Availability Storage & Consensus
- Paxos, Raft, Multi-Paxos leader election and log compaction.
- Distributed transactions: Two-Phase Locking (2PL), Two-Phase Commit (2PC), Saga patterns, Percolator transaction model.

### Module C: Resilient Edge Networking & Caching
- Anycast routing, CDN edge caches, Consistent Hashing (Ketama with virtual nodes).
- Rate-limiting algorithms: Token Bucket, Leaky Bucket, Sliding Window Counter, GCRA (Generic Cell Rate Algorithm).

### Module D: Production Diagnostics & Observability
- Distributed tracing (OpenTelemetry, trace context propagation W3C).
- High-percentile latency anomalies (coordinated omission, GC pauses, kernel context switching).
