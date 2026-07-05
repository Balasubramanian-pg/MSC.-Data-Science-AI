# Execution Block

if __name__ == "__main__":
    extractor = ContextualEmbeddingExtractor()
    
    text1 = "I went to the bank to withdraw money."
    text2 = "I sat by the river bank to fish."
    
    vec1 = extractor.get_word_embedding(text1, "bank")
    vec2 = extractor.get_word_embedding(text2, "bank")
    
    # Compute Cosine Similarity
    similarity = np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
    
    print(f"Context 1: {text1}")
    print(f"Context 2: {text2}")
    print(f"Cosine Similarity of 'bank' across contexts: {similarity:.4f}")
    print("Note: A similarity significantly less than 1.0 proves the vectors are context-aware.")
```
