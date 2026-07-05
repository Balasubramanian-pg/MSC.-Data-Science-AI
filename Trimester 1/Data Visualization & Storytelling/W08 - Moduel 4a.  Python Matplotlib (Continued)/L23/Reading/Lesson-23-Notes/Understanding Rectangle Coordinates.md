# Understanding Rectangle Coordinates

The rectangle format:

```python
[left, bottom, right, top]
```

uses normalized coordinates:

$$
0 \to 1
$$

Where:

|Value|Meaning|
|---|---|
|0|Minimum boundary|
|1|Maximum boundary|

So:

```python
top = 0.96
```

means:

> leave 4% vertical space at the top.
