## Question 3: Dimensions, Measures, and Calculated Fields in Tableau

This question has **three parts**:

1. Difference between **Dimensions and Measures**
2. Explain what a **Calculated Field** is
3. Explain how Calculated Fields improve the effectiveness of visualizations

### 1. Dimensions vs Measures in Tableau

| Aspect                          | Dimensions                                 | Measures                                        |
| ------------------------------- | ------------------------------------------ | ----------------------------------------------- |
| **Meaning**                     | Describe or categorize data                | Represent numerical values that can be measured |
| **Typical data**                | Categorical or qualitative                 | Numerical or quantitative                       |
| **Role**                        | Used to **slice, group, and segment** data | Used to **calculate and compare values**        |
| **Default behavior in Tableau** | Usually **Discrete**                       | Usually **Continuous**                          |
| **Examples**                    | Customer, Region, Product, Department      | Sales, Profit, Quantity, Revenue                |
| **Example question**            | "Sales by Region"                          | "How much Sales?"                               |

### Example

Suppose we have this sales dataset:

| Region | Product |  Sales | Profit |
| ------ | ------- | -----: | -----: |
| West   | Laptop  | 50,000 |  8,000 |
| East   | Phone   | 30,000 |  5,000 |

Here:

* **Region** → Dimension
* **Product** → Dimension
* **Sales** → Measure
* **Profit** → Measure

If we place **Region** on Rows and **Sales** on Columns, Tableau can produce a visualization showing **Sales by Region**.

### Simple way to remember

> **Dimensions tell you "by what?"**
> **Measures tell you "how much?"**

For example:

**Sales by Region**

* Sales = Measure
* Region = Dimension

## 2. What is a Calculated Field?

A **Calculated Field** in Tableau is a new field created using a formula based on existing fields in the dataset.

Instead of storing the new value in the original database, Tableau calculates it based on the formula when it is used in the visualization.

### Example

Suppose we have:

* Sales
* Profit

We can create:

**Profit Ratio**

`Profit Ratio = SUM(Profit) / SUM(Sales)`

This produces the percentage of sales that represents profit.

Another example:

`Profit Margin = Profit / Sales`

### 3. How Calculated Fields Enhance Visualizations

Calculated fields allow analysts to create **new business metrics that may not exist directly in the source data**.

They can be used to:

* Create **custom KPIs**
* Calculate percentages and ratios
* Create business-specific metrics
* Categorize data
* Create conditional logic
* Compare performance against targets
* Create dynamic labels
* Support advanced filtering and visualization logic

### Example

Suppose a company wants to classify products based on sales:

```text
IF SUM([Sales]) >= 100000
THEN "High Sales"
ELSE "Low Sales"
END
```

This calculated field can then be used as a **dimension** to classify products into different sales groups.

Another example is a KPI:

```text
Profit Margin = SUM([Profit]) / SUM([Sales])
```

This can be displayed as a KPI card, used in a table, or represented through color in a chart.

## Overall Difference

**Dimensions → Categorize and segment data**

**Measures → Quantify and aggregate data**

**Calculated Fields → Create new analytical logic from existing data**

### Exam-Friendly Conclusion

> In Tableau, **Dimensions** are generally used to categorize, group, and segment data, while **Measures** are quantitative fields that can be aggregated and analyzed. A **Calculated Field** is a user-defined field created using formulas based on existing data. Calculated fields enhance visualizations by enabling the creation of custom KPIs, ratios, classifications, and business-specific metrics that provide deeper insights and make dashboards more informative and effective.

