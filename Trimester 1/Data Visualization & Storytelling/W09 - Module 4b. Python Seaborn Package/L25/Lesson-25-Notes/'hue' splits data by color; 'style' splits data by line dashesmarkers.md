# 'hue' splits data by color; 'style' splits data by line dashes/markers

plt.figure(figsize=(7, 4))
sns.lineplot(
    data=fmri, x="timepoint", y="signal", hue="region", style="event"
)
plt.title("fMRI Signal: Split by Region (Color) & Event (Style)")
plt.legend(bbox_to_anchor=(1.05, 1), loc="upper left")  # Move legend outside plot
plt.tight_layout()
plt.show()
