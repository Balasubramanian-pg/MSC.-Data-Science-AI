# Visual Detection Using Box Plots

One of the most common visual methods for detecting outliers is the box plot.

A box plot summarizes the dataset using:

|Component|Meaning|
|---|---|
|Q1|First Quartile|
|Q2|Median|
|Q3|Third Quartile|
|IQR|Interquartile Range|
|Whiskers|Expected data spread|

The interquartile range is:

$$
IQR = Q3 - Q1
$$

Outlier boundaries are typically defined as:

Lower Bound = Q1 - 1.5(IQR)

Upper Bound = Q3 + 1.5(IQR)

Any point outside these whiskers becomes a potential outlier.

```mermaid
flowchart LR
    A[Lower Outliers]
    --> B[Lower Whisker]
    --> C[Box Plot Center]
    --> D[Upper Whisker]
    --> E[Upper Outliers]
```
