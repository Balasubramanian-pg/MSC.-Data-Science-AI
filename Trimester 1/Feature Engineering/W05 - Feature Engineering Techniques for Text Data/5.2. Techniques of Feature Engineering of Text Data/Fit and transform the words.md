# Fit and transform the words

one_hot_vectors = encoder.fit_transform(words)
categories = encoder.categories_[0]

print(f"Categories discovered: {categories}\n")
for word, vector in zip(words.flatten(), one_hot_vectors):
    print(f"Word: {word:<10} | OHE Vector: {vector}")
