# Move the legend outside the plot box so it doesn't overlap data points

plt.legend(bbox_to_anchor=(1.05, 1), loc="upper left")
plt.tight_layout()
plt.show()
