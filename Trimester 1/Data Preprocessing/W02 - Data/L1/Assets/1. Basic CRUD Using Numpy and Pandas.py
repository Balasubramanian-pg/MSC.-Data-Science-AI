import pandas as pd
import numpy as np

## 1. Simulating Raw Data Entry (Information gathering)
raw_data = {
    'Transaction_ID': ['TXN_001', 'TXN_002', 'TXN_003', 'TXN_004'],
    'Date': ['2023-06-01', '2023-06-02', '2023-06-02', '2023-06-03'],
    'Amount_USD': [150.50, 25.00, 3000.00, 45.75],
    'Type': ['Debit', 'Debit', 'Credit', 'Debit'],
    'Is_Fraud': [0, 0, 1, 0]
}

## 2. Creating the Structured Dataset
df = pd.DataFrame(raw_data)
df.set_index('Transaction_ID', inplace=True)

print("Full Dataset (Design Matrix):")
print(df)
print("\n" + "="*40 + "\n")

## 3. Extracting a Data Object (Row Vector / Instance)
## We use .loc to extract the tuple representing TXN_003
object_txn3 = df.loc['TXN_003']
print(f"Data Object (Tuple) for TXN_003:\n{object_txn3}\n")
print(f"Geometric representation (Vector): {object_txn3.values}")
print("\n" + "="*40 + "\n")

## 4. Extracting an Attribute (Column Vector / Dimension)
## We extract the 'Amount_USD' dimension
attribute_amount = df['Amount_USD']
print(f"Attribute (Dimension) for Amount_USD:\n{attribute_amount}\n")

## 5. Extracting Knowledge (Analytics on Attributes)
average_amount = attribute_amount.mean()
fraud_count = df['Is_Fraud'].sum()
print(f"Extracted Knowledge: Average transaction is ${average_amount:.2f}")
print(f"Extracted Knowledge: Total fraudulent objects found: {fraud_count}")
