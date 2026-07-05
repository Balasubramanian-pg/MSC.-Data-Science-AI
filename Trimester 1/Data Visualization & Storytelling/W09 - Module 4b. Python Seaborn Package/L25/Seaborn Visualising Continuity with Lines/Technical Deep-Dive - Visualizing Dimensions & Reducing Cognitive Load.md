# Technical Deep-Dive: Visualizing Dimensions & Reducing Cognitive Load

### 1. Understanding Statistical Aggregation & Confidence Intervals (CIs)

When you map `x="timepoint"` and `y="signal"`, your dataframe contains _multiple_ observations per timepoint (e.g., 10 different subjects at timepoint 18).

- **The Solid Line:** Seaborn automatically groups these points and plots their **mathematical mean ($\mu$)**.
    
- **The Shaded Translucent Band:** Represents the **95% Confidence Interval**.
    
    - **Wide Band:** High data dispersion/variance (the data points are widely spread out).
        
    - **Narrow Band:** High data packing/precision (the data points are tightly clustered together around the mean).
        

### 2. Refactored Python Implementation

Python

```
import matplotlib.pyplot as plt
import seaborn as sns
