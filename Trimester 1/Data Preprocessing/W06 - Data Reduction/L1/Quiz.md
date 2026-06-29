
<img width="413" height="737" alt="image" src="https://github.com/user-attachments/assets/66bced47-f39b-428e-9d63-997461a95786" />

## Question 1

**Question:** Which type of data compression allows for the original data to be perfectly reconstructed from the compressed version?

* **Eliminated Options:**

  * *Histogram compression:* A histogram summarizes the distribution of data but does not allow perfect reconstruction of the original dataset.
  * *Lossy compression:* Permanently removes some information, making exact reconstruction impossible.
  * *Binning compression:* Groups values into intervals and loses detailed information.

* **Correct Answer:** **Lossless compression**

> [!NOTE]
> **Explanation:**
>
> Lossless compression reduces storage requirements while preserving every bit of information.
>
> After decompression:
>
> $$
> \text{Original Data} = \text{Recovered Data}
> $$
>
> Examples include:
>
> * ZIP archives
> * PNG images
> * FLAC audio files

## Question 2

**Question:** A dataset for predicting house prices contains two columns: `price_in_usd` and `price_in_eur`. What kind of feature is `price_in_eur` if `price_in_usd` is already present?

* **Eliminated Options:**

  * *An irrelevant feature:* The EUR price is directly related to the USD price and therefore is relevant.
  * *A sparse feature:* Sparsity refers to features containing mostly zero values.
  * *A noisy feature:* Noise introduces random variation rather than duplicate information.

* **Correct Answer:** **A redundant feature**

> [!NOTE]
> **Explanation:**
>
> If:
>
> $$
> \text{price_in_eur} = \text{price_in_usd} \times \text{Exchange Rate}
> $$
>
> then `price_in_eur` provides no additional information because it can be derived directly from `price_in_usd`.
>
> Such features are called **redundant features**.

## Question 3

**Question:** In which type of sampling is a selected object returned to the population before the next selection, allowing it to be chosen again?

* **Eliminated Options:**

  * *Stratified sampling:* Divides the population into homogeneous groups before sampling.
  * *Simple random sampling:* Refers to random selection but does not necessarily imply replacement.
  * *Sampling without replacement:* Once selected, an object cannot be chosen again.

* **Correct Answer:** **Sampling with replacement**

> [!NOTE]
> **Explanation:**
>
> In sampling with replacement:
>
> 1. Select an object.
> 2. Return it to the population.
> 3. Perform the next selection.
>
> Consequently, the same object may appear multiple times in the sample.

## Question 4

**Question:** What is the key principle for effective data sampling?

* **Eliminated Options:**

  * *The sample should be as large as possible, ideally the entire dataset:* Sampling exists precisely to avoid processing the entire dataset.
  * *The sample must be created using a complex algorithm:* Complexity does not guarantee quality.
  * *The sample should be selected based on convenience:* Convenience sampling often introduces bias.

* **Correct Answer:** **The sample must be representative of the original dataset**

> [!IMPORTANT]
> **Explanation:**
>
> An effective sample should preserve the important characteristics and distributions present in the full population.
>
> A representative sample ensures:
>
> * Reduced sampling bias.
> * More accurate analysis.
> * Better model generalization.

## Question 5

**Question:** A photographer saves a high-resolution photo as a JPEG file to reduce its size for web use. What type of data reduction has occurred?

* **Eliminated Options:**

  * *Feature selection:* Removes unnecessary attributes from a dataset rather than reducing image file size.
  * *Tuple reduction:* Reduces the number of records in a dataset.
  * *Lossless compression:* Preserves all original information exactly.

* **Correct Answer:** **Lossy compression**

> [!NOTE]
> **Explanation:**
>
> JPEG compression achieves smaller file sizes by discarding image details that are less perceptible to human vision.
>
> Since some information is permanently removed:
>
> $$
> \text{Recovered Image} \neq \text{Original Image}
> $$
>
> JPEG is therefore classified as a **lossy compression** technique.

<img width="384" height="595" alt="image" src="https://github.com/user-attachments/assets/ecef9db1-0ec1-438a-a0f8-5c631e4d208d" />
