import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score

## 1. Simulate Historical Customer Data
np.random.seed(42)
n_samples = 1000

## Features: [Days_Since_Last_Ride, Total_Rides_Last_Month, App_Opens_Last_Week]
X = np.random.normal(loc=[15, 10, 5], scale=[5, 3, 2], size=(n_samples, 3))

## Ground truth generation: Higher days since last ride + lower engagement = higher churn probability
logits = 0.5 * X[:, 0] - 0.8 * X[:, 1] - 1.2 * X[:, 2]
probabilities = 1 / (1 + np.exp(-logits))
y = (probabilities > 0.5).astype(int) # 1 = Churn, 0 = Retain

## 2. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

## 3. Initialize and Train the Predictive Engine
clf = LogisticRegression()
clf.fit(X_train, y_train)

## 4. Inference and Evaluation
y_pred = clf.predict(X_test)
y_prob = clf.predict_proba(X_test)[:, 1]

print("Classification Performance Engine:")
print(f"Accuracy:  {accuracy_score(y_test, y_pred):.4f}")
print(f"Precision: {precision_score(y_test, y_pred):.4f}")
print(f"Recall:    {recall_score(y_test, y_pred):.4f}")

## Simulating a production decision: Push a $10 coupon if Churn probability > 70%
sample_user = np.array([[20, 2, 1]]) # 20 days since ride, 2 rides last month, 1 app open
churn_risk = clf.predict_proba(sample_user)[0][1]

print(f"\nProduction Rule Engine:")
if churn_risk > 0.70:
    print(f"User Churn Risk: {churn_risk:.2%}. ACTION: Trigger Coupon Push.")
else:
    print(f"User Churn Risk: {churn_risk:.2%}. ACTION: Do nothing.")
