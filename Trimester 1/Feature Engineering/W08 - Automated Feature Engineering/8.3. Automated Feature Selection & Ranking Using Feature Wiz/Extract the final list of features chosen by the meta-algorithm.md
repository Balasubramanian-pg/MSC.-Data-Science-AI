# Extract the final list of features chosen by the meta-algorithm

optimal_feature_list = fwiz.features
print(f"Reduced feature space from {X_train.shape[1]} to {len(optimal_feature_list)} features.")
```
