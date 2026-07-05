# Encoding Problems

Some files fail because of text encoding mismatches.

Common fix:

```python
pd.read_csv(url, encoding='latin1')
```
