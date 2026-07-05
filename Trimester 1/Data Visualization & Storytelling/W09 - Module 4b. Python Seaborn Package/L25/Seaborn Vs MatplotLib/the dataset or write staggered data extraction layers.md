# the dataset or write staggered data extraction layers.

plt.figure(figsize=(9, 5))

colors_dict = {"Math": "crimson", "Science": "teal", "History": "darkorange"}

for course_name, group_data in df.groupby("course"):
    plt.scatter(
        group_data["study_hours"], 
        group_data["exam_score"], 
        label=course_name,
        color=colors_dict[course_name],
        alpha=0.8,
        s=60
    )

plt.title("Matplotlib: Categorical Grouping via Manual Loop", fontsize=13)
plt.xlabel("Study Hours")
plt.ylabel("Exam Score")
plt.legend(title="Course")
plt.tight_layout()
plt.show()
