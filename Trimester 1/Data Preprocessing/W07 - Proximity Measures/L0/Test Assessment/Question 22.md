# Question 22

**Question:** In Simple Matching Coefficient (SMC), which matches contribute to similarity?

* **Eliminated Options:**

  * *Only 1-1 matches:* This is characteristic of the Jaccard Coefficient.
  * *Only 0-0 matches:* Ignores mutual presence information.
  * *Only mismatches:* Mismatches decrease similarity.

* **Correct Answer:** **Both 1-1 and 0-0 matches**

> [!IMPORTANT]
> **Explanation:**
>
> The Simple Matching Coefficient is:
>
> $$
> SMC=\frac{M_{11}+M_{00}}{M_{01}+M_{10}+M_{11}+M_{00}}
> $$
>
> Both mutual presence and mutual absence contribute equally.
