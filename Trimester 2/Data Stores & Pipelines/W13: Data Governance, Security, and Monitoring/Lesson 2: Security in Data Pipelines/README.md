# Migration in progress
# Lesson 2: Security in Data Pipelines
Security in Data Pipelines:

Data pipelines transport, transform, and persist vast quantities of confidential business records, operational transactions, and customer personal details. Because pipelines bridge external APIs, message brokers, distributed compute engines, and cloud warehouses, they present a wide attack surface for malicious actors, data breaches, and unauthorized internal access. Implementing comprehensive data pipeline security requires combining strong identity authentication, fine-grained authorization, end-to-end cryptographic protection, and secure network infrastructure.

Authentication and Machine Identity Management:

- Human versus machine authentication: While human analysts authenticate using Single Sign-On and multi-factor authentication, automated pipelines rely on machine identities such as service accounts, managed identities, and short-lived authorization tokens.
- Federated credentials: Modern cloud architectures use OpenID Connect federation to permit external CI/CD runners and container orchestrators to assume temporary cloud roles without storing long-lived access keys.
- Mutual transport layer security: Distributed clusters and messaging backbones like Apache Kafka utilize mutual TLS, where both client and server present digital certificates to prove their identity before establishing an encrypted TCP connection.
- Elimination of static credentials: Hardcoding API keys or database passwords in configuration files or code repositories creates severe security vulnerabilities; automated pipelines must retrieve credentials dynamically from dedicated vault services.

Access Control and Authorization Models:

- Role-based access control: Organizes permissions by functional roles, assigning users and automated services the specific privileges required for their daily operational tasks.
- Attribute-based access control: Evaluates context attributes dynamically at query time, including user department, time of day, network origin, and metadata classification tags attached to specific data columns.
- Column-level security: Restricts visibility of sensitive table columns, ensuring that non-privileged users receive access errors or null placeholders when querying restricted fields such as customer salaries or account balances.
- Row-level security: Applies conditional filter predicates to queries automatically, ensuring that users can only see records relevant to their specific business domain or geographic region.
- Principle of least privilege: Automated extraction tasks, staging loaders, and transformation engines must be granted the absolute minimum read and write permissions necessary to complete their specific pipeline step.

Cryptographic Safeguards: Encryption and Masking:

- Encryption in transit: All data flowing across network boundaries, between microservi