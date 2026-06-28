# Second Assessment

<img width="440" height="810" alt="image" src="https://github.com/user-attachments/assets/1e5857d8-13a4-419d-9859-d7b813e979ab" />

### **Question 1**

* **Correct Answer:** **The data scientist is correct only if 'Age' is used because it carries domain-relevant predictive information for the task**
* **Eliminations:**
* *The colleague is correct; all date conversions are preprocessing:* Simply formatting dates is preprocessing, but converting a date into a specific behavioral metric like "Age" purposefully targets predictive utility.
* *The data scientist is correct; any numeric conversion qualifies as feature engineering:* Stripping a date into raw timestamps or nominal numeric encodings does not make it feature engineering without task-relevant value creation.
* *Both are equally correct since the outcome is the same numeric feature:* This ignores the analytical intent and conditions under which a transformation crosses the line from technical formatting to engineered predictive signal.

### **Question 2**

* **Correct Answer:** **Robust Scaling, because the outliers in Monetary Value would distort Min-Max bounds and compress normal values, while Robust Scaling uses median and IQR to minimize this distortion**
* **Eliminations:**
* *Min-Max Scaling, because it guarantees all features are in [0,1] and K-Means requires bounded inputs:* Min-Max is highly vulnerable to outliers, as extreme values compress all standard entries into a tiny, indistinguishable band near 0.
* *No scaling is needed because K-Means uses centroids, not distances:* Centroid updates are calculated purely via distance formulas (Euclidean), making scaling absolutely mandatory.
* *Log transformation alone is sufficient; no further scaling is required:* Log transforms fix skewness but do not normalize disparate coordinate scales across features to prevent domination.

### **Question 3**

* **Correct Answer:** **The extreme outlier (9,50,000) becomes the maximum, so the formula (X - min)/(max - min) produces very small values for all normal entries; Robust Scaling using median and IQR would be a better choice**
* **Eliminations:**
* *The data has too few records; collecting more data would fix the compression:* Adding data does not remove the mathematical compression caused by an existing extreme upper bound in the formula.
* *Min-Max Scaling always compresses values near 0 regardless of the data; Z-score should always be used instead:* Min-Max distributes data evenly across $[0, 1]$ if the data is uniform; it only compresses near 0 when heavy right-side outliers exist.
* *The income values are integers, not decimals; converting them to float would resolve the compression:* The issue is a scale distortion created by a massive maximum boundary, completely unrelated to variable data types.

### **Question 4**

* **Correct Answer:** **The added features introduced overfitting by increasing model complexity beyond what the data supports, leading to poor generalization**
* **Eliminations:**
* *The model is underfitting; more interaction features should be added:* Training accuracy rose to 94% while test performance tanked; this indicates severe overfitting, not underfitting.
* *The polynomial features are causing data leakage from the test set:* Feature engineering performed on columns within data records increases mathematical complexity but does not leak out-of-sample target labels.
* *The model requires log transformation of all features before polynomial features can be beneficial:* Log transformations help with skewed distributions but do not natively resolve structural overfitting caused by excessive model parameters.

### **Question 5**

* **Correct Answer:** **No, because equal-width binning divides by numeric range and would create very uneven bin populations on skewed price data**
* **Eliminations:**
* *Yes, both methods always produce the same bin boundaries when 3 bins are used:* They only align if data is perfectly and uniformly distributed across its range.
* *Yes, equal-frequency binning is just a special case of equal-width binning:* They are structurally distinct logic sets—one counts observations per bucket, while the other splits coordinate distances equally.
* *Yes, because both methods divide values by the total numeric range, making boundaries identical:* Only equal-width splits by range distance; equal-frequency sorts elements and counts index cutoffs.

<img width="450" height="754" alt="image" src="https://github.com/user-attachments/assets/b0e19a05-809d-4266-88f0-a1d4522634e3" />

### **Question 6**

* **Correct Answer:** **Standardization ensures each feature contributes proportionally to distance calculations, preventing high-magnitude features from dominating**
* **Eliminations:**
* *Z-score changes the shape of the Annual Spend distribution, making it non-normal:* Linear transformations like Z-scores shift and rescale data points but leave the fundamental shape of the underlying distribution completely unchanged.
* *Z-score eliminates outliers from the dataset before clustering:* Z-score retains outliers; it simply modifies their numerical scale relative to the mean.
* *Z-score converts Annual Spend into a categorical variable, which K-Means can process better:* Z-score results in scaled continuous continuous numbers, not categorical classes.

### **Question 7**

* **Correct Answer:** **The transformed feature will have mean 0 and standard deviation 1, but the right-skewed shape of the distribution will remain unchanged**
* **Eliminations:**
* *The transformed feature will be normally distributed with mean 0 and standard deviation 1:* Z-score scaling standardizes variance and centers data, but it cannot mathematically map a highly skewed distribution into a bell curve shape.
* *The transformed feature will have all values in the range [-1, 1]:* This describes Min-Max or MaxAbs scaling styles; Z-score values can extend beyond $\pm 1$ depending on variance.
* *The transformed feature will have its outliers removed since they are more than 3 standard deviations away:* Outliers are preserved and exposed as high absolute values ($> 3$), never automatically deleted.

<img width="473" height="570" alt="image" src="https://github.com/user-attachments/assets/716fce7a-c670-4862-a905-6cc61d771624" />

### **Question 8**

* **Correct Answer:** **Feature creation — deriving a new domain-informed feature from existing ones**
* **Eliminations:**
* *Feature selection — keeping only the important features:* This describes dropping irrelevant or redundant columns, not synthesizing a brand-new ratio metric.
* *Feature encoding — converting income into numeric form:* Income is already numeric; encoding converts categorical strings or text groups into numbers.
* *Feature transformation — applying a log to reduce skewness:* This applies mathematical scaling to a single variable rather than generating a completely new composite attribute from two metrics.

### **Question 9**

* **Correct Answer:** **Feature creation**
* **Eliminations:**
* *Feature scaling:* This alters the numerical range or variance of data columns without inventing brand new attributes.
* *Feature selection:* This acts as a filter to discard weak columns rather than generating an entirely new timeline gap metric.
* *Feature encoding:* This translates text variables or category labels into machine-readable numeric scales.

### **Question 10**

* **Correct Answer:** **Apply log transformation first to compress the large value and reduce skewness, then apply Z-score standardization to center and scale the now-symmetric distribution**
* **Eliminations:**
* *Apply Z-score standardization first, then apply log transformation...:* Log operations throw mathematical errors if applied to columns containing negative values, which Z-scoring introduces by centering the mean at 0.
* *Apply Min-Max Scaling directly, since it will automatically fix the skewness by mapping everything to [0, 1]:* Min-Max maps range endpoints but does not compress skewness, leaving normal values compressed into a useless narrow strip.
* *Apply equal-width binning first to group incomes into categories, then standardize...:* Binning destroys continuous granularity by turning continuous income fields into rigid categorical codes.
