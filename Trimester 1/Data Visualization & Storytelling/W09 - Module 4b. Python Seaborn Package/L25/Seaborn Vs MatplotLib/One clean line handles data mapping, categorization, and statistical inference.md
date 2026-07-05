# One clean line handles data mapping, categorization, and statistical inference

sns.barplot(
    data=df, 
    x="region", 
    y="quarterly_revenue", 
    order=["North", "East", "South", "West"]
)
