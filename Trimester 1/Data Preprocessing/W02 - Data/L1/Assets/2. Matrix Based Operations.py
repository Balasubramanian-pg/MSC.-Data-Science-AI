import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

## 1. Raw Data: Unstructured News Documents
news_corpus = [
    "The cricket team won the world cup match.",          # Sports
    "The football coach praised the team defense.",       # Sports
    "The stock market crashed due to high inflation.",    # Finance
    "Inflation rates are affecting the global market."    # Finance
]

## 2. Convert to Term-Document Matrix (Bag of Words)
vectorizer = CountVectorizer(stop_words='english')
term_doc_matrix = vectorizer.fit_transform(news_corpus)

## 3. Create a structured Pandas DataFrame
df_term_doc = pd.DataFrame(
    term_doc_matrix.toarray(), 
    columns=vectorizer.get_feature_names_out(),
    index=['Doc1_Sports', 'Doc2_Sports', 'Doc3_Finance', 'Doc4_Finance']
)

print("Term-Document Matrix (Raw Frequencies):")
print(df_term_doc)
print("\n")

## 4. Measuring Similarity (Applying Math to the Matrix)
## How similar is Doc1 to Doc2 vs Doc3?
## We use Cosine Similarity for sparse text vectors
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(news_corpus)

similarity_matrix = cosine_similarity(tfidf_matrix)
print("Cosine Similarity Matrix between Documents:")
print(pd.DataFrame(
    similarity_matrix, 
    index=['Doc1', 'Doc2', 'Doc3', 'Doc4'], 
    columns=['Doc1', 'Doc2', 'Doc3', 'Doc4']
).round(2))

## Expected Output Interpretation:
## Doc1 and Doc2 will have high similarity (~0.14+).
## Doc1 and Doc3 will have 0.0 similarity (orthogonal vectors).
