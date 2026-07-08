# Why Different Feature Scales are Dangerous

The lecture strongly emphasizes that unequal feature scales distort machine learning behavior.

Example:

|Feature Type|Magnitude|
|---|---|
|Single Digit|1–9|
|Double Digit|10–99|
|Five Digit|10,000–100,000|

Suppose one feature ranges from:

$$
0 \to 1
$$

while another ranges from:

$$
0 \to 1,000,000
$$

The second attribute dominates most mathematical operations simply because its magnitude is larger.
