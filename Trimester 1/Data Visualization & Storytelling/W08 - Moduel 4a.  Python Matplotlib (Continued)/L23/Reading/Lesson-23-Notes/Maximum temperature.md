# Maximum temperature

axes[0].plot(
    df_weather.index,
    df_weather['temp_max'],
    color='crimson'
)

axes[0].set_title(
    'Maximum Temperature Trend'
)

axes[0].set_ylabel(
    'Temp (°C)'
)
