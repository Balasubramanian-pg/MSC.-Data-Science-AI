## Question 4: Subplots in Data Visualization

This question has **two parts**:

1. Explain what subplots are and when they are useful.
2. Mention the Python syntax used to create subplots.

### 1. What are Subplots?

**Subplots** are multiple individual plots displayed within a **single figure or visualization area**.

Instead of creating separate figures for each chart, multiple related charts can be arranged together in rows and columns.

### Example

Suppose we want to analyze a company's performance using:

* Sales trend
* Profit trend
* Number of customers

Instead of creating three separate figures, we can display all three charts in one figure using subplots.

### 2. When are Subplots Used?

Subplots are useful when:

* **Comparing multiple variables** within the same dataset
* Showing different aspects of the **same analysis**
* Comparing multiple charts using a **common scale or context**
* Visualizing several related distributions or trends
* Creating compact dashboards or analytical figures
* Comparing different categories, groups, or time periods

### Example

For a sales dataset, we could create:

```text
+-------------------+-------------------+
|   Sales Trend     |   Profit Trend    |
+-------------------+-------------------+
| Customer Growth   |  Product Sales    |
+-------------------+-------------------+
```

This makes it easier to compare related information without switching between separate figures.

## 3. Generating Subplots in Python

Using **Matplotlib**, the `subplots()` function can be used.

### Basic Syntax

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
```

For multiple subplots:

```python
fig, ax = plt.subplots(2, 2)
```

This creates a **2 × 2 grid**, giving four subplot areas.

For example:

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(2, 2)

ax[0, 0].plot(x, y1)
ax[0, 1].bar(x, y2)
ax[1, 0].scatter(x, y3)
ax[1, 1].plot(x, y4)

plt.show()
```

### Important Syntax

```python
plt.subplots(rows, columns)
```

For example:

```python
plt.subplots(2, 3)
```

creates **2 rows × 3 columns = 6 subplots**.

### Exam-Friendly Conclusion

> Subplots allow multiple related visualizations to be displayed within a single figure. They are useful for comparing different variables, categories, trends, or distributions in a common visual context. In Python, subplots can be created using Matplotlib's `plt.subplots()` function, such as `fig, ax = plt.subplots(2, 2)`, which creates four plots arranged in a 2 × 2 grid.

