# Breakdown

|Part|Meaning|
|---|---|
|`3,1`|3 rows, 1 column|
|`sharex=True`|all plots use same x-axis|
|`fig`|overall figure container|
|`axes`|list of subplot axes|

The transcript explicitly explains:

> first value = rows  
> second value = columns

So:

```python
plt.subplots(3,1)
```

means:

```text
Plot 1
Plot 2
Plot 3
```

not side-by-side.
