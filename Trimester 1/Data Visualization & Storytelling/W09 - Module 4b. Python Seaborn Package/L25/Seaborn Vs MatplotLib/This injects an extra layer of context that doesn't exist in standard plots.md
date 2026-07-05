# This injects an extra layer of context that doesn't exist in standard plots.

plt.axhline(
    y=global_mean, 
    color="crimson", 
    linestyle="--", 
    linewidth=2, 
    label=f"Global Mean Score ({global_mean:.1f})"
)
