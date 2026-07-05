# --- Approach A: Matplotlib Baseline Histogram (Ungarnished) ---

plt.figure(figsize=(6, 4))
plt.hist(df["exam_score"], bins=10, color="blue", edgecolor="none")
plt.title("Matplotlib Histogram: Raw & Ungarnished")
plt.xlabel("Exam Score")
plt.ylabel("Count")
plt.tight_layout()
plt.show()
