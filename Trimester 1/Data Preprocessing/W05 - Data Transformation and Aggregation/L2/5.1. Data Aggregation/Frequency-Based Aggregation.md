# Frequency-Based Aggregation

Frequency counting itself is a major aggregation strategy.

Instead of storing repeated values individually:

$$
[5,5,5,5,5]
$$

store:

$$
(5,5)
$$

meaning:

|Value|Frequency|
|---|---|
|5|5|

This compresses repeated observations efficiently.
