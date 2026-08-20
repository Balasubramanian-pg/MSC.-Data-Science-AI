# Question 2.1 [5 Marks]

A university maintains the following student database.

| Attribute            | Example      |
| -------------------- | ------------ |
| Student ID           | S2026123     |
| Name                 | Ananya       |
| Gender               | Female       |
| Semester             | 3            |
| CGPA                 | 8.72         |
| Department           | Data Science |
| Scholarship Eligible | Yes          |

### Task

For each attribute:

* Identify its **attribute type**.
* Explain why correctly identifying attribute types is important before **preprocessing and machine learning**.

This question has **two parts**:

1. Identify the **attribute type** of each column.
2. Explain why attribute types must be correctly identified before **preprocessing and machine learning**.

### Part 1: Attribute Classification

| Attribute                | Example      | Attribute Type             | Explanation                                                                                                                       |
| ------------------------ | ------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Student ID**           | S2026123     | **Nominal / Identifier**   | It is used to uniquely identify a student. The values have no meaningful numerical order or mathematical relationship.            |
| **Name**                 | Ananya       | **Nominal**                | Names are categorical labels with no inherent order or numerical meaning.                                                         |
| **Gender**               | Female       | **Nominal**                | Gender represents categories with no natural ranking or ordering.                                                                 |
| **Semester**             | 3            | **Ordinal**                | Semesters have a meaningful order: Semester 1 < Semester 2 < Semester 3, etc.                                                     |
| **CGPA**                 | 8.72         | **Numerical / Continuous** | CGPA is a numerical measurement and can take decimal values. Mathematical operations such as calculating averages are meaningful. |
| **Department**           | Data Science | **Nominal**                | Departments are categories without any inherent ranking.                                                                          |
| **Scholarship Eligible** | Yes          | **Binary / Nominal**       | It has two possible categories: Yes and No.                                                                                       |

### Part 2: Why Attribute Types Matter

Correctly identifying attribute types is important because **different types of data require different preprocessing and machine learning treatments**.

For example:

* **Nominal attributes** such as Department and Gender may need **one-hot encoding** rather than treating categories as numbers.
* **Ordinal attributes** such as Semester contain an inherent order, so their ordering should be preserved during encoding.
* **Numerical attributes** such as CGPA may require **scaling or normalization**, depending on the machine learning algorithm.
* **Binary attributes** such as Scholarship Eligible can be represented as **0/1**.
* **Student ID** should generally be treated as an **identifier rather than a predictive feature**, because its numerical or textual value does not represent a meaningful student characteristic.

Incorrect classification can introduce **false relationships, inappropriate transformations, and misleading patterns**, ultimately reducing the performance and reliability of the machine learning model.

### Exam-friendly structure

For **5 marks**, a strong answer can follow:

**1 mark:** Student ID
**1 mark:** Name, Gender, Department
**1 mark:** Semester
**1 mark:** CGPA and Scholarship Eligible
**1 mark:** Importance of correctly identifying attribute types

**Core idea:**

> **Attribute type determines how the data should be represented, cleaned, transformed, and ultimately used by the machine learning algorithm.**
