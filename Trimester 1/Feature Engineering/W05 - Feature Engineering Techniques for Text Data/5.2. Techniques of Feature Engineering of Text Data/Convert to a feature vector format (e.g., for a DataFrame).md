# Convert to a feature vector format (e.g., for a DataFrame)

pos_features = pd.DataFrame([tag_counts]).fillna(0).astype(int)

print("\nEngineered POS Features for the Document:")
print(pos_features.to_markdown(index=False))
