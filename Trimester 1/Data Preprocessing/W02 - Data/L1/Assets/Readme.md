
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

# Question 21

Which type of data is best represented using a document data model?

## Options

* Bank account balances
* Product inventory counts
* News articles and research papers
* Student GPA records

## Answer

✅ **News articles and research papers**

> [!NOTE]
> **Reason**
>
> **Document data** consists of textual information where each object is an entire document rather than a fixed set of attributes.
>
> Examples include:
>
> * News articles
> * Research papers
> * Books
> * Emails

# Question 22

Which of the following is an example of interval data?

## Options

* Weight in kilograms
* Temperature in Celsius
* Number of children
* Annual Salary

## Answer

✅ **Temperature in Celsius**

> [!NOTE]
> **Reason**
>
> Interval data has equal intervals between values but **does not have a true zero**.
>
> For example:
>
> * 20°C is 10 degrees warmer than 10°C.
> * However, 20°C is **not twice as hot** as 10°C because zero is arbitrary.

# Question 23

A dataset where each row represents a customer and each column represents a feature is commonly known as a:

## Options

* Graph
* Transaction Set
* Data Matrix
* Decision Tree

## Answer

✅ **Data Matrix**

> [!NOTE]
> **Reason**
>
> A **data matrix** organizes information into rows and columns.
>
> * Rows represent objects or observations.
> * Columns represent attributes or features.
>
> This is the most common representation used in machine learning.

# Question 24

Which of the following is an example of continuous quantitative data?

## Options

* Number of students in a classroom
* Number of cars owned
* Temperature measured throughout the day
* Number of books on a shelf

## Answer

✅ **Temperature measured throughout the day**

> [!NOTE]
> **Reason**
>
> **Continuous data** can take any value within a range.
>
> Temperature may be measured as 22.3°C, 22.35°C, or 22.351°C, making it a continuous quantitative variable.

# Question 25

Which of the following is an example of discrete quantitative data?

## Options

* Weight
* Height
* Number of customers entering a store
* Rainfall

## Answer

✅ **Number of customers entering a store**

> [!NOTE]
> **Reason**
>
> **Discrete quantitative data** consists of countable values.
>
> Customer count can only be whole numbers such as 10, 11, or 12 and cannot take fractional values.

# Question 26

Which statement about graph data is TRUE?

## Options

* Graph data cannot represent relationships.
* Graph data stores only numerical values.
* Graph data explicitly models entities and their relationships.
* Graph data is always stored in spreadsheets.

## Answer

✅ **Graph data explicitly models entities and their relationships.**

> [!NOTE]
> **Reason**
>
> Graph data consists of:
>
> * **Nodes** representing entities.
> * **Edges** representing relationships.
>
> This representation is widely used in social networks, recommendation systems, transportation networks, and fraud detection.

# Question 27

Which of the following is NOT considered a quantitative attribute?

## Options

* Annual Income
* Age
* Product Category
* Distance Travelled

## Answer

✅ **Product Category**

> [!NOTE]
> **Reason**
>
> **Product Category** contains labels such as Electronics, Furniture, or Clothing. These labels represent categories rather than measurable numerical quantities, making the attribute **nominal**.

# Question 28

A supermarket wants to discover which products are frequently purchased together. Which data representation is most appropriate?

## Options

* Graph Data
* Transaction Data
* Time Series Data
* Image Data

## Answer

✅ **Transaction Data**

> [!NOTE]
> **Reason**
>
> Each shopping basket is a transaction containing multiple purchased items.
>
> Transaction data is commonly analyzed using **association rule mining** and **market basket analysis** to discover purchasing patterns.

# Question 29

Which of the following is an example of time-series (ordered) data?

## Options

* Monthly electricity consumption
* Employee names
* Customer addresses
* Product descriptions

## Answer

✅ **Monthly electricity consumption**

> [!NOTE]
> **Reason**
>
> Time-series data consists of observations collected over time where the sequence matters.
>
> Monthly electricity consumption is naturally ordered by time and is commonly analyzed for trends and forecasting.

# Question 30

Which attribute type best represents blood groups (A, B, AB, O)?

## Options

* Ratio
* Interval
* Ordinal
* Nominal

## Answer

✅ **Nominal**

> [!NOTE]
> **Reason**
>
> Blood groups are categories without any natural ordering.
>
> Since no blood group is greater or smaller than another, they are classified as **nominal attributes**.

# Question 31

Which of the following is an example of a ratio attribute?

## Options

* Calendar Year
* Temperature in Celsius
* Distance between two cities
* Customer Satisfaction Rating

## Answer

✅ **Distance between two cities**

> [!NOTE]
> **Reason**
>
> Distance has a **true zero**, meaning zero distance indicates that two locations coincide.
>
> Ratios are meaningful, so a distance of 200 km is twice that of 100 km.

# Question 32

Which statement about record data is TRUE?

## Options

* Record data focuses on relationships between entities.
* Record data stores objects independently using a fixed set of attributes.
* Record data only contains text documents.
* Record data cannot be stored in relational databases.

## Answer

✅ **Record data stores objects independently using a fixed set of attributes.**

> [!NOTE]
> **Reason**
>
> In **record data**, each row represents an independent object described by the same set of attributes.
>
> Relational databases are the most common implementation of record-based data.

# Question 33

Why is choosing the correct attribute type important in data analysis?

## Options

* It determines the programming language to use.
* It helps select appropriate statistical methods and machine learning algorithms.
* It automatically improves data quality.
* It reduces database storage requirements.

## Answer

✅ **It helps select appropriate statistical methods and machine learning algorithms.**

> [!NOTE]
> **Reason**
>
> Different attribute types require different analytical techniques.
>
> For example:
>
> * Correlation measures depend on variable types.
> * Distance metrics vary for categorical and numerical data.
> * Machine learning preprocessing differs for nominal, ordinal, interval, and ratio variables.

# Question 34

Which of the following best describes a feature in machine learning?

## Options

* A prediction generated by a model
* An attribute used as input to a machine learning algorithm
* A collection of multiple datasets
* The final evaluation metric

## Answer

✅ **An attribute used as input to a machine learning algorithm**

> [!NOTE]
> **Reason**
>
> A **feature** is simply an attribute or variable used by a machine learning model to learn patterns from data.
>
> Features become the model's input, while the target variable represents the desired output.

# Question 35

A company stores customer information in a table containing Customer ID, Age, Income, and Purchase Amount. How many objects are represented if the table contains 5,000 rows?

## Options

* 4
* 5,000
* 20,000
* Cannot be determined

## Answer

✅ **5,000**

> [!NOTE]
> **Reason**
>
> In a tabular dataset:
>
> * **Rows** represent **objects (records or instances)**.
> * **Columns** represent **attributes (features)**.
>
> Therefore, a table with **5,000 rows** contains **5,000 distinct objects**, regardless of the number of attributes.
