
<img width="569" height="663" alt="image" src="https://github.com/user-attachments/assets/2726b4d4-43b9-4e26-ad41-c6c9125ac2ff" />

# Question 1

In a university database that is structured as a table, the information for a single student (e.g., their name, ID, and major) would represent a single ____________.

## Options

* Object
* Dataset
* Attribute
* Database

## Answer

✅ **Object**

> [!NOTE]
> **Reason**
>
> In record-based data, an **object** (also called an instance, entity, or record) represents a single real-world entity. In this example, one student along with all their associated information (name, ID, major, etc.) constitutes a single object.
>
> A dataset contains many objects, while attributes describe the characteristics of those objects.

# Question 2

A column in a dataset that represents a specific characteristic, such as 'Taxable Income', is called an:

## Options

* Record
* Attribute
* Data Point
* Object

## Answer

✅ **Attribute**

> [!NOTE]
> **Reason**
>
> An **attribute** is a property or characteristic describing an object. In tabular data, attributes are represented as columns.
>
> For example:
>
> * Object: Student
> * Attributes: Name, Age, Major, GPA
>
> Therefore, "Taxable Income" is an attribute.

# Question 3

A dataset representing a social network, where the primary focus is on the friendships (connections) between people (objects), is best represented as record data.

## Options

* True
* False

## Answer

✅ **False**

> [!NOTE]
> **Reason**
>
> Social networks are primarily concerned with the **relationships or connections** between entities. Such data is more appropriately represented as **graph data**, where:
>
> * **Nodes** represent people.
> * **Edges** represent friendships or connections.
>
> Record data focuses on independent objects and their attributes, whereas graph data explicitly models relationships between objects.


<img width="563" height="610" alt="image" src="https://github.com/user-attachments/assets/2b37efb4-ec11-46e0-972e-7be51663e4a0" />

# Question 4

Which two of the following attributes are examples of quantitative (numeric) data? Select all that apply.

## Options

* The number of items in a customer's shopping cart
* A student's grade (e.g., 'A', 'B', 'C')
* A person's eye colour (e.g., 'Blue', 'Brown', 'Green')
* The temperature in Celsius

## Answer

✅ **The number of items in a customer's shopping cart**
✅ **The temperature in Celsius**

> [!NOTE]
> **Reason**
>
> **Quantitative data** represents measurable numeric quantities on which mathematical operations can be performed.
>
> * **Number of items in a shopping cart** → Quantitative (discrete numeric data)
> * **Temperature in Celsius** → Quantitative (continuous numeric data)
> * **Student grades ('A', 'B', 'C')** → Categorical ordinal data
> * **Eye colour** → Categorical nominal data

# Question 5

Raw, unorganised facts and figures, such as a list of student names and final scores, are considered "knowledge."

## Options

* True
* False

## Answer

✅ **False**

> [!NOTE]
> **Reason**
>
> Raw, unprocessed facts and figures are referred to as **data**, not knowledge.
>
> The hierarchy is typically:
>
> * **Data** → Raw facts and observations
> * **Information** → Processed and organized data
> * **Knowledge** → Insights, understanding, and actionable interpretation derived from information

# Question 6

An attribute such as customer satisfaction rated on a scale of {Very Dissatisfied, Dissatisfied, Neutral, Satisfied, Very Satisfied} is an example of what type of attribute?

## Options

* Ratio
* Interval
* Ordinal
* Nominal

## Answer

✅ **Ordinal**

> [!NOTE]
> **Reason**
>
> **Ordinal attributes** represent categories that have a meaningful order or ranking, but the differences between adjacent categories are not necessarily equal or measurable.
>
> In the satisfaction scale:
>
> **Very Dissatisfied < Dissatisfied < Neutral < Satisfied < Very Satisfied**
>
> The categories have a clear ordering, making this an **ordinal** attribute.

<img width="573" height="637" alt="image" src="https://github.com/user-attachments/assets/c581dc66-4b5a-4967-99ca-bf4df05cd085" />

# Question 7

In a standard dataset, what is a "data object" also known as?

## Options

* A record, sample, instance, or point
* An attribute, feature, or dimension
* A collection of multiple datasets
* A piece of knowledge derived from the data

## Answer

✅ **A record, sample, instance, or point**

> [!NOTE]
> **Reason**
>
> A **data object** refers to a single entity or observation in a dataset. Depending on the context, it may also be called a **record**, **sample**, **instance**, or **data point**.
>
> For example, in a student dataset, each student's row represents one data object.

# Question 8

Data from a grocery store where each record consists of the set of all products purchased by a customer in a single shopping trip is known as:

## Options

* transaction data
* document data
* ordered data
* a data matrix

## Answer

✅ **transaction data**

> [!NOTE]
> **Reason**
>
> **Transaction data** consists of records where each entry contains a set of items occurring together in a single event or transaction.
>
> A classic example is **market basket analysis**, where each shopping trip contains the collection of products purchased by a customer.

# Question 9

Which of the following best describes the relationship between an object and its attributes?

## Options

* An object is described by a collection of attributes.
* An attribute is described by a collection of objects.
* An object is another name for a dataset.
* Objects and attributes are completely independent of each other.

## Answer

✅ **An object is described by a collection of attributes.**

> [!NOTE]
> **Reason**
>
> In data mining and machine learning, an **object** (or instance) represents an entity, while **attributes** (or features) describe the properties of that entity.
>
> For example:
>
> * Object: Customer
> * Attributes: Age, Income, Gender, Purchase Amount
>
> Thus, an object is characterized by a collection of attributes.


<img width="575" height="219" alt="image" src="https://github.com/user-attachments/assets/0df8da0c-25c0-4269-b773-218f4219cbb9" />

# Question 10

What is the key difference between an interval attribute and a ratio attribute?

## Options

* The difference between values is meaningful for ratio attributes but not for interval attributes.
* Interval attributes have order, while ratio attributes do not.
* Interval attributes are qualitative, while ratio attributes are quantitative.
* Ratio attributes have a true zero point, while interval attributes do not.

## Answer

✅ **Ratio attributes have a true zero point, while interval attributes do not.**

> [!NOTE]
> **Reason**
>
> Both **interval** and **ratio** attributes are quantitative and have meaningful differences between values. The crucial distinction is the presence of a **true (absolute) zero**.
>
> * **Interval attributes** have an arbitrary zero point. Example: **Temperature in Celsius**. A temperature of 0°C does not mean the absence of temperature.
> * **Ratio attributes** have a true zero, indicating the complete absence of the measured quantity. Example: **Weight, Height, Age, Income**.
>
> Because ratio attributes have a true zero, statements such as "twice as much" are meaningful for ratio data but not for interval data.
