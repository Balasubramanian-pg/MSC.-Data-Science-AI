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


<img width="609" height="429" alt="image" src="https://github.com/user-attachments/assets/08166f4b-11d8-4d0e-88a1-6ee15b643f4a" />
