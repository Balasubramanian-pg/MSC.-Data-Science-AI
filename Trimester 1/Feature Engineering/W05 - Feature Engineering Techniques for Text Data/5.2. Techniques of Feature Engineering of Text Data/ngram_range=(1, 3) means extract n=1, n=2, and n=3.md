# ngram_range=(1, 3) means extract n=1, n=2, and n=3

ngram_vectorizer = CountVectorizer(ngram_range=(1, 3))
X_ngram = ngram_vectorizer.fit_transform(corpus)

print(f"Unigram Feature Matrix Shape: {X_uni.shape}")
print(f"N-Gram Feature Matrix Shape: {X_ngram.shape}\n")
