# Smoothing by Bin Boundaries

Another approach is boundary smoothing.

Instead of replacing values with the mean, each value is replaced by the nearest boundary value.

Suppose the bin is:

|Values|
|---|
|4|
|8|
|15|

Boundaries:

|Lower Boundary|Upper Boundary|
|---|---|
|4|15|

Now evaluate 8:

$$
|8-4| = 4
$$

$$
|15-8| = 7
$$

Since 8 is closer to 4, it gets replaced with 4.

This method compresses internal variation while preserving edge structure.
