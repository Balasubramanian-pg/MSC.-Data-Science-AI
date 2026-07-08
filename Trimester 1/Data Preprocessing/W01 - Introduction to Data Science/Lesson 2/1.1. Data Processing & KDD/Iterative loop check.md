# Iterative loop check

if acc < 0.75:
    print("\n[WARNING] Knowledge extraction failed to answer the question sufficiently.")
    print("Action: Must reiterate. Need to revisit Data Selection (add wind_direction back) or change ML model.")
else:
    print("\n[SUCCESS] Pipeline successfully extracted actionable patterns.")
```
