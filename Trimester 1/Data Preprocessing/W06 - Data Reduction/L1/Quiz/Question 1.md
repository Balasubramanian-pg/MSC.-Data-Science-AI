# Question 1

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
