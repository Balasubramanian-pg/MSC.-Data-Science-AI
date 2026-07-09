# 3.3.5. Feature-Target Correlation for Selection

The most direct application of Pearson's correlation is assessing how well an individual feature predicts the target variable.

When a feature exhibits a high absolute correlation magnitude with the target, it contains a strong signal. The conventional process involves computing $$r_{xy}$$ between every individual feature and the target variable. Features are then ranked by their absolute value. 

Data scientists establish a predefined threshold. Any feature failing to meet this threshold is discarded, as it lacks sufficient linear predictive power. This filtering reduces the dimensionality of the dataset, leaving only the most relevant statistical signals for the model to process.

However, selecting features based solely on their relationship with the target variable ignores how features interact with one another.
