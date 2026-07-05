# Advanced Version

You can directly parse and index in one pipeline:

```python
df_weather = (
    pd.read_csv(
        url,
        parse_dates=['date']
    )
    .set_index('date')
)
```

Cleaner.  
More production-grade.
