# Discriminatory Features vs Large Magnitude Features

A major conceptual insight from the lecture is:

> Informative features are not always high-magnitude features.

In the example:

|Feature|True Discrimination|
|---|---|
|Height|High|
|Income|Lower|

However, income dominates distance calculations purely because:

$$
Magnitude_{income} \gg Magnitude_{height}
$$

Normalization corrects this imbalance.
