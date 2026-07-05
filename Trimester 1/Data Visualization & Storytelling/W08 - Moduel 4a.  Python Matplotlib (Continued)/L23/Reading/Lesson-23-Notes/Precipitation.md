# Precipitation

axes[1].plot(
    df_weather.index,
    df_weather['precipitation'],
    color='royalblue'
)

axes[1].set_title(
    'Daily Precipitation'
)

axes[1].set_ylabel(
    'Precipitation (mm)'
)
