# One single, readable command handles data mapping, categorization, and color palettes.

plt.figure(figsize=(9, 5))

sns.scatterplot(
    data=df, 
    x="study_hours", 
    y="exam_score", 
    hue="course",       # Automatically handles colors based on categorical values
    palette="Set2",     # Uses a built-in professional color palette
    s=80                # Controls marker size uniformly
)
