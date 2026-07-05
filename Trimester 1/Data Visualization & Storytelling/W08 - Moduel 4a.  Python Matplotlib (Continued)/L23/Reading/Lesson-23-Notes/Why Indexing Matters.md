# Why Indexing Matters

In Pandas, indexes are not just row numbers.

Indexes define:

- lookup structure
    
- alignment behavior
    
- time-series semantics
    

Using dates as indexes enables powerful operations:

```python
df_weather.resample('M').mean()
```

or:

```python
df_weather.loc['2015']
```
