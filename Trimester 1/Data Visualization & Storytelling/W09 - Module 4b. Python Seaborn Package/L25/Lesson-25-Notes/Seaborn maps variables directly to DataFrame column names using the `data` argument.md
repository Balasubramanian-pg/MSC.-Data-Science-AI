# Seaborn maps variables directly to DataFrame column names using the `data` argument.

plt.figure(figsize=(6, 4))
sns.scatterplot(data=df, x="study_hours", y="exam_score", color="teal")
plt.title("Seaborn: Declarative & DataFrame-Aware")
plt.xlabel("Study Hours")
plt.ylabel("Exam Score")
plt.show()
