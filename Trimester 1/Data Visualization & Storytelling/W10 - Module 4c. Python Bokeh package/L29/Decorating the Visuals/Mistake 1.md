# Mistake 1

Using categories without `x_range`

Wrong:

```python
p = figure()
```

Correct:

```python
p = figure(x_range=fruits)
```
