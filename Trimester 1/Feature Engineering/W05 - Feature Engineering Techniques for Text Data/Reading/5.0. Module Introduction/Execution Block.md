# Execution Block

if __name__ == "__main__":
    corpus = [
        "Machine learning is a subset of artificial intelligence.",
        "Deep learning utilizes neural networks with many layers.",
        "Natural language processing deals with text and speech data.",
        "Artificial intelligence aims to create intelligent machines.",
        "I love eating pizza and pasta on weekends."
    ]
    
    pipeline = TextFeatureEngineeringPipeline(max_features=5000, ngram_range=(1, 2))
    tfidf_matrix = pipeline.fit_transform(corpus)
    
    # Compute similarity between the first 4 documents (tech-related) and the 5th (food-related)
    tech_docs = tfidf_matrix[:4]
    food_doc = tfidf_matrix[4:]
    
    similarities = pipeline.compute_cosine_similarity_sparse(tech_docs, food_doc)
    
    print("\nCosine Similarities (Tech Docs vs. Food Doc):")
    for i, sim in enumerate(simibilities.flatten()):
        print(f"Doc {i+1} vs Food Doc: {sim:.4f}")
```
