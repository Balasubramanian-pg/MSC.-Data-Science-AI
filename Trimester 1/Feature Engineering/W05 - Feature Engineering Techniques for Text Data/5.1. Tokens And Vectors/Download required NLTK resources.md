# Download required NLTK resources

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

def clean_text(text: str) -> str:
    """
    Performs basic text cleaning: tokenization, alphabetic filtering, 
    lowercasing, and stopword removal.
    """
    # 1. Tokenize
    tokens = word_tokenize(text)
    
    # 2. Filter: keep only alphabetic words, lowercase, remove stopwords
    stop_words = set(stopwords.words('english'))
    cleaned_tokens = [
        word.lower() for word in tokens 
        if word.isalpha() and word.lower() not in stop_words
    ]
    
    # 3. Rejoin into a clean string
    return " ".join(cleaned_tokens)

def build_text_classification_pipeline():
    # 1. Load a subset of the 20 Newsgroups dataset for performance
    categories = ['rec.sport.hockey', 'comp.sys.ibm.pc.hardware']
    dataset = fetch_20newsgroups(
        subset='all', 
        categories=categories, 
        random_state=42
    )
    
    # Use a smaller sample (2000 records) as per transcript example
    sample_size = 2000
    texts = dataset.data[:sample_size]
    labels = dataset.target[:sample_size]
    
    print(f"Original dataset shape: {len(texts)} documents")
    
    # 2. Apply text cleaning
    print("Cleaning text...")
    cleaned_texts = [clean_text(doc) for doc in texts]
    
    # 3. TF-IDF Vectorization
    # max_features=3000 limits the vocabulary to the top 3000 most frequent terms
    vectorizer = TfidfVectorizer(max_features=3000, ngram_range=(1, 2))
    X_sparse = vectorizer.fit_transform(cleaned_texts)
    
    print(f"TF-IDF Matrix Shape: {X_sparse.shape}")
    print(f"Sparsity: {100 * (1 - X_sparse.nnz / (X_sparse.shape[0] * X_sparse.shape[1])):.2f}%")
    
    # 4. Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X_sparse, labels, test_size=0.2, random_state=42
    )
    
    # 5. Train Logistic Regression Classifier
    print("Training Logistic Regression...")
    clf = LogisticRegression(max_iter=1000, random_state=42)
    clf.fit(X_train, y_train)
    
    # 6. Evaluate
    y_pred = clf.predict(X_test)
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=dataset.target_names))
    
    return vectorizer, clf
