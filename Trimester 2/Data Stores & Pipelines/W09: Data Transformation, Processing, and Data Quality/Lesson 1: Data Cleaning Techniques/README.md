# Migration in progress
# Lesson 1: Data Cleaning Techniques

Data Cleaning Techniques:

Data cleaning is the foundational step in the transformation phase of any data pipeline. Raw records extracted from transactional applications, mobile events, and third-party systems frequently contain missing attributes, duplicate records, formatting inconsistencies, and statistical anomalies. Systematic cleaning techniques resolve these defects, ensuring that downstream aggregation, reporting, and predictive modeling operate on sound baseline data.

Handling Missing Data:

- Identification: Detecting missing attributes requires checking for standard null pointers, NaN representations in numeric arrays, empty string literals, and domain-specific sentinels such as negative 999 or unknown.
- Dropping incomplete records: Removing entire rows that lack essential primary identifiers is simple, but it reduces the overall sample size and can introduce structural selection bias if data is not missing completely at random.
- Dropping sparsely populated columns: Dropping entire columns is appropriate when missingness exceeds a high threshold, such as sixty or seventy percent, and the attribute provides negligible predictive value.
- Constant value imputation: Replacing nulls with neutral values, such as zero for numeric quantities or unknown for categorical attributes, retains all rows while preventing runtime type errors.
- Statistical imputation: Filling missing numerical values with the column mean or median preserves overall distributions, though mean imputation can artificially reduce variance.
- Temporal imputation: Using forward-fill or backward-fill techniques propagates the last known valid observation forward in time-series data, which is suitable for sensor readings and financial market feeds.
- Important: The choice of imputation strategy alters downstream statistical distributions, meaning data engineers must align imputation rules with business domain definitions.

Deduplication Strategies:

- Exact duplicate removal: Identifies and discards rows where every attribute matches an existing row across the entire schema.
- Key-based deduplication: Groups records by a unique business identifier or composite key and retains only one entry based on deterministic rules.
- Timestamp ordering: Using window functions to partition records by business key and order by update timestamp allows pipelines to keep the most recent version of a record while dropping older duplicates.
- Fuzzy matching: Resolves near-duplicate textual records caused by typos or phonetic similarities using distance algorithms such as Levenshtein distance or Jaro-Winkler string metrics.

Data Standardization and Formatting:

- String normalization: Strips le