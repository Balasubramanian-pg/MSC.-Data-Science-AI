# Important Design Principle

The instructor briefly mentioned:

> "visualization guidelines"

This matters more than syntax.

A technically correct plot can still be:

- misleading
    
- unreadable
    
- cognitively exhausting
    

Good visualization balances:

- information density
    
- contrast
    
- hierarchy
    
- readability
    

Not decoration.

This section explains one of the most important ideas in Bokeh:

> Everything in the plot is an object with editable properties.

You create a figure once, then modify parts of it incrementally.

This is object-oriented visualization design.
