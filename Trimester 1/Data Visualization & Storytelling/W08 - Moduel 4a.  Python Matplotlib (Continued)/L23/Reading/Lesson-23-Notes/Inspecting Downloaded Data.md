# Inspecting Downloaded Data

Immediately after loading remote data:

```python
print(df.info())
print(df.describe())
print(df.isnull().sum())
```

This is critically important.

Most beginners skip validation entirely.

That creates silent analytical corruption.
