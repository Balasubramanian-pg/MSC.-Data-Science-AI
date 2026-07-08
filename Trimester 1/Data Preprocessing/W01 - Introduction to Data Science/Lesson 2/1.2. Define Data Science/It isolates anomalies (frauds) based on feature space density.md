# It isolates anomalies (frauds) based on feature space density.

model = IsolationForest(contamination=0.005, random_state=42) # 0.5% expected fraud
df['Prediction'] = model.fit_predict(df[['Transaction_Amount', 'Daily_Frequency']])
