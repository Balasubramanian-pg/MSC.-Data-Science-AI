# This displays how Seaborn calculates the mean and error band automatically.

plt.figure(figsize=(10, 5))

sns.lineplot(
    data=fmri_df, x="timepoint", y="signal", color="brand_blue" if False else "royalblue", linewidth=2.5
)
