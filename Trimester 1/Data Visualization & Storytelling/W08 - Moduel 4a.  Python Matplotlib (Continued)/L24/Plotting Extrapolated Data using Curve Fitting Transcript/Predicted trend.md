# Predicted trend

plt.plot(
    future_months,
    future_users,
    '--',
    color='darkorange',
    label='Extrapolated Trend'
)

plt.xlabel('Months')
plt.ylabel('Users')
plt.title('Polynomial Curve Fitting')

plt.legend()

plt.show()
```
