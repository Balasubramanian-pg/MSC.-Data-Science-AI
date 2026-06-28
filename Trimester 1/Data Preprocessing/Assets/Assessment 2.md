
<img width="480" height="839" alt="image" src="https://github.com/user-attachments/assets/f075ae52-7057-4d29-b9b6-cd5aa68b69e0" />

Here is the breakdown for your data preprocessing quiz following our strict elimination protocol.

---

### **Question 1**

* **Correct Answer:** **Imputation**
* **Eliminations:**
* *Data Aggregation:* This summarizes or combines multiple data records rather than fixing a single missing value.
* *Normalization:* This scales continuous numerical values into a specific range, it doesn't handle missing values.
* *Integration:* This involves combining data from multiple separate sources into a single dataset.



---

### **Question 2**

* **Correct Answer:** **Create analysis-ready data**
* **Eliminations:**
* *Increase dataset size:* Preprocessing steps like cleaning and aggregation typically decrease or maintain dataset size, not increase it.
* *Reduce storage only:* Reducing storage is a secondary infrastructure byproduct, not the main objective of preparing data for analytics.
* *Remove all records:* The goal is to clean and format records for utility, not to delete the entire dataset.



---

### **Question 3**

* **Correct Answer:** **Uniqueness**
* **Eliminations:**
* *Completeness:* This measures whether any expected data values or records are missing entirely.
* *Accuracy:* This measures whether the recorded information correctly reflects real-world truth.
* *Timeliness:* This measures whether the data is sufficiently up-to-date for its intended use.



---

### **Question 4**

* **Correct Answer:** **Normalization**
* **Eliminations:**
* *Integration:* This merges different tables or sources, which does not map values onto a standard scale like min-max.
* *Aggregation:* This computes summary statistics (like sums or averages) across records.
* *Cleaning:* This resolves missing values, typos, or corrupt records rather than scaling numeric ranges.



---

### **Question 5**

* **Correct Answer:** **Understand business/domain requirements**
* **Eliminations:**
* *Fill with mean immediately:* Imputing mechanically without domain context can introduce severe bias into sensitive medical outcomes.
* *Delete record immediately:* Dropping records indiscriminately causes data loss and can wreck statistical power.
* *Normalize data:* Scaling operations cannot execute properly on fields containing missing values.



---

### **Question 6**

* **Correct Answer:** **Accuracy**
* **Eliminations:**
* *Interpretability:* The string remains human-readable, but its structural contents are incorrect.
* *Timeliness:* This error reflects structured format incorrectness rather than an out-of-date timestamp issue.
* *Completeness:* The field contains data characters and isn't left completely blank or missing.



<img width="454" height="835" alt="image" src="https://github.com/user-attachments/assets/e8ebf2a2-d2c5-480f-94b3-19eee11f0b87" />


---

### **Question 7**

* **Correct Answer:** **Consistency**
* **Eliminations:**
* *Uniqueness:* The issue is multiple structural text representations for the same entity, not identical duplicate records.
* *Accuracy:* All values correctly specify the target city, but they do so using conflicting conventions.
* *Timeliness:* This is a structural formatting discrepancy, completely unrelated to how recently the data was gathered.



---

### **Question 8**

* **Correct Answer:** **Accuracy**
* **Eliminations:**
* *Completeness:* The field is fully filled out; the problem is that its entry is logistically impossible.
* *Timeliness:* A future date for a past order represents an impossible truth error, not a delay in record delivery.
* *Consistency:* The field doesn't present conflicting formats here; it simply contains incorrect fact data.



---

### **Question 9**

* **Correct Answer:** **Analysis-Ready Data**
* **Eliminations:**
* *Raw Data:* This refers to source data straight from systems before any transformations or cleansing.
* *Dirty Data:* This describes datasets that still contain errors, missing fields, inconsistencies, or duplicates.
* *Noisy Data:* This refers to data contaminated with meaningless statistical variations, errors, or outliers.



---

### **Question 10**

* **Correct Answer:** **Ensure fair feature contribution**
* **Eliminations:**
* *Increase duplicates:* Normalization alters value distributions without changing row counts or generating identical entries.
* *Add noise:* Scaling stabilizes calculations and minimizes distortion rather than injecting random variances.
* *Remove labels:* Normalization transforms numeric feature ranges but leaves classification target labels untouched.



---

### **Question 11**

* **Correct Answer:** **Standardization**
* **Eliminations:**
* *Aggregation:* This combines individual rows to calculate summary values like group sums or averages.
* *Normalization:* This typically rescales features into a bounded range like $[0, 1]$ (Min-Max scaling).
* *Integration:* This refers to combining multiple disparate data schemas or sources.



---

### **Question 12**

* **Correct Answer:** **Normalization**
* **Eliminations:**
* *Standardization:* This transforms data to have a mean of 0 and a standard deviation of 1, without bounding it to $[0, 1]$.
* *Aggregation:* This collapses detailed rows into high-level summaries.
* *Integration:* This unifies separate databases or files rather than altering variable scales.


<img width="448" height="828" alt="image" src="https://github.com/user-attachments/assets/0444a93a-7ae5-4499-948b-1da4f82e395f" />

<img width="403" height="836" alt="image" src="https://github.com/user-attachments/assets/c3ac04a0-1e54-4a4b-8db2-a4d7aa09b9d9" />

<img width="441" height="136" alt="image" src="https://github.com/user-attachments/assets/c204bd72-a7e9-4c15-b733-a698970e166b" />
