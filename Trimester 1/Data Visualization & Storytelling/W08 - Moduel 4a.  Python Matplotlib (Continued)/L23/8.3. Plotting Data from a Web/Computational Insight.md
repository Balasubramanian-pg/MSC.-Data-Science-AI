# Computational Insight

Pandas does not load data lazily.

```python
pd.read_csv()
```

loads everything into memory.

This becomes dangerous with:

- large climate datasets
    
- market tick data
    
- log systems
    

Alternatives for large-scale systems:

|Tool|Use Case|
|---|---|
|Dask|distributed Pandas|
|Polars|high-performance DataFrames|
|Spark|cluster-scale analytics|
