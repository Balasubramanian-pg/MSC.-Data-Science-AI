# Load dataset

url = 'https://raw.githubusercontent.com/vega/vega-datasets/main/data/seattle-weather.csv'

df_weather = pd.read_csv(
    url,
    parse_dates=['date']
)

df_weather.set_index(
    'date',
    inplace=True
)
