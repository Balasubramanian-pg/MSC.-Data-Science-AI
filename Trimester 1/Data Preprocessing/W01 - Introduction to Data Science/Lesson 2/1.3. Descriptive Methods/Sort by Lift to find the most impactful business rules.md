# Sort by Lift to find the most impactful business rules

rules = rules.sort_values(by='lift', ascending=False)

print("\nDiscovered Association Rules:")
