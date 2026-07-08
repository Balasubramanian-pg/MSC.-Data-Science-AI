# Plot the learned centroids

plt.scatter(
    centroids[:, 0], centroids[:, 1], 
    c='red', 
    s=200, 
    marker='X', 
    label='Cluster Centroids'
)

plt.title("Market Segmentation: Minimizing Intra-Cluster Distance")
plt.xlabel("Feature 1: Purchase Frequency (Normalized)")
plt.ylabel("Feature 2: Annual Spending (Normalized)")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
