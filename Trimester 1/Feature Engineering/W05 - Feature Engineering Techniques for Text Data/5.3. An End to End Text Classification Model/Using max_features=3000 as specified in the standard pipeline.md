# Using max_features=3000 as specified in the standard pipeline

vectorizer = TfidfVectorizer(max_features=3000, stop_words='english')
X = vectorizer.fit_transform(cleaned_corpus)
y = np.array(labels)
