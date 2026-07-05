# What `parse_dates` Does

This is critically important.

Without parsing:

```python
'2012-01-01'
```

is treated as plain text.

With parsing:

```python
Timestamp('2012-01-01')
```

becomes a true datetime object.

That enables:

- time-series plotting
    
- rolling averages
    
- resampling
    
- temporal grouping
    
- forecasting
