# Clip scores to ensure they stay within a realistic 0-100 limit

exam_scores = np.clip(exam_scores, 0, 100)
