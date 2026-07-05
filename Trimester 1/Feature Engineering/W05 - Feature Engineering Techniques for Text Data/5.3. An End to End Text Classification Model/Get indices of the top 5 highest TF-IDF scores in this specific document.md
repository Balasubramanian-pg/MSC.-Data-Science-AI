# Get indices of the top 5 highest TF-IDF scores in this specific document

top_k = 5
top_indices = dense_vector.argsort()[-top_k:][::-1]

print(f"\n=== TOP {top_k} TF-IDF WORDS IN DOCUMENT ===")
for idx in top_indices:
    if dense_vector[idx] > 0:
        print(f"Feature: {feature_names[idx]:<12} | TF-IDF Score: {dense_vector[idx]:.4f}")
