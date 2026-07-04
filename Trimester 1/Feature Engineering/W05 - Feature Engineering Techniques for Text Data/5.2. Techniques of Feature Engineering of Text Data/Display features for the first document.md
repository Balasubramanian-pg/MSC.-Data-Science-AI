# Display features for the first document

vocab_ngrams = ngram_vectorizer.get_feature_names_out()
doc_1_vector = X_ngram.toarray()[0]

print("Document 1 ('machine learning is great') N-Gram Vector:")
for feature, count in zip(vocab_ngrams, doc_1_vector):
    if count > 0:
        print(f" - {feature}: {count}")
