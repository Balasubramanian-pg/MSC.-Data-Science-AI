# True underlying function + Gaussian Noise

true_weights = 15.5
bias = 1000
noise = np.random.normal(0, 10, size=(n_days, 1))

y_price = bias + (true_weights * X_inflation) + noise
