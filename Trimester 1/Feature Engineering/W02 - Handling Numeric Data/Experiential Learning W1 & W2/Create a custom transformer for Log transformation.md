# Create a custom transformer for Log transformation

log_transformer = FunctionTransformer(np.log1p, validate=True)
