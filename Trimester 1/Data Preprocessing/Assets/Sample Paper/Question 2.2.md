## Question 2.2 [5 Marks]

This question is asking you to identify the **data preprocessing problem** in each situation and then recommend an appropriate **data cleaning/integration technique**.

### Recommended Answer Structure

| Issue                                                 | Preprocessing Challenge                   | Suitable Technique                          | Explanation                                                                                                                                                                            |
| ----------------------------------------------------- | ----------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Product prices in different currencies**            | **Inconsistent units / values**           | **Currency conversion / standardization**   | Convert all prices into a common currency using an appropriate exchange rate for the transaction date. This makes prices comparable across countries.                                  |
| **Country names in multiple formats**                 | **Inconsistent categorical values**       | **Standardization / normalization**         | Map different representations such as `USA`, `U.S.A.`, and `United States` to a single standardized value such as `United States`.                                                     |
| **Dates follow different regional conventions**       | **Inconsistent date formats / ambiguity** | **Date standardization**                    | Convert all dates into a common format such as `YYYY-MM-DD`. The original regional convention should be identified first to avoid incorrectly interpreting dates such as `03/04/2026`. |
| **Product categories use different naming standards** | **Inconsistent categorical terminology**  | **Data mapping / taxonomy standardization** | Create a common product taxonomy and map values such as `Mobile Phones`, `Smartphones`, and `Cell Phones` to the appropriate standardized category.                                    |
| **Duplicate transactions**                            | **Duplicate records / data redundancy**   | **Deduplication**                           | Identify duplicate transactions using a unique transaction ID or a combination of attributes such as customer, product, date, quantity, and amount, then retain only the valid record. |

### How to Explain the Challenges

The main preprocessing challenge is **data heterogeneity**. Although the datasets represent the same business process, different countries may collect and represent the data differently.

The preprocessing process should therefore include:

1. **Data standardization**
   Convert currencies, dates, country names, and category values into common formats.

2. **Data integration**
   Establish common definitions and mappings across country-level datasets.

3. **Data cleaning**
   Detect and remove duplicate or inconsistent records.

4. **Data validation**
   Verify that the standardized data is logically correct after transformation.

### Exam-Friendly Answer

A multinational retail company faces **data inconsistency, heterogeneity, and duplication** when combining datasets from different countries. These issues must be resolved before analysis because inconsistent representations can produce incorrect results.

* **Currency differences:** Convert all prices into a common currency using appropriate exchange rates.
* **Country name differences:** Standardize country names using a common reference list.
* **Date differences:** Convert dates into a common format such as `YYYY-MM-DD`, while accounting for regional date conventions.
* **Category differences:** Create a standardized product taxonomy and map different category names to common categories.
* **Duplicate transactions:** Use transaction IDs or relevant attribute combinations to identify and remove duplicate records.

Overall, these techniques improve **data consistency, comparability, accuracy, and reliability**, making the integrated dataset suitable for analytics and machine learning.

