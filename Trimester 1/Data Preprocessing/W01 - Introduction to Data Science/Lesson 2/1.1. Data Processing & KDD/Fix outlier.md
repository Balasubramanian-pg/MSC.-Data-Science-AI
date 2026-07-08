# Fix outlier

selected_df.loc[selected_df['temperature_c'] == 999, 'temperature_c'] = np.nan
