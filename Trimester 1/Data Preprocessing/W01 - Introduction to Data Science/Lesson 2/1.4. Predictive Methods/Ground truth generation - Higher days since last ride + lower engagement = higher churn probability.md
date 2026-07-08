# Ground truth generation: Higher days since last ride + lower engagement = higher churn probability

logits = 0.5 * X[:, 0] - 0.8 * X[:, 1] - 1.2 * X[:, 2]
probabilities = 1 / (1 + np.exp(-logits))
y = (probabilities > 0.5).astype(int) # 1 = Churn, 0 = Retain
