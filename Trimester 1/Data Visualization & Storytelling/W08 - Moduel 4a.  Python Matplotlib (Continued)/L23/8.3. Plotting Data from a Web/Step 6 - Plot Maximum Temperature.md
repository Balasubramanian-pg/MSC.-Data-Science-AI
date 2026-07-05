# Step 6: Plot Maximum Temperature

```python
df_weather['temp_max'].plot(
    figsize=(12,6),
    color='crimson'
)

plt.xlabel('Date')
plt.ylabel('Maximum Temperature')
plt.title('Seattle Maximum Temperature')

plt.show()
```
