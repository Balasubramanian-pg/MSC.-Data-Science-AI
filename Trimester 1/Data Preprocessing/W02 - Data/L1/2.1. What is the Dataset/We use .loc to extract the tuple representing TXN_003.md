# We use .loc to extract the tuple representing TXN_003

object_txn3 = df.loc['TXN_003']
print(f"Data Object (Tuple) for TXN_003:\n{object_txn3}\n")
print(f"Geometric representation (Vector): {object_txn3.values}")
print("\n" + "="*40 + "\n")
