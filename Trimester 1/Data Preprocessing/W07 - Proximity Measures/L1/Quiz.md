# Practice Quiz

<img width="695" height="751" alt="image" src="https://github.com/user-attachments/assets/f94aebb5-3ce9-4158-b959-3da4b0cfad41" />

### Question 1
**Question:** Which distance metric represents the shortest straight-line path between two points in a multi-dimensional space?
*   **Eliminated Options:**
    *   *Minkowski Distance:* This is a generalized metric; it only represents a straight line when its parameter $p=2$.
    *   *Manhattan Distance:* Measures distance in a grid-like path (right angles only), like navigating city blocks.
    *   *Supremum Distance:* Measures the maximum difference along any single dimension (Minkowski where $p \to \infty$).
*   **Correct Answer:** **Euclidean Distance**

> [!NOTE]
> **Explanation:** 
> Euclidean Distance is based on the Pythagorean theorem and calculates the direct, "as the crow flies," straight-line distance between two points in a Euclidean space. 

---

### Question 2
**Question:** When is the Jaccard Coefficient preferred over the Simple Matching Coefficient (SMC) for measuring similarity between binary vectors?
*   **Eliminated Options:**
    *   *When the binary attributes are perfectly symmetric:* SMC is actually preferred here.
    *   *When the dataset contains no binary attributes:* Both SMC and Jaccard are specifically designed for binary data.
    *   *When both the presence and absence of a feature are equally important:* This is the exact use-case for the Simple Matching Coefficient (SMC).
*   **Correct Answer:** **When the presence of a feature (a 1-1 match) is more significant than its absence (a 0-0 match).**

> [!TIP]
> **Explanation:** 
> The Jaccard Coefficient ignores $0-0$ matches (mutual absences). It is specifically used for *asymmetric* binary attributes where a mutual presence (like two users buying the same rare book) is meaningful, but a mutual absence (two users not buying a random book) provides no real similarity information.

---

### Question 3
**Question:** What is the first step in handling ordinal attributes before calculating their proximity?
*   **Eliminated Options:**
    *   *Calculate the Euclidean distance between the category labels:* Labels are often text (e.g., "Good", "Bad") and cannot be calculated this way directly.
    *   *Treat them as nominal attributes and count only matches/mismatches:* This destroys the valuable ordering information inherent to ordinal data.
    *   *Remove all ordinal attributes from the dataset:* This unnecessarily discards valuable data.
*   **Correct Answer:** **Map the categories to integer ranks**

> [!NOTE]
> **Explanation:** 
> Ordinal attributes have a meaningful sequence (e.g., Low, Medium, High). To compute mathematical proximity, you must first convert these sequential categories into integer ranks (e.g., 1, 2, 3) so that the relative distance between the ranks can be normalized and calculated.

<img width="651" height="678" alt="image" src="https://github.com/user-attachments/assets/a3e7889a-626c-4bb2-a031-f08f0a36d9ef" />

---

### Question 4
**Question:** How is the proximity between two objects typically calculated when the dataset contains a mix of attribute types (e.g., nominal, numerical, ordinal)?
*   **Eliminated Options:**
    *   *By using only the numerical attributes and ignoring all others:* This throws away useful information from the other data types.
    *   *By calculating the Euclidean distance across all attributes regardless of type:* Euclidean distance mathematically cannot be directly applied to text-based nominal attributes.
    *   *By converting all attributes to binary and using the Jaccard coefficient:* This destroys the continuous precision of numerical attributes and the sequence of ordinal ones.
*   **Correct Answer:** **By computing a weighted combination of the dissimilarities for each attribute type**

> [!IMPORTANT]
> **Explanation:** 
> For mixed datasets, data scientists usually calculate the similarity/dissimilarity for each attribute separately (using the appropriate method for that specific type), map them to a standard scale (like 0 to 1), and then combine them using a weighted average. A common algorithm for this is Gower's distance.

---

### Question 5
**Question:** Which of the following is the best example of a symmetric binary attribute?
*   **Eliminated Options:**
    *   *A feature indicating if a transaction was fraudulent:* Asymmetric (fraud is rare and a "True" is much more significant than a "False").
    *   *The result of a medical test for a rare disease:* Asymmetric (having the rare disease is highly significant).
    *   *A feature indicating whether a customer purchased a specific luxury item:* Asymmetric (purchasing it is rare compared to not purchasing it).
*   **Correct Answer:** **A survey question asking for a person's gender (Male/Female)**

> [!NOTE]
> **Explanation:** 
> A symmetric binary attribute is one where both states are equally important and carry the same weight. Being Male or Female are both normal, equally meaningful states, and a match in either category is equally significant.

---

### Question 6
**Question:** If the dissimilarity (distance) between two data objects is very high, what does this imply about their similarity?
*   **Eliminated Options:**
    *   *Their similarity is also very high:* Distance and similarity are inversely related, not directly related.
    *   *Their similarity cannot be determined from their dissimilarity:* They are mathematically linked (often by formulas like $s = 1 - d$), so it *can* be determined.
    *   *Their similarity is equal to their dissimilarity:* This is only true precisely at the exact midpoint (e.g., 0.5).
*   **Correct Answer:** **Their similarity is very low.**

> [!TIP]
> **Explanation:** 
> Similarity and dissimilarity are inverses of one another. The further apart two objects are (high distance/dissimilarity), the less alike they are (low similarity).

<img width="609" height="429" alt="image" src="https://github.com/user-attachments/assets/08166f4b-11d8-4d0e-88a1-6ee15b643f4a" />
