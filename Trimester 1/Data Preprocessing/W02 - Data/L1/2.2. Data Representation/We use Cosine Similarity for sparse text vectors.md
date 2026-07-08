# We use Cosine Similarity for sparse text vectors

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(news_corpus)

similarity_matrix = cosine_similarity(tfidf_matrix)
print("Cosine Similarity Matrix between Documents:")
print(pd.DataFrame(
    similarity_matrix, 
    index=['Doc1', 'Doc2', 'Doc3', 'Doc4'], 
    columns=['Doc1', 'Doc2', 'Doc3', 'Doc4']
).round(2))
