# Rainfall

axes[2].plot(
    df.weather.index,
    df.weather['precipitation'],
    color='royalblue'
)

axes[2].set_title('Precipitation')

plt.tight_layout()
plt.show()
```
