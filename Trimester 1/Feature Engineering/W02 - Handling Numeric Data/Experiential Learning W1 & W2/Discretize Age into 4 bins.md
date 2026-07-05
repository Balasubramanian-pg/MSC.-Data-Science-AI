# Discretize Age into 4 bins

discretizer = KBinsDiscretizer(n_bins=4, encode='ordinal', strategy='quantile')
