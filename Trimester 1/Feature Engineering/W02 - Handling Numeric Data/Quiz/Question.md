# Question

**Why is feature scaling critical for distance-based models such as KNN or KMeans?**

### Options

* It helps convert categorical variables to numerical ones.
* It ensures no single feature dominates the distance metric.
* It removes all outliers.
* It reduces the number of features used.

### Answer

✅ **It ensures no single feature dominates the distance metric.**

> [!NOTE]
> **Reason**
>
> Distance-based algorithms compute similarity using measures such as Euclidean distance.
>
> If one feature has a much larger scale than others, it can dominate the distance calculation and bias the model.
>
> Feature scaling ensures that all features contribute more fairly to the distance computation.
