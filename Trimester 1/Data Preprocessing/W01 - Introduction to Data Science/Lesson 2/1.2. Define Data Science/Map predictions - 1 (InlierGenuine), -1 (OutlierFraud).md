# Map predictions: 1 (Inlier/Genuine), -1 (Outlier/Fraud)

df['Is_Fraud'] = df['Prediction'].apply(lambda x: True if x == -1 else False)
