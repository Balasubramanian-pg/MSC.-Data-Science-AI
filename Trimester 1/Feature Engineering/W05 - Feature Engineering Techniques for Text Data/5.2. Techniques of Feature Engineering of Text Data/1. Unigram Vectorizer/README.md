# 1. Unigram Vectorizer

unigram_vectorizer = CountVectorizer(ngram_range=(1, 1))
X_uni = unigram_vectorizer.fit_transform(corpus)
