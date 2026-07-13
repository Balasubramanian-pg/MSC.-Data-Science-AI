# 3.3. Missing Values vs Duplicate Data

## 3.3.1. Introduction to Incomplete and Redundant Datasets

In computational systems, raw datasets are almost never perfect. Two of the most common and challenging anomalies encountered during the ingestion phase are missing values and duplicate records.

Missing values decrease information density and introduce structural uncertainty, while duplicate records artificially inflate sample sizes and skew statistical distributions. Resolving these anomalies before feeding data into active machine learning models is crucial for ensuring model stability and accuracy.

To understand how these anomalies creep into active systems, we must examine their origin within the real-world data collection lifecycle.

## 3.3.2. Preprocessing in the Real-World Data Lifecycle

Many beginners mistakenly assume that machine learning consists solely of downloading a clean dataset from a public repository and immediately executing model training. In real-world enterprise architectures, the physical collection and storage of clean data represent the primary engineering bottlenecks.

The following table maps the standard sequential stages required to construct a production-ready database from raw data.

| Stage | Computational Focus | Key Challenges |
| :---: | :---: | :---: |
| **Attribute Identification** | Deciding what data variables to collect | Aligning features with business domains |
| **Data Collection** | Ingesting records via forms, APIs, and sensors | Hardware failures, network packet drop |
| **Data Storage** | Structuring raw logs into relational schemas | Handling write locks and scale constraints |
| **Data Cleaning** | Identifying structural syntax inconsistencies | Parsing corrupted strings and formats |
| **Data Preprocessing** | Resolving missing values and redundant records | Designing mathematical imputation engines |
| **ML Modeling** | Training predictive or descriptive algorithms | Managing bias-variance optimization |

As illustrated in the data lifecycle, missing values naturally emerge during the collection and ingestion phases due to hardware and human limits.

To systematically resolve these gaps, we must first understand the underlying causes of missing data.

## 3.3.3. Causes and Handling of Missing Values

Missing values represent a loss of information and introduce uncertainty because the algorithm no longer has a complete representation of the observation.

### 3.1 Direct Causes of Missingness
Missing values (represented as $$x_i = \text{NULL}$$ or $$x_i = \text{NaN}$$) occur due to several real-world reasons:
- **Sensor Failure:** A meteorological hardware unit drops its connection.
- **User Refusal:** A user leaves an optional form field blank (e.g., hiding age or salary).
- **Human Error:** An operator skips a record during manual transcription.
- **Non-applicable Fields:** Certain fields are structurally invalid for an observation (e.g., recording $$Y = \text{income}$$ for a child).

### 3.2 The Hazard of Disguised Missingness
One of the most dangerous and silent preprocessing problems is **Disguised Missingness**.

Standard null-checking scripts look for $$\text{NULL}$$ or $$\text{NaN}$$ to flag empty cells. However, in disguised missingness, the dataset contains syntactically valid but fake placeholder values.

For example, if a website forces users to enter a birthdate, a user who values their privacy might leave the default value of $$01\text{-}01\text{-}1990$$ untouched. The database now records a valid date, but it is mathematically a placeholder. This introduces severe statistical distortion, causing algorithms to incorrectly conclude that a massive portion of the population shares the exact same birthday.

### 3.3 Standard Mitigation Strategies
To resolve missing values, analysts choose from several standard imputation strategies:
- **Ignore Rows:** Dropping incomplete observations. This is simple but reduces sample size.
- **Global Constant:** Replacing missing entries with a placeholder category like $$\text{"Unknown"}$$.
- **Mean Imputation:** Replacing missing continuous values with the average of the observed values. The Mean Imputation formula is:
  $$
  \bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
  $$
  where:
  - $$\bar{x}$$ = the calculated sample mean
  - $$x_i$$ = each observed, non-null value in the feature column
  - $$n$$ = the total number of non-null observations
- **Median Imputation:** Replacing missing values with the median, which is robust to extreme outliers.
- **Inference-Based Imputation:** Using predictive algorithms (such as KNN or decision trees) to estimate the missing value based on other observed attributes.

Let us explicitly restate this fundamental Mean Imputation formula for emphasis:

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

To understand how naive imputation can lead to statistical bias when disguised placeholders are left unresolved, let us work through a detailed numerical calculation.

## 3.3.4. Worked Mathematical Example: Mean Imputation and Entropy Distortion

We will perform median/mean imputation to resolve a true missing value ($$\text{NaN}$$), calculate the true mean of the valid records, and quantify the upward statistical bias that occurs if we naively compute the mean without first resolving a disguised placeholder.

Suppose:
- We have a small raw dataset of customer salary records where one value is missing and another is a disguised missing placeholder:
  $$
  S = [50000.000,\ 60000.000,\ \text{NaN},\ 99999.000,\ 50000.000]
  $$
- The value $$99999.000$$ is a default system placeholder representing "Refused to Disclose."
- We wish to perform median/mean imputation to resolve the true missing value ($$\text{NaN}$$), calculate the true mean of the valid records, and quantify the upward statistical bias that occurs if we naively compute the mean without first resolving the disguised placeholder ($99999.000$).

We will follow a five-step calculation pipeline.

### Step 1: Define Raw Dataset with Missing and Disguised Values
We record our raw feature vector:

$$
S = [50000.000,\ 60000.000,\ \text{NaN},\ 99999.000,\ 50000.000]
$$

We flag $$99999.000$$ as a disguised missing placeholder and exclude it along with the $$\text{NaN}$$ to identify our valid observations:

$$
S_{\text{valid}} = [50000.000,\ 60000.000,\ 50000.000]
$$

### Step 2: Calculate Mean and Median of the Valid Data
We compute the mean of the valid, non-placeholder records:

$$
\bar{x} = \frac{50000.000 + 60000.000 + 50000.000}{3} = \frac{160000.000}{3} \approx 53333.333
$$

The median of our sorted valid records ($$[50000.000, 50000.000, 60000.000]$$) is:

$$
\tilde{X} = 50000.000
$$

### Step 3: Execute Mean Imputation on the True Missing Value
We replace our true missing value ($$\text{NaN}$$) with our computed valid mean of $$53333.333$$. The imputed vector is:

$$
S_{\text{imputed}} = [50000.000,\ 60000.000,\ 53333.333,\ 99999.000,\ 50000.000]
$$

### Step 4: Compute the Skewed Mean Caused by the Disguised Placeholder
If an engineer naively calculates the mean of our imputed vector without identifying and removing the disguised placeholder ($$99999.000$$), the calculation becomes:

$$
\bar{x}_{\text{naive}} = \frac{50000.000 + 60000.000 + 53333.333 + 99999.000 + 50000.000}{5} = \frac{313332.333}{5} = 62666.467
$$

### Step 5: Quantify the Statistical Distortion Error
We calculate the absolute difference between the true valid mean and our naively calculated mean:

$$
\text{Distortion} = |\bar{x} - \bar{x}_{\text{naive}}| = |53333.333 - 62666.467| = 9333.134
$$

The final metrics are:

$$
\mathbf{\bar{x} \approx 53333.333}
$$

$$
\mathbf{\bar{x}_{\text{naive}} = 62666.467}
$$

$$
\mathbf{\text{Distortion} \approx 9333.134}
$$

The final mathematical distortion is **9333.134**, confirming that failing to identify and remove disguised missing placeholders introduces a massive upward bias ($$\approx 17.5\%$$ error) into our statistical estimates.

While missing data represents a loss of information, data integration across legacy databases introduces the opposite problem: redundant, duplicate information.

## 3.3.5. Duplicate Data and Data Integration Challenges

Duplicate data occurs when the same entity or attribute appears multiple times in a dataset.

### 5.1 Causes of Duplication
Duplicate records are usually introduced during the data integration phase, where different source systems are consolidated. When databases (such as customer billing, insurance, and service logs) are merged blindly, differences in text strings can make duplicate records difficult to detect.

### 5.2 The Aadhaar Case Study: Legacy System Integration
The developmental history of India's **Aadhaar** biometric system serves as a classic real-world example of data integration complexity.

Before Aadhaar, citizens were registered across several legacy databases, including PAN cards, Voter IDs, Passports, and Ration Cards. Merging these databases was highly complex because of name spelling discrepancies (e.g., "Heman R" vs. "Heman Rathore" vs. "R Heman"), outdated addresses, and duplicate entries. This level of structural inconsistency is why a centralized, biometric-based verification system was required to establish unique identity records.

To systematically merge these heterogeneous records without creating duplicate entries, engineers must solve the entity identification problem.

## 3.3.6. The Entity Identification and Resolution Problem

Entity Identification (also known as record linkage, entity resolution, or deduplication) is the task of identifying whether two distinct records represent the same real-world entity.

### 6.1 The Mathematical Model of Record Linkage
To resolve this mathematically, we model the probability that record $$A$$ and record $$B$$ refer to the same object:

$$
P(A = B \mid \gamma)
$$

where:
- $$P(A = B)$$ = the probability that record $$A$$ and record $$B$$ represent the same real-world entity
- $$\gamma$$ = a comparison vector containing similarity scores calculated across specific features (such as names, addresses, and birthdates)

Let us explicitly restate this probability model of record linkage for emphasis:

$$
P(A = B \mid \gamma)
$$

Fuzzy matching algorithms are used to estimate this probability, allowing systems to group similar records even when string values differ slightly due to typos or format variations.

Using these probabilistic similarity vectors, we can design automated workflows to detect and resolve duplicate records in our active databases.

## 3.3.7. Detecting and Resolving Duplicate Records

We employ multiple detection strategies to identify and merge redundant records:

- **Correlation Analysis:** Searching for highly redundant columns or rows that exhibit near-perfect correlation coefficients.
- **Fuzzy String Matching:** Using string similarity algorithms (such as the Levenshtein Distance or Jaro-Winkler metric) to quantify the difference between names (e.g., "Heman R" vs. "Heman Rathore").
- **Rule-Based Systems:** Enforcing strict business logic to merge records if critical features (such as National ID and Last Name) match exactly.
- **Manual Review:** Routing low-confidence matches ($$\theta_1 \le P(A = B) \le \theta_2$$) to human operators to prevent accidental deletion of valid records.

Although missing data and duplicate data are both critical preprocessing anomalies, they introduce completely opposite types of statistical distortion.

## 3.3.8. Structural Comparisons: Missing Data vs. Duplicate Data

The following table contrasts the defining characteristics, operational impacts, and resolution strategies for missing and duplicate records.

| Feature | Missing Data | Duplicate Data |
| :---: | :---: | :---: |
| **Core Phenomenon** | Complete loss or absence of information | Presence of redundant, repetitive information |
| **Mathematical Impact** | Introduces structural variance and uncertainty | Artificially inflates frequency and weights |
| **Primary Cause** | Sensor drops, user refusal, skipped entry fields | Blind database merges, multiple source integration |
| **Resolution Goal** | Reinstate coordinates via mathematical imputation | Isolate and consolidate records via deduplication |
| **Pipeline Risk** | Runtime calculation crashes, model training failure | Overrepresented samples biasing prediction boundaries |

Failing to select the correct resolution strategy for either missing or duplicate data can introduce severe preprocessing failures.

## 3.3.9. Common Preprocessing and Modeling Failure Modes

When designing data cleaning pipelines, practitioners frequently make critical mistakes that can compromise model performance.

### 9.1 Blind Mean Imputation on Data Containing Disguised Placeholders

>[!Warning]
> **Imputing Values Without Resolving Placeholder Records**
> Performing standard mean imputation on a continuous feature while leaving disguised placeholders (such as using $$99999.000$$ to represent missing salaries) unresolved will severely bias the computed mean. The resulting imputed values will be skewed by the placeholder values, compromising the model's accuracy.

### 9.2 Aggressive Deduplication and Record Deletion

>[!Warning]
> **Using Loose String Thresholds for Entity Resolution**
> Setting fuzzy string matching thresholds too low during automated deduplication can cause different individuals with similar names (e.g., "John Smith" and "Jon Smith") to be merged. This permanently deletes valid records, destroying the statistical integrity of the dataset.

### 9.3 Hardcoding Rule-Based Merges Without Probabilistic Calibration

>[!Warning]
> **Relying Solely on Exact-Match Schemes Across Systems**
> Merging heterogeneous databases using strict exact-match rules (such as matching only on exact string address matches) will fail to resolve the vast majority of duplicate records due to minor variations (e.g., "St." vs. "Street"). This results in high rates of undetected duplicate entries.

In conclusion, understanding these preprocessing techniques defines the statistical and mathematical limits of your feature space.

## 3.3.10. Conclusions and Preprocessing Comparison Matrix

Data preprocessing is not a minor cleanup step; it is a core engineering challenge in practical machine learning systems.

Let us restate our foundational Mean Imputation formula to highlight how missing data is resolved:

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

Let us restate our record linkage model to highlight how duplicate entries are resolved:

$$
P(A = B \mid \gamma)
$$

The following matrix provides a summary of the diagnostic indicators and recommended engineering actions for both anomalies.

| Anomaly Class | Diagnostic Indicator | Recommended Engineering Action |
| :---: | :---: | :---: |
| **Standard Missingness** | Null, `NaN`, or empty cells in feature columns | Median or KNN-based feature imputation |
| **Disguised Missingness** | Unexpected spikes at default values (e.g., `01-01-1990`) | Convert placeholders to `NaN` before imputing |
| **Duplicate Records** | Identical or highly similar rows across tables | Fuzzy string matching and probabilistic record linkage |

By strategically identifying disguised placeholders and probabilistically resolving record linkages, machine learning engineers can ensure their pipelines ingest clean, mathematically sound datasets, establishing a reliable geometric foundation for predictive models.
