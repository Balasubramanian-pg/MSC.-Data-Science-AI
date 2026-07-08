# Plot Fraudulent Transactions

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
```

> [!TIP]
> **Performance/Computational Insight:** In production systems (like SBI or Visa), you cannot load billions of rows into a single Pandas DataFrame. You must utilize distributed computing frameworks like **Apache Spark** (PySpark) which partitions the dataset across a cluster of thousands of worker nodes, applying transformations in parallel.
