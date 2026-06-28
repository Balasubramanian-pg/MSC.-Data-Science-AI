# Second Assessment

<img width="480" height="839" alt="image" src="https://github.com/user-attachments/assets/f075ae52-7057-4d29-b9b6-cd5aa68b69e0" />

### **Question 1**

* **Correct Answer:** **Imputation**
* **Eliminations:**
* *Data Aggregation:* This summarizes or combines multiple data records rather than fixing a single missing value.
* *Normalization:* This scales continuous numerical values into a specific range, it doesn't handle missing values.
* *Integration:* This involves combining data from multiple separate sources into a single dataset.

### **Question 2**

* **Correct Answer:** **Create analysis-ready data**
* **Eliminations:**
* *Increase dataset size:* Preprocessing steps like cleaning and aggregation typically decrease or maintain dataset size, not increase it.
* *Reduce storage only:* Reducing storage is a secondary infrastructure byproduct, not the main objective of preparing data for analytics.
* *Remove all records:* The goal is to clean and format records for utility, not to delete the entire dataset.

### **Question 3**

* **Correct Answer:** **Uniqueness**
* **Eliminations:**
* *Completeness:* This measures whether any expected data values or records are missing entirely.
* *Accuracy:* This measures whether the recorded information correctly reflects real-world truth.
* *Timeliness:* This measures whether the data is sufficiently up-to-date for its intended use.

### **Question 4**

* **Correct Answer:** **Normalization**
* **Eliminations:**
* *Integration:* This merges different tables or sources, which does not map values onto a standard scale like min-max.
* *Aggregation:* This computes summary statistics (like sums or averages) across records.
* *Cleaning:* This resolves missing values, typos, or corrupt records rather than scaling numeric ranges.

### **Question 5**

* **Correct Answer:** **Understand business/domain requirements**
* **Eliminations:**
* *Fill with mean immediately:* Imputing mechanically without domain context can introduce severe bias into sensitive medical outcomes.
* *Delete record immediately:* Dropping records indiscriminately causes data loss and can wreck statistical power.
* *Normalize data:* Scaling operations cannot execute properly on fields containing missing values.

### **Question 6**

* **Correct Answer:** **Accuracy**
* **Eliminations:**
* *Interpretability:* The string remains human-readable, but its structural contents are incorrect.
* *Timeliness:* This error reflects structured format incorrectness rather than an out-of-date timestamp issue.
* *Completeness:* The field contains data characters and isn't left completely blank or missing.



<img width="454" height="835" alt="image" src="https://github.com/user-attachments/assets/e8ebf2a2-d2c5-480f-94b3-19eee11f0b87" />

### **Question 7**

* **Correct Answer:** **Consistency**
* **Eliminations:**
* *Uniqueness:* The issue is multiple structural text representations for the same entity, not identical duplicate records.
* *Accuracy:* All values correctly specify the target city, but they do so using conflicting conventions.
* *Timeliness:* This is a structural formatting discrepancy, completely unrelated to how recently the data was gathered.

### **Question 8**

* **Correct Answer:** **Accuracy**
* **Eliminations:**
* *Completeness:* The field is fully filled out; the problem is that its entry is logistically impossible.
* *Timeliness:* A future date for a past order represents an impossible truth error, not a delay in record delivery.
* *Consistency:* The field doesn't present conflicting formats here; it simply contains incorrect fact data.

### **Question 9**

* **Correct Answer:** **Analysis-Ready Data**
* **Eliminations:**
* *Raw Data:* This refers to source data straight from systems before any transformations or cleansing.
* *Dirty Data:* This describes datasets that still contain errors, missing fields, inconsistencies, or duplicates.
* *Noisy Data:* This refers to data contaminated with meaningless statistical variations, errors, or outliers.

### **Question 10**

* **Correct Answer:** **Ensure fair feature contribution**
* **Eliminations:**
* *Increase duplicates:* Normalization alters value distributions without changing row counts or generating identical entries.
* *Add noise:* Scaling stabilizes calculations and minimizes distortion rather than injecting random variances.
* *Remove labels:* Normalization transforms numeric feature ranges but leaves classification target labels untouched.

### **Question 11**

* **Correct Answer:** **Standardization**
* **Eliminations:**
* *Aggregation:* This combines individual rows to calculate summary values like group sums or averages.
* *Normalization:* This typically rescales features into a bounded range like $[0, 1]$ (Min-Max scaling).
* *Integration:* This refers to combining multiple disparate data schemas or sources.

### **Question 12**

* **Correct Answer:** **Normalization**
* **Eliminations:**
* *Standardization:* This transforms data to have a mean of 0 and a standard deviation of 1, without bounding it to $[0, 1]$.
* *Aggregation:* This collapses detailed rows into high-level summaries.
* *Integration:* This unifies separate databases or files rather than altering variable scales.


<img width="448" height="828" alt="image" src="https://github.com/user-attachments/assets/0444a93a-7ae5-4499-948b-1da4f82e395f" />

### **Question 13**

* **Correct Answer:** **Mean Imputation**
* **Eliminations:**
* *Standardization:* This transforms numeric ranges based on variance; it does not replace missing values.
* *Aggregation:* This compiles summary values across records rather than populating blank cells.
* *Integration:* This deals with blending separate system data sources together.

### **Question 14**

* **Correct Answer:** **Remove duplicate record**
* **Eliminations:**
* *Add another duplicate:* This exacerbates the data quality error by injecting even more redundant entries.
* *Normalize record:* Scaling values does nothing to resolve structural entity redundancy.
* *Aggregate record:* Grouping cannot cleanly execute until underlying table entity duplicates are purged.

### **Question 15**

* **Correct Answer:** **Missing Values**
* **Eliminations:**
* *Aggregation:* High-level summarization cannot happen effectively while data records are still incomplete.
* *Visualization:* Charting data containing massive unaddressed gaps produces highly deceptive, broken visuals.
* *Modeling:* Machine learning algorithms will fail or throw errors if fed fields containing unhandled nulls.

### **Question 16**

* **Correct Answer:** **Data Integration**
* **Eliminations:**
* *Aggregation:* This refers to math summarization (like sums), not blending distinct source tables.
* *Normalization:* This rescales feature dimensions instead of combining separate software platforms.
* *Imputation:* This replaces blank values with estimates, completely unrelated to consolidating source pipelines.

### **Question 17**

* **Correct Answer:** **Redundancy**
* **Eliminations:**
* *Noise:* This refers to random errors or extraneous variance within data values, not exact record repetition.
* *Aggregation:* This is an analytical step that computes summary metrics over clean groups.
* *Normalization:* This adjusts numerical scaling ranges instead of addressing record replication.

### **Question 18**

* **Correct Answer:** **Noise/Outlier**
* **Eliminations:**
* *Duplicate:* The value 5000 appears only once in the sequence; it is not a repeating record.
* *Missing Value:* The entry contains a distinct numerical value; it is not empty or null.
* *Aggregate:* This represents an individual raw observation, not a combined summary metric.

<img width="403" height="836" alt="image" src="https://github.com/user-attachments/assets/c3ac04a0-1e54-4a4b-8db2-a4d7aa09b9d9" />

### **Question 19**

* **Correct Answer:** **Wrong business decisions**
* **Eliminations:**
* *Better predictions:* Dirty data actively degrades model performance, producing weaker predictions.
* *Lower storage cost:* Bad data formatting often wastes storage footprints via duplicates and errors.
* *Faster processing:* Processing uncleaned datasets slows down calculations due to error-handling overhead.

### **Question 20**

* **Correct Answer:** **House Size**
* **Eliminations:**
* *Bedrooms:* Bounded tightly between 1 and 8, its scale is too small to dominate distance equations.
* *Age:* Bounded between 0 and 100, its magnitude is completely eclipsed by the house size values.
* *All equally:* Without scaling, features with massive absolute numerical ranges completely overpower smaller metrics.

### **Question 21**

* **Correct Answer:** **Completeness**
* **Eliminations:**
* *Accuracy:* We cannot evaluate correctness because no information was provided in the field.
* *Timeliness:* This concerns how current or up-to-date the record is, not whether it is blank.
* *Believability:* This evaluates source trustworthiness, which cannot be assessed on an empty field.

### **Question 22**

* **Correct Answer:** **Accuracy**
* **Eliminations:**
* *Completeness:* The field is completely filled out; the problem is that the value itself is impossible.
* *Timeliness:* An impossible age value represents an data entry error, not an outdated record issue.
* *Consistency:* There are no alternative conflicting formats presented here for this variable.

### **Question 23**

* **Correct Answer:** **Sensor error**
* **Eliminations:**
* *Aggregation error:* Summarization operations do not inject massive individual value anomalies into sensor streams.
* *Integration issue:* Blending sources affects structure or matching fields, not individual telemetry points.
* *Scaling issue:* A scaling mismatch shifts values by uniform factors, it doesn't create single isolated spikes.

### **Question 24**

* **Correct Answer:** **Invalid Value**
* **Eliminations:**
* *Missing Value:* The field contains a concrete number (-5); it is not left empty or null.
* *Timeliness Issue:* A negative age reflects a logical physical impossibility, not an outdated entry.
* *Aggregation Issue:* This is an individual observation error, not a mistake born from summarizing data groups.

<img width="441" height="136" alt="image" src="https://github.com/user-attachments/assets/c204bd72-a7e9-4c15-b733-a698970e166b" />

### **Question 25**

* **Correct Answer:** **Accuracy**
* **Eliminations:**
* *Believability:* The value is obviously wrong rather than a matter of source credibility or trust.
* *Completeness:* The field is filled with data; it is not empty.
* *Consistency:* The currency symbol and number layout match system standards; the value itself is simply impossible.

### **Confidence Score Table**

| Question Number | Correct Answer Option | Confidence Score |
| --- | --- | --- |
| **Question 1** | Imputation | 100% |
| **Question 2** | Create analysis-ready data | 100% |
| **Question 3** | Uniqueness | 100% |
| **Question 4** | Normalization | 100% |
| **Question 5** | Understand business/domain requirements | 100% |
| **Question 6** | Accuracy | 100% |
| **Question 7** | Consistency | 100% |
| **Question 8** | Accuracy | 100% |
| **Question 9** | Analysis-Ready Data | 100% |
| **Question 10** | Ensure fair feature contribution | 100% |
| **Question 11** | Standardization | 100% |
| **Question 12** | Normalization | 100% |
| **Question 13** | Mean Imputation | 100% |
| **Question 14** | Remove duplicate record | 100% |
| **Question 15** | Missing Values | 100% |
| **Question 16** | Data Integration | 100% |
| **Question 17** | Redundancy | 100% |
| **Question 18** | Noise/Outlier | 100% |
| **Question 19** | Wrong business decisions | 100% |
| **Question 20** | House Size | 100% |
| **Question 21** | Completeness | 100% |
| **Question 22** | Accuracy | 100% |
| **Question 23** | Sensor error | 100% |
| **Question 24** | Invalid Value | 100% |
| **Question 25** | Accuracy | 100% |
