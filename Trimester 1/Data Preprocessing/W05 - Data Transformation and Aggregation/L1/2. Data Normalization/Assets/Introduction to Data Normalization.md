# Introduction to Data Normalization

Data normalization is one of the most important stages in data transformation because machine learning algorithms are highly sensitive to differences in feature scale.

The lecture emphasizes that real-world datasets often contain attributes measured across vastly different magnitudes.

Example:

|Feature|Possible Scale|
|---|---|
|Height|1–2 meters|
|Weight|50–200 kg|
|Income|10,000–10,00,000|

If these raw values are used directly, high-magnitude features dominate mathematical computations.

Normalization prevents this imbalance.
