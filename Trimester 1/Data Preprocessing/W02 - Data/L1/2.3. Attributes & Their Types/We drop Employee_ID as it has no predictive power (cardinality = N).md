# We drop Employee_ID as it has no predictive power (cardinality = N)

ohe = OneHotEncoder(sparse_output=False, dtype=int)
dept_encoded = ohe.fit_transform(data[['Department']])
dept_columns = ohe.get_feature_names_out(['Department'])
df_dept = pd.DataFrame(dept_encoded, columns=dept_columns)
