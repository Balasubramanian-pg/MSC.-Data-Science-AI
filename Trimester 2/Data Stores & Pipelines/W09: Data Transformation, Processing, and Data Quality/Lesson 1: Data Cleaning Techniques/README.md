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

- String normalization: Strips leading and trailing whitespace, converts diverse letter casing to a uniform lowercase or uppercase standard, and removes hidden non-printable characters.
- Regular expression parsing: Uses pattern matching to extract structured substrings from unparsed text blobs, such as isolating phone numbers, email domains, or postal codes.
- Date and time harmonization: Converts varied calendar representations, such as month-first or day-first strings, into standard ISO 8601 timestamps expressed in coordinated universal time (UTC).
- Categorical mapping: Replaces disparate naming variations, such as country abbreviations, state spellings, or device types, with controlled vocabularies and standardized lookup codes.
- Numeric scaling: Applies min-max normalization or z-score standardization when preparing continuous numeric features for downstream mathematical modeling.

Outlier Detection and Remediation:

- Interquartile range method: Identifies values falling below the first quartile minus 1.5 times the IQR, or above the third quartile plus 1.5 times the IQR, as statistical anomalies.
- Z-score thresholding: Measures how many standard deviations an observation lies away from the population mean, flagging records that fall outside plus or minus three standard deviations.
- Winsorization: Caps extreme outlier values at predefined percentile boundaries, such as the first and ninety-ninth percentiles, reducing extreme skewness without discarding records.
- Outlier flagging: Adds a boolean indicator column to signify an anomalous value, allowing downstream analytics models to filter or include the observation based on analytical intent.

Structural and Encoding Rectification:

- Character encoding conversion: Decodes legacy text encodings such as Latin-1 or Windows-1252 into standard UTF-8 to eliminate replacement character errors and garbled symbols.
- Type casting: Explicitly casts string numbers into integers, decimals, or floats, capturing and routing conversion failures into an error log.

Key Takeaways:

- Data cleaning prevents pipeline crashes, reduces computational waste, and eliminates analytical skew caused by corrupted source data.
- Missing value management requires choosing between dropping rows, applying baseline constant values, or calculating statistical replacements.
- Deduplication relies on deterministic primary key ordering via window functions for exact matches and string distance algorithms for fuzzy matches.
- Standardization establishes uniform UTC timestamps, standardized string casing, clean categorical labels, and consistent numeric scales.
- Outlier management balances dropping anomalous records against capping extreme values through winsorization or applying indicator flags.
