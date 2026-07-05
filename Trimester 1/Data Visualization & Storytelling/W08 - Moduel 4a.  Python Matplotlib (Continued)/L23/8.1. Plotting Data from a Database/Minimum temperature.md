# Minimum temperature

axes[1].plot(
    df.weather.index,
    df.weather['temp_min'],
    color='orange'
)

axes[1].set_title('Minimum Temperature')
