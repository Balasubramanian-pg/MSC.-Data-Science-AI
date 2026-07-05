# Train a Logistic Regression classifier

clf = LogisticRegression(random_state=42, multi_class='multinomial', max_iter=1000)
clf.fit(X, y)
