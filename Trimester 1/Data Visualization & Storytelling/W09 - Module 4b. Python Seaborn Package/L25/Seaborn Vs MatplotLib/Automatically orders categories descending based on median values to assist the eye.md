# Automatically orders categories descending based on median values to assist the eye.

sorted_categories = df.groupby("course")["exam_score"].median().sort_values(ascending=False).index

sns.boxplot(
    data=df,
    x="course",
    y="exam_score",
    order=sorted_categories,
    palette="pastel",
    width=0.45
)
