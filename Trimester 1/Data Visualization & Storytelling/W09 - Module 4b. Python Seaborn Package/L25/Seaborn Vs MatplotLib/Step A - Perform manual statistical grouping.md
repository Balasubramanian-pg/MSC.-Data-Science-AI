# Step A: Perform manual statistical grouping

regional_means = df.groupby("region")["quarterly_revenue"].mean().sort_index()
