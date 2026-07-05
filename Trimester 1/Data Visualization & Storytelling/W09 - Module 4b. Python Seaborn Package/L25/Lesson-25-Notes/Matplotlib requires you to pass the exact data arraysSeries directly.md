# Matplotlib requires you to pass the exact data arrays/Series directly.

plt.figure(figsize=(6, 4))
plt.scatter(df["study_hours"], df["exam_score"], color="royalblue", alpha=0.7)
plt.title("Matplotlib: Explicit & Array-Based")
plt.xlabel("Study Hours")
plt.ylabel("Exam Score")
plt.show()
