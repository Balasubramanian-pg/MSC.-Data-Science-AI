# Use this in your pipeline to transform continuous Age to categorical bins

```

### 5. Evaluating Performance (The Stretch Goal)

To truly see the "before and after," compare the baseline against your engineered features.

```Python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
