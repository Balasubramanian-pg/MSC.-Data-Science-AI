# Step A: You must manually partition and calculate the mean statistics first

course_means = df.groupby("course")["exam_score"].mean()
