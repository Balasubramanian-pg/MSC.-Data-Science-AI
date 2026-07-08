# Injecting noise/missing data

data['humidity_%'][::15] = np.nan 
data['temperature_c'][::50] = 999 # Sensor error

raw_df = pd.DataFrame(data)

print(f"Raw Data Shape: {raw_df.shape}")
