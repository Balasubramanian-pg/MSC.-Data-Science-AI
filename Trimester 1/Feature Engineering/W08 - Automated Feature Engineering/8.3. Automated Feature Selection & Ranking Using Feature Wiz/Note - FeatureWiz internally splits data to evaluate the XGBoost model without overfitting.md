# Note: FeatureWiz internally splits data to evaluate the XGBoost model without overfitting

X_train_selected, y_train_selected = fwiz.fit_transform(X_train, y_train)
