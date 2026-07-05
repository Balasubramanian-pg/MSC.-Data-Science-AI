# Setting a seed ensures the random data is reproducible every time you run it

np.random.seed(42)

mock_data = {
    "study_hours": np.random.uniform(1, 10, 50),
    "exam_score": np.random.randint(50, 100, 50),
    "course": np.random.choice(["Math", "Physics", "Chemistry"], 50),
}
df = pd.DataFrame(mock_data)
