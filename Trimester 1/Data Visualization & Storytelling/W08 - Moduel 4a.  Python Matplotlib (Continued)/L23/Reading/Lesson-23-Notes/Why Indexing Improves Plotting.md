# Why Indexing Improves Plotting

When the date becomes the index:

```python
df_weather.index
```

Matplotlib automatically interprets the x-axis as temporal.

This enables:

- automatic tick spacing
    
- date formatting
    
- chronological scaling
    

Without indexing:

- plots become messy
    
- labels overlap
    
- temporal ordering may break
