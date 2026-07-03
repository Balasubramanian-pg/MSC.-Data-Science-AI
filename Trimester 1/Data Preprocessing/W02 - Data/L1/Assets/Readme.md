
# Question 11

Which type of attribute has categories with no inherent order?

## Options

* Ordinal
* Ratio
* Interval
* Nominal

## Answer

✅ **Nominal**

> [!NOTE]
> **Reason**
>
> **Nominal attributes** represent categories without any natural ordering or ranking.
>
> Examples include:
>
> * Blood Type (A, B, AB, O)
> * Eye Colour
> * Country
>
> Unlike ordinal attributes, the categories cannot be meaningfully ranked.

# Question 12

A dataset stores the monthly revenue of a company in dollars. This is an example of which type of attribute?

## Options

* Nominal
* Ordinal
* Interval
* Ratio

## Answer

✅ **Ratio**

> [!NOTE]
> **Reason**
>
> Revenue has a meaningful **true zero**, meaning a revenue of $0 indicates no revenue was generated. Ratios are also meaningful (e.g., $200,000 is twice $100,000), making it a **ratio attribute**.

# Question 13

Which of the following is an example of an ordinal attribute?

## Options

* Customer ID
* Product Price
* Education Level (High School, Bachelor's, Master's, PhD)
* Height

## Answer

✅ **Education Level (High School, Bachelor's, Master's, PhD)**

> [!NOTE]
> **Reason**
>
> **Ordinal attributes** have categories with a meaningful order but unequal differences between consecutive categories.
>
> Education levels naturally progress from High School to PhD, but the "distance" between levels is not numerically defined.

# Question 14

Which statement best describes an attribute?

## Options

* A single observation in a dataset.
* A collection of datasets.
* A characteristic used to describe an object.
* A relationship between two databases.

## Answer

✅ **A characteristic used to describe an object.**

> [!NOTE]
> **Reason**
>
> An **attribute** is a measurable property or characteristic of an object.
>
> For example:
>
> * Object: Employee
> * Attributes: Employee ID, Salary, Department, Experience

# Question 15

Which of the following datasets is best represented as transaction data?

## Options

* A hospital's patient demographic table
* A university's student enrollment records
* Online shopping carts containing purchased products
* Employee payroll records

## Answer

✅ **Online shopping carts containing purchased products**

> [!NOTE]
> **Reason**
>
> **Transaction data** consists of sets of items that occur together in a single event.
>
> Each shopping cart represents one transaction containing multiple purchased items, making it ideal for association rule mining.

# Question 16

Which of the following is an example of graph data?

## Options

* Product inventory stored in a spreadsheet
* Weather measurements collected hourly
* Airline routes connecting airports
* Monthly sales stored in a database table

## Answer

✅ **Airline routes connecting airports**

> [!NOTE]
> **Reason**
>
> **Graph data** models relationships between entities.
>
> * Nodes: Airports
> * Edges: Flight routes
>
> This structure naturally represents connectivity and relationships.

# Question 17

Which type of dataset stores information where the order of observations is important?

## Options

* Record Data
* Transaction Data
* Ordered Data
* Graph Data

## Answer

✅ **Ordered Data**

> [!NOTE]
> **Reason**
>
> In **ordered data**, the sequence of observations carries meaning.
>
> Examples include:
>
> * Daily stock prices
> * ECG signals
> * Temperature recorded every hour
>
> Changing the order changes the meaning of the data.

# Question 18

A dataset contains customer names, phone numbers, and addresses. Which attribute is most likely to be nominal?

## Options

* Address
* Age
* Annual Income
* Number of Purchases

## Answer

✅ **Address**

> [!NOTE]
> **Reason**
>
> An **address** identifies a location but has no meaningful numerical interpretation or ranking.
>
> Although addresses may contain numbers, they function as identifiers rather than quantitative measurements.

# Question 19

Which statement correctly distinguishes an object from an attribute?

## Options

* An object describes an attribute.
* An attribute is a complete dataset.
* An object represents an entity, while attributes describe its properties.
* Objects only exist in graph databases.

## Answer

✅ **An object represents an entity, while attributes describe its properties.**

> [!NOTE]
> **Reason**
>
> Objects represent the entities being studied, whereas attributes store information about those entities.
>
> Example:
>
> * Object: Car
> * Attributes: Make, Model, Year, Color, Mileage

# Question 20

Why are identifiers such as Student ID or Employee ID generally not considered useful predictive features for machine learning?

## Options

* They are always missing values.
* They are categorical ordinal variables.
* They uniquely identify records but usually contain no predictive information.
* They are ratio attributes.

## Answer

✅ **They uniquely identify records but usually contain no predictive information.**

> [!NOTE]
> **Reason**
>
> Identifiers such as **Student ID**, **Customer ID**, or **Employee ID** are designed to uniquely distinguish records rather than describe meaningful characteristics.
>
> Since these values generally have no relationship to the target variable, they are typically excluded from predictive modeling unless they encode additional business information.
