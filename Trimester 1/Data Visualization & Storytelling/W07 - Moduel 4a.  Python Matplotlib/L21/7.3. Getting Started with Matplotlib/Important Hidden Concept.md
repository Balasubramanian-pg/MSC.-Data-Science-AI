# Important Hidden Concept

The figure object:

```python
fig
```

contains the entire visualization canvas.

This is why saving happens through:

```python
fig.savefig()
```

rather than:

```python
ax.savefig()
```
