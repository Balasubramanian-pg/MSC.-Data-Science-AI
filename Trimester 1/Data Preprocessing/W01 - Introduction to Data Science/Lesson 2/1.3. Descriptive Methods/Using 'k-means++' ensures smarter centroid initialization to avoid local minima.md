# Using 'k-means++' ensures smarter centroid initialization to avoid local minima

kmeans_model = KMeans(
    n_clusters=4, 
    init='k-means++', 
    n_init=10, 
    max_iter=300, 
    random_state=42
)
cluster_assignments = kmeans_model.fit_predict(X)
centroids = kmeans_model.cluster_centers_
