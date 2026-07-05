# by descending median score, directly satisfying the Gestalt comparison principles.

ordered_courses = df.groupby("course")["exam_score"].median().sort_values(ascending=False).index

sns.boxplot(
    data=df, 
    x="course", 
    y="exam_score", 
    order=ordered_courses,
    width=0.5
)
