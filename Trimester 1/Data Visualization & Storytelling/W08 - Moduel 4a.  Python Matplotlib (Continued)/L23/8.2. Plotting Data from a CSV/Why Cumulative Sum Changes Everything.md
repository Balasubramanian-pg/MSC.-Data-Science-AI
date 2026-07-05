# Why Cumulative Sum Changes Everything

Without cumulative sum:

```python
df.plot()
```

you see random noise.

With cumulative sum:

```python
df.cumsum().plot()
```

you observe trajectories.

This creates trend-like behavior.
