# Simulating a production decision: Push a $10 coupon if Churn probability > 70%

sample_user = np.array([[20, 2, 1]]) # 20 days since ride, 2 rides last month, 1 app open
churn_risk = clf.predict_proba(sample_user)[0][1]

print(f"\nProduction Rule Engine:")
if churn_risk > 0.70:
    print(f"User Churn Risk: {churn_risk:.2%}. ACTION: Trigger Coupon Push.")
else:
    print(f"User Churn Risk: {churn_risk:.2%}. ACTION: Do nothing.")
```
