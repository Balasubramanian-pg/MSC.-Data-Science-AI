# Why Parse Dates?

Without parsing:

```python
'2012-01-01'
```

is just text.

With parsing:

```python
Timestamp('2012-01-01')
```

becomes a datetime object.

That enables:

- sorting
    
- filtering
    
- resampling
    
- time arithmetic
    
- time-series plotting
