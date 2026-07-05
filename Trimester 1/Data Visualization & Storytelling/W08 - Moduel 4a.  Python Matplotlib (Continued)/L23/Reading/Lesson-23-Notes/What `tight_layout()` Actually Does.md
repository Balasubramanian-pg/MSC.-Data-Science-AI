# What `tight_layout()` Actually Does

Internally, Matplotlib computes:

- bounding boxes
    
- text dimensions
    
- subplot geometry
    
- padding requirements
    

Then it automatically repositions elements to minimize collisions.

This is fundamentally a geometric optimization process.
