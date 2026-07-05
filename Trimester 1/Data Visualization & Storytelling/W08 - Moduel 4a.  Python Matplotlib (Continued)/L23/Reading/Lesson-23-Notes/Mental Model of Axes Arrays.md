# Mental Model of Axes Arrays

When using:

```python
fig, axes = plt.subplots(2,1)
```

Matplotlib creates:

```python
axes = [Axes0, Axes1]
```

Conceptually:

```mermaid
flowchart TD

A[Figure]

A --> B[axes 0]
A --> C[axes 1]
```

Each subplot is independently controllable.
