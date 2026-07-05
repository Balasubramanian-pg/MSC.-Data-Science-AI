# Step 1: Plot a Single Column

Example:

```python
df.weather['precipitation'].plot(
    color='blue',
    title='Daily Precipitation in Seattle'
)

plt.ylabel('Precipitation (mm)')
plt.xlabel('Date')
plt.show()
```

This creates:

- X-axis → date
    
- Y-axis → precipitation
    
- Blue line → rainfall trend over time
    

The important idea:

```python
df.weather['precipitation']
```

selects one column from the DataFrame.
