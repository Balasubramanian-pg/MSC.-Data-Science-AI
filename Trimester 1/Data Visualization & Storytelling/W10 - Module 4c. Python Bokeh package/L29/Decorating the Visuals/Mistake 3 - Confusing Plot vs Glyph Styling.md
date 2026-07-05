# Mistake 3: Confusing Plot vs Glyph Styling

Example confusion:

```python
plot.background_fill_color
```

affects:

- whole plot
    

NOT:

- individual points
    

Whereas:

```python
fill_color
```

inside scatter affects:

- markers only
