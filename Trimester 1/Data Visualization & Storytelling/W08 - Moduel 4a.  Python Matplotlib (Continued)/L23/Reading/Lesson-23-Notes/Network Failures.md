# Network Failures

URLs may fail.

Always handle exceptions.

```python
try:
    df = pd.read_csv(url)
except Exception as e:
    print(e)
```
