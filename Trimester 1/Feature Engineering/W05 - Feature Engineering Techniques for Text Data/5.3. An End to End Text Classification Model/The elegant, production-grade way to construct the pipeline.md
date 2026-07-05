# The elegant, production-grade way to construct the pipeline

text_clf_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=3000, stop_words='english')),
    ('clf', LogisticRegression(multi_class='multinomial'))
])
