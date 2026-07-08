# Plot the grouped data points

plt.scatter(
    X[:, 0], X[:, 1], 
    c=cluster_assignments, 
    cmap='viridis', 
    s=30, 
    alpha=0.6,
    label='Data Points'
)
