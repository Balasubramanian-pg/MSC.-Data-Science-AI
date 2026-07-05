# Generate random data

data = {
    "freight": np.random.randint(500, 2000, size=12),
    "mail": np.random.randint(100, 500, size=12)
}

df = pd.DataFrame(data)
