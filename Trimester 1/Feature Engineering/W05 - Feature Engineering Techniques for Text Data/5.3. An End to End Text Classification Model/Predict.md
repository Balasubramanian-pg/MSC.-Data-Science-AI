# Predict

predicted_label = clf.predict(target_vector)[0]

print("=== PIPELINE TRACE ===")
print(f"Original Text : {target_raw_doc}")
print(f"Cleaned Text  : {target_clean_doc}")
print(f"Actual Label  : {actual_label}")
print(f"Predicted     : {predicted_label}")
print("Prediction Match:", "CORRECT" if actual_label == predicted_label else "INCORRECT")
