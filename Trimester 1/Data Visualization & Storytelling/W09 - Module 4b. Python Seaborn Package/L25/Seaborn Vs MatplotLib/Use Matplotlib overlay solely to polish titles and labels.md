# Use Matplotlib overlay solely to polish titles and labels

plt.title("Seaborn: Seamless DataFrame Integration & Categorical Support", fontsize=14, pad=15)
plt.xlabel("Study Hours")
plt.ylabel("Exam Score")
plt.tight_layout()
plt.show()
```

### 3. Cheat Sheet: Native Data Mapping Differences

| **Task**                 | **Matplotlib Code Style**                                                                      | **Seaborn Code Style**                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Passing Variables**    | Explicitly pass separate arrays:<br><br>  <br><br>`plt.scatter(df['x'], df['y'])`              | Point to the DataFrame, name the keys:<br><br>  <br><br>`sns.scatterplot(data=df, x='x', y='y')`                 |
| **Categorical Coloring** | Requires slicing or explicit looping:<br><br>  <br><br>`for cat, sub in df.groupby('cat'):...` | Handled natively by a single parameter:<br><br>  <br><br>`hue='categorical_column'`                              |
| **Color Palettes**       | Colors must be manually listed, mapped, or paired with a complex colormap object.              | Uses pre-packaged styling libraries out of the box:<br><br>  <br><br>`palette='deep'`, `'muted'`, `'Set2'`, etc. |
Based on your lecture transcript, the instructor is breaking down two fundamental advantages of Seaborn over Matplotlib: **Syntax Automation** and **Default Aesthetic Design** (using the metaphor of "garnished food").

Below is the structured technical breakdown and refactored Python code that mirrors the lecture's step-by-step logic, highlighting exactly how Seaborn automates labels and layout styling to keep your audience engaged.
