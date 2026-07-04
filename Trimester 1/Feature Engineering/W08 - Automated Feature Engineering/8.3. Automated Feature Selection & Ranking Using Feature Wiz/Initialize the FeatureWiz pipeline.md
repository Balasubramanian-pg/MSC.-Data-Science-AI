# Initialize the FeatureWiz pipeline

fwiz = FeatureWiz(
    corr_limit=0.70,           # SULOV Threshold
    feature_engg="interactions", # Automatically create X1*X2, X1/X2 polynomial features
    category_encoders="ordinal", # Memory-efficient encoding for tree models
    verbose=1                  # Print internal optimization steps
)
