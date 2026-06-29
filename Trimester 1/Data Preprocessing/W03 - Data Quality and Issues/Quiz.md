
<img width="601" height="657" alt="image" src="https://github.com/user-attachments/assets/5ee93f52-f8c0-456a-a5df-44f2a174c4f1" />
# Question 1

An outlier is always considered an error or a corruption of data that must be removed.

## Options

* True
* False

## Answer

✅ **False**

> [!NOTE]
> **Reason**
>
> Not all outliers are errors. Some outliers represent **genuine rare events** or important business phenomena. For example, a customer making an unusually large purchase may be a legitimate observation rather than bad data.
>
> Outliers should be investigated before deciding whether to remove, transform, or retain them.

# Question 2

A dataset uses the date "January 1" for any person whose actual birthday is unknown. This is a particularly dangerous data quality issue known as:

## Options

* disguised missing data.
* noisy data.
* an outlier.
* an entity identification problem.

## Answer

✅ **disguised missing data.**

> [!NOTE]
> **Reason**
>
> **Disguised missing data** occurs when missing values are replaced with seemingly valid values such as `"January 1"`, `"999"`, or `"Unknown"`. These placeholder values can distort analyses because they appear legitimate while actually representing missing information.

# Question 3

What is the primary cause of duplicate data issues in a dataset?

## Options

* A user forgetting to enter a value for an attribute.
* A faulty sensor providing incorrect readings.
* Merging data from multiple, heterogeneous sources that have overlapping records.
* A data point that is legitimate but highly unusual compared to others.

## Answer

✅ **Merging data from multiple, heterogeneous sources that have overlapping records.**

> [!NOTE]
> **Reason**
>
> Duplicate records commonly arise when integrating data from multiple systems that describe the same real-world entities differently. Without proper entity resolution and deduplication processes, overlapping records can create duplicates in the consolidated dataset.

<img width="581" height="426" alt="image" src="https://github.com/user-attachments/assets/bed2a881-1753-40f7-a76f-297cdf26a4dc" />
