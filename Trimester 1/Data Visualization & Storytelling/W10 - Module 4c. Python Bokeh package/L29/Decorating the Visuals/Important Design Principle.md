# Important Design Principle

The instructor accidentally demonstrates something important:

```text
Plots are stateful
```

Meaning:

- once glyphs are added
    
- they persist in the figure object
    

This is why rerunning cells in notebooks can produce unexpected layered results.
