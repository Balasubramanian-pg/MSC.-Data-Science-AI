# Migration in progress
# Lesson 4: Use Case - Securing PII in Fintech

Use Case: Securing PII in Fintech Pipelines:

Financial technology organizations handle highly sensitive transactional records, customer account credentials, and personally identifiable information. Fintech platforms must analyze vast volumes of transaction data to detect payment fraud, assess creditworthiness, and personalize customer experiences, while simultaneously complying with strict financial regulations including PCI-DSS, GLBA, GDPR, and SOC 2. This case study examines how an enterprise fintech company secures personally identifiable information across its ingestion, transformation, storage, and analytics pipelines.

Regulatory Requirements and Business Challenge:

- Strict regulatory standards: Regulators require strict protection of sensitive personal data such as government identity numbers, payment card numbers, bank account numbers, physical addresses, and contact records.
- Analytics access requirements: Data science teams, fraud prevention algorithms, and business analysts need continuous access to transaction patterns without being exposed to plaintext personal identities.
- The re-identification threat: Simply removing customer names is insufficient, because combining indirect identifiers such as postal codes, birth dates, and purchase timestamps can allow malicious actors to re-identify individuals.
- The engineering objective: Build a secure data pipeline that strips or encrypts personal identifiers at the ingestion perimeter, restricts query visibility using dynamic masking, and supports instantaneous regulatory data deletion.

Perimeter Ingestion and Tokenization Architecture:

- Transport security: All external mobile requests, payment gateways, and banking APIs transmit data over network connections protected by Transport Layer Security version 1.3.
- Ingestion tokenization service: An isolated microservice inspects incoming event payloads at the network boundary before records enter the general data processing lake.
- The PII Vault: Direct personal identifiers such as customer names, tax identification numbers, and credit card numbers are stripped and written to an isolated, encrypted tokenization vault accessible only by authorized compliance services.
- Surrogate token generation: The vault replaces plaintext identifiers with non-sensitive random surrogate identifiers or format-preserving tokens that mirror the length and data type of the original values.
- Downstream propagation: All downstream streaming topics, staging files, and analytical tables consume and process only the tokenized surrogate keys, ensuring plaintext personal details never land on analytical disks.

Fine-Grained Warehouse Security and Dynamic Masking:

- Column-level security: Analytical data warehouses define explicit permissions on sensitive table columns, restricting access based on user role assignments.
- Dynamic data masking: Applies masking policies dynamically when SQL queries run. A customer support agent querying a table sees masked values