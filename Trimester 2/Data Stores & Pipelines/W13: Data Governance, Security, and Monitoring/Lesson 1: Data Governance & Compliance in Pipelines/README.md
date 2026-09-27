# Migration in progress
# Lesson 1: Data Governance & Compliance in Pipelines

Data Governance and Compliance in Pipelines:

Data governance and regulatory compliance must be integrated directly into the engineering workflows of modern data pipelines. In the past, governance was treated as an afterthought or handled manually through policy documents. Today, global privacy legislation, cybersecurity mandates, and industry regulations require data teams to embed automated data classification, compliance enforcement, lineage tracking, and data retention rules directly into extraction, transformation, and loading code.

Major Regulatory Compliance Frameworks:

- General Data Protection Regulation: An extensive European Union privacy law that mandates clear user consent, grants individuals the right to access their personal data, and enforces the right to erasure, commonly called the right to be forgotten.
- California Consumer Privacy Act: A regulatory framework granting California consumers the right to know what personal information businesses collect, the right to request deletion of that data, and the right to opt out of the sale or sharing of their personal information.
- Health Insurance Portability and Accountability Act: A United States regulation mandating strict technical, physical, and administrative safeguards to protect electronic protected health information across storage and transmission paths.
- Payment Card Industry Data Security Standard: A global security standard governing the handling of credit and debit card information, prohibiting the storage of sensitive authentication data like card verification values after transaction authorization.

Automated Data Classification and Tagging:

- Ingestion-time classification: Automated scanners analyze incoming table columns and payload attributes, applying metadata tags such as personally identifiable information, protected health information, or confidential financial records.
- Pattern matching and heuristics: Regular expressions and natural language processing models identify sensitive attributes such as Social Security numbers, email addresses, passport numbers, and bank account numbers during pipeline execution.
- Policy-driven routing: Ingestion pipelines inspect classification tags to route sensitive records to restricted, encrypted storage zones while directing non-sensitive data to general analytics tiers.

Implementing Compliance Operations in Pipelines:

- Consent propagation: Ingestion pipelines capture user consent preferences from source applications and carry consent flags alongside transactional data, filtering out users who have revoked analytical consent.
- Right to be forgotten implementation: Fulfilling deletion requests requires building automated erasure pipelines that locate and remove specific user identifiers across production databases, object stores, and historical data lake tables.
- Mutation