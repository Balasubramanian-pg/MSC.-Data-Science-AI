# Seaborn automatically calculates the mean AND adds a 95% Confidence Interval (CI) error bar.

plt.figure(figsize=(6, 4))
sns.barplot(data=df, x="course", y="exam_score", palette="muted")
plt.title("Seaborn: Automatic Mean + 95% Confidence Intervals")
plt.xlabel("Course")
plt.ylabel("Exam Score")
plt.show()
