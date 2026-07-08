# Euclidean Distance and Feature Bias

The lecture demonstrates this problem using Euclidean distance.

Suppose:

|Data Point|Height|Income|
|---|---|---|
|D1|1|150|
|D2|2|1100|
|D3|1|100|

Distance between D3 and D1:

d(D3,D1)=\sqrt{(1-1)^2+(100-150)^2}

Distance between D3 and D2:

d(D3,D2)=\sqrt{(1-2)^2+(100-1100)^2}

Even though height is more discriminatory, income dominates because its magnitude is larger.

This creates biased similarity calculations.
