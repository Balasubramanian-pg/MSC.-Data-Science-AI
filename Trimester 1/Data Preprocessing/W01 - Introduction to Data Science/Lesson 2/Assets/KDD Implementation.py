import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

## ---------------------------------------------------------
## STEP 0: Raw Data + Question
## Question: Can we predict rain tomorrow based on today's weather?
## ---------------------------------------------------------
np.random.seed(42)
data = {
    'sensor_id': ['S1', 'S2', 'S1', 'S3', 'S2'] * 200,
    'temperature_c': np.random.normal(25, 5, 1000),
    'humidity_%': np.random.normal(60, 15, 1000),
    'wind_direction': np.random.choice(['N', 'S', 'E', 'W'], 1000),
    'maintenance_log': ['Checked'] * 1000,
    'rain_tomorrow': np.random.choice([0, 1], 1000, p=[0.7, 0.3])
}
## Injecting noise/missing data
data['humidity_%'][::15] = np.nan 
data['temperature_c'][::50] = 999 # Sensor error

raw_df = pd.DataFrame(data)

print(f"Raw Data Shape: {raw_df.shape}")

## ---------------------------------------------------------
## STEP 1: Data Selection
## Drop irrelevant columns (sensor_id, maintenance_log, wind_direction for simplicity)
## ---------------------------------------------------------
selected_df = raw_df[['temperature_c', 'humidity_%', 'rain_tomorrow']].copy()

## ---------------------------------------------------------
## STEP 2: Data Preprocessing (Cleaning)
## Handle NaNs and fix extreme outliers
## ---------------------------------------------------------
## Fix outlier
selected_df.loc[selected_df['temperature_c'] == 999, 'temperature_c'] = np.nan
## Impute NaNs with median
clean_df = selected_df.fillna(selected_df.median())

## ---------------------------------------------------------
## STEP 3: Data Transformation
## Scale features to zero mean and unit variance
## ---------------------------------------------------------
X = clean_df[['temperature_c', 'humidity_%']]
y = clean_df['rain_tomorrow']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_transformed = scaler.fit_transform(X_train)
X_test_transformed = scaler.transform(X_test)

## ---------------------------------------------------------
## STEP 4: Data Mining / Machine Learning
## ---------------------------------------------------------
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train_transformed, y_train)
y_pred = clf.predict(X_test_transformed)

## ---------------------------------------------------------
## STEP 5: Pattern Evaluation
## ---------------------------------------------------------
acc = accuracy_score(y_test, y_pred)
print(f"Evaluation Accuracy: {acc:.2f}")

## Iterative loop check
if acc < 0.75:
    print("\n[WARNING] Knowledge extraction failed to answer the question sufficiently.")
    print("Action: Must reiterate. Need to revisit Data Selection (add wind_direction back) or change ML model.")
else:
    print("\n[SUCCESS] Pipeline successfully extracted actionable patterns.")
