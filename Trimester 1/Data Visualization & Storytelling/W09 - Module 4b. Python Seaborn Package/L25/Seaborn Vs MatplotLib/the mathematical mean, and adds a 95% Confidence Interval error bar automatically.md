# the mathematical mean, and adds a 95% Confidence Interval error bar automatically.

sns.barplot(
    data=df, 
    x="course", 
    y="exam_score",
    errorbar="ci" # Explicitly showing the confidence interval band highlighted in the lecture
)

plt.title("Seaborn: Automated Central Tendency & Confidence Intervals", fontsize=13, pad=15)
plt.xlabel("Course")
plt.ylabel("Exam Score")
plt.tight_layout()
plt.show()
```
