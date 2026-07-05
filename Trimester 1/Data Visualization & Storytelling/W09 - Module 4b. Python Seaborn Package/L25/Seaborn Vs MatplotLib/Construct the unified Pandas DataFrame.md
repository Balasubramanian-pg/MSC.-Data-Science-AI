# Construct the unified Pandas DataFrame

df = pd.DataFrame({
    "study_hours": study_hours,
    "exam_score": exam_scores,
    "course": courses
})

print("--- First 5 Rows of the Student Dataset ---")
print(df.head())
print("\n" + "="*60 + "\n")
