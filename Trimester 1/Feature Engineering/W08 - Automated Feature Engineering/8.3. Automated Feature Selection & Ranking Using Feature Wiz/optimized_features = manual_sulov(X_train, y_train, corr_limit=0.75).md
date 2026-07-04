# optimized_features = manual_sulov(X_train, y_train, corr_limit=0.75)

```

### Production: Using the `featurewiz` library
In a real engineering workflow, we abstract the pipeline into a single automated call that handles SULOV, encoding, and recursive elimination.

```python
from featurewiz import FeatureWiz
import pandas as pd
