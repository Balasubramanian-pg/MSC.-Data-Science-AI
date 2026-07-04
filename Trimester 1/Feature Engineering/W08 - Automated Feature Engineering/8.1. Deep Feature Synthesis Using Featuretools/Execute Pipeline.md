# Execute Pipeline

feature_matrix, feature_definitions = build_featuretools_pipeline()

print(f"Generated Feature Matrix Shape: {feature_matrix.shape}")
print(f"Total Features Generated: {len(feature_definitions)}")
print("\nSample of Generated Features:")
print(feature_matrix[['age', 'orders.SUM(order_items.price)', 'orders.MEAN(shipping_cost)']].head())
```
