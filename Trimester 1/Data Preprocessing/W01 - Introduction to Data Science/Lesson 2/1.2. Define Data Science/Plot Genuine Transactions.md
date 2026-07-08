# Plot Genuine Transactions

plt.scatter(
    df[df['Is_Fraud'] == False]['Transaction_Amount'], 
    df[df['Is_Fraud'] == False]['Daily_Frequency'], 
    c='blue', alpha=0.5, label='Genuine (Signal)'
)
