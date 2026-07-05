# To plot categorical means in Matplotlib, you must calculate them manually first.

plt.figure(figsize=(6, 4))
course_means = df.groupby("course")["exam_score"].mean()

plt.bar(
    course_means.index,
    course_means.values,
    color="lightcoral",
    edgecolor="black",
)
plt.title("Matplotlib: Manual Aggregation (Mean Only)")
plt.xlabel("Course")
plt.ylabel("Mean Exam Score")
plt.show()
