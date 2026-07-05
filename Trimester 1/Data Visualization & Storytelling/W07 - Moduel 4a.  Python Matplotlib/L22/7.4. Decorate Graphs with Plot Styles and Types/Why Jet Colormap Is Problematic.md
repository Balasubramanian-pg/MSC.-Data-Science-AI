# Why Jet Colormap Is Problematic

Older systems often used:

```python
cmap='jet'
```

This is now discouraged.

Reason:

Jet creates artificial boundaries where none exist.

It exaggerates gradients psychologically.

Viridis avoids this issue.
