# Combine into a single structured dataset

amounts = np.concatenate([genuine_amounts, fraud_amounts])
frequencies = np.concatenate([genuine_freq, fraud_freq])
X = np.column_stack((amounts, frequencies))
df = pd.DataFrame(X, columns=['Transaction_Amount', 'Daily_Frequency'])

print(f"Total Transactions Logged: {len(df)}")
