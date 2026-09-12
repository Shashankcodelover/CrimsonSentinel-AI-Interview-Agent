# Benchmark Candidate Profiles

This directory contains standardized benchmark profiles used to calibrate Crimson Sentinel's scoring thresholds across distinct engineering tiers:

### Profile 1: Staff Distributed Systems Architect (Target: L6 / 85+ Score)
- **Background**: 9 years experience, lead architect on multi-region Kafka/Flink infrastructure.
- **Expected Signals**: Deep Raft consensus mechanics, LSM vs B-tree disk write amplification, strict linearization vs causal consistency, failure domains, blast radius containment.

### Profile 2: Senior Backend / Platform Engineer (Target: L5 / 72-84 Score)
- **Background**: 5 years experience, Kubernetes/Go/PostgreSQL microservices.
- **Expected Signals**: Connection pooling, Redis cache stamps, database indexing (B-Tree, GIN), HTTP/gRPC multiplexing, circuit breakers.

### Profile 3: Mid-Level Backend Developer (Target: L4 / 50-70 Score)
- **Background**: 2 years experience, standard REST APIs and ORMs.
- **Expected Signals**: Basic load balancing, relational transactions, unit testing, Docker containers. Struggles with distributed consensus and split-brain scenarios.
