# 3.1.3. Core Strategies for Construction

To translate raw data into predictive signals, practitioners rely on a structured set of construction techniques.

### 3.1.3.1. Mathematical Combinations

Applying arithmetic operations such as ratios, differences, or products reveals direct relationships between variables. 

For example, in real estate, the raw price and area are less predictive than their ratio.

$$
\text{Price per Sq Ft} = \frac{\text{Price}}{\text{Area}}
$$

where:

- $$\text{Price per Sq Ft}$$ = the newly constructed feature

- $$\text{Price}$$ = the total listing price of the property

- $$\text{Area}$$ = the total square footage of the property

### 3.1.3.2. Aggregations and Temporal Summaries

Computing summary statistics for grouped or temporal data transforms granular noise into stable trends. 

Calculating a rolling seven-day sales total or the average transaction amount per user provides the model with a macroscopic view of behavior that single data points cannot convey.

### 3.1.3.3. Interaction Features

Modeling dependencies between features captures synergistic effects that individual variables miss. 

An interaction term multiplies two features together, forcing a linear model to acknowledge their combined impact.

$$
X_{\text{interaction}} = X_1 \times X_2
$$

where:

- $$X_{\text{interaction}}$$ = the newly constructed interaction feature

- $$X_1, X_2$$ = the original base features

### 3.1.3.4. Domain-Specific Metrics

Leveraging specialized knowledge allows us to build standard, industry-recognized metrics. 

In retail, this means constructing Recency, Frequency, and Monetary (RFM) scores. In finance, it means calculating rolling volatility or the Relative Strength Index.

Understanding the strategies is only half the battle; applying them requires strict discipline.
