import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

## 1. Simulate the Data Explosion (Drowning in Data)
## Generating 10,000 genuine transactions and 50 fraudulent ones
np.random.seed(42)

## Genuine transactions: Typical amounts and typical frequencies
genuine_amounts = np.random.normal(loc=500, scale=100, size=10000)
genuine_freq = np.random.normal(loc=5, scale=2, size=10000)

## Fraudulent transactions: Anomalously high amounts, unusual frequencies
fraud_amounts = np.random.uniform(low=5000, high=20000, size=50)
fraud_freq = np.random.uniform(low=20, high=50, size=50)

## Combine into a single structured dataset
amounts = np.concatenate([genuine_amounts, fraud_amounts])
frequencies = np.concatenate([genuine_freq, fraud_freq])
X = np.column_stack((amounts, frequencies))
df = pd.DataFrame(X, columns=['Transaction_Amount', 'Daily_Frequency'])

print(f"Total Transactions Logged: {len(df)}")
## Human analysts cannot manually scan 10,050 rows to find the 50 frauds reliably.

## 2. Extracting Knowledge via Data Science (Machine Learning)
## Using Isolation Forest (an unsupervised anomaly detection algorithm)
## It isolates anomalies (frauds) based on feature space density.
model = IsolationForest(contamination=0.005, random_state=42) # 0.5% expected fraud
df['Prediction'] = model.fit_predict(df[['Transaction_Amount', 'Daily_Frequency']])

## Map predictions: 1 (Inlier/Genuine), -1 (Outlier/Fraud)
df['Is_Fraud'] = df['Prediction'].apply(lambda x: True if x == -1 else False)

## 3. Visual Intuition of the Extracted Knowledge
plt.figure(figsize=(10, 6))

## Plot Genuine Transactions
plt.scatter(
    df[df['Is_Fraud'] == False]['Transaction_Amount'], 
    df[df['Is_Fraud'] == False]['Daily_Frequency'], 
    c='blue', alpha=0.5, label='Genuine (Signal)'
)

## Plot Fraudulent Transactions
plt.scatter(
    df[df['Is_Fraud'] == True]['Transaction_Amount'], 
    df[df['Is_Fraud'] == True]['Daily_Frequency'], 
    c='red', marker='x', s=100, label='Fraud (Anomaly)'
)

plt.title("Data Science in Action: Extracting Fraud Knowledge from Raw Data")
plt.xlabel("Transaction Amount ($)")
plt.ylabel("Transaction Frequency (per day)")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Identified Fraudulent Transactions:\n{df[df['Is_Fraud'] == True].head(3)}")
