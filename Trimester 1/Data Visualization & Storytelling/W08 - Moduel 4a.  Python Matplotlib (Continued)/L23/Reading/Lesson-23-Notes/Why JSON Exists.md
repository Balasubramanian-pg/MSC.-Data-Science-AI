# Why JSON Exists

CSV is excellent for flat tabular data.

But real systems often contain nested structures.

Example:

```json
{
  "name": "Alice",
  "scores": {
    "math": 90,
    "science": 85
  }
}
```

CSV cannot naturally represent this hierarchy.

JSON can.
