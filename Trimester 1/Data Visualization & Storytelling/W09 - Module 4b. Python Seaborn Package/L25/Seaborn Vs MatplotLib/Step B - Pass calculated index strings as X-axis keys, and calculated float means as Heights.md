# Step B: Pass calculated index strings as X-axis keys, and calculated float means as Heights

plt.bar(
    x=course_means.index, 
    height=course_means.values, 
    color="steelblue", 
    edgecolor="black"
)

plt.title("Matplotlib: Requires Manual Data Aggregation (.groupby())", fontsize=12)
plt.xlabel("Course")
plt.ylabel("Calculated Mean Exam Score")
plt.tight_layout()
plt.show()
