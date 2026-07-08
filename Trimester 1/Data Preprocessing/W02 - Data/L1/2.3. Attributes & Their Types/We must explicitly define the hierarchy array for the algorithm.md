# We must explicitly define the hierarchy array for the algorithm

perf_hierarchy = [['Low', 'Medium', 'High']]
oe = OrdinalEncoder(categories=perf_hierarchy, dtype=int)
data['Performance_Encoded'] = oe.fit_transform(data[['Performance']])
