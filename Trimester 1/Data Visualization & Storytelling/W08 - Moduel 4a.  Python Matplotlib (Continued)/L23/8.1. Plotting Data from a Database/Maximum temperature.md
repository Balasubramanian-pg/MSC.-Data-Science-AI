# Maximum temperature

axes[0].plot(
    df.weather.index,
    df.weather['temp_max'],
    color='crimson'
)

axes[0].set_title('Maximum Temperature')
