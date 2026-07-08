# ML models prefer continuous data centered at 0 with unit variance

scaler = StandardScaler()
data[['Joining_Year_Scaled', 'Salary_Scaled']] = scaler.fit_transform(data[['Joining_Year', 'Salary_USD']])
