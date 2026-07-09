# 3.3.1. Introduction to Filter Methods

Feature selection is a critical component of the machine learning pipeline designed to improve model performance and interpretability. 

Filter methods represent a category of feature selection techniques that evaluate the relationship between features and the target variable using statistical measures. These methods operate entirely independently of any specific machine learning predictive model. Because they do not require model training, filter methods are computationally highly efficient.

>[!Note]
> Filter methods evaluate the intrinsic properties of data mathematically, making them ideal as an initial preprocessing step before applying more computationally expensive machine learning algorithms.

Among the various statistical measures available, correlation is the most widely applied filter method for continuous data.
