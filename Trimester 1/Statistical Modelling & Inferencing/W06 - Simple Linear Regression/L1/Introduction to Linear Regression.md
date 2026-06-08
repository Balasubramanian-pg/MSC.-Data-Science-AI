---

## Reading Material: Introduction to Linear Regression

---
## 1. The Goal of Regression: Modeling Statistical Relationships

In many scientific, [engineering](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#engineering), business, and social science applications, the primary objective is understanding how variables relate to one another.

Some relationships are deterministic.

A deterministic relationship follows an exact mathematical rule.

[Example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

$$  
F = ma  
$$

F=ma

If:

- mass
    
- acceleration
    

are known exactly, then force can be determined perfectly.

There is no uncertainty.

However, most real-world relationships are not deterministic.

They are statistical.

## 2. Statistical Relationships

A statistical relationship contains systematic structure mixed with randomness.

Consider:

- hours studied and exam scores
    
- advertising expenditure and sales
    
- temperature and electricity demand
    
- years of experience and salary
    

Generally:

$$  
X \uparrow  
\Rightarrow  
Y \uparrow  
$$

but not perfectly.

Two individuals with identical predictor values may still produce different outcomes because many additional influences exist simultaneously.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples) include:

- motivation
    
- health
    
- stress
    
- prior knowledge
    
- environmental variation
    
- random chance
    

Regression therefore does not attempt to produce perfect certainty.

Instead, it models the average systematic trend hidden inside noisy data.

## 3. The Purpose of [Simple Linear Regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#simple-linear-regression)

[Simple linear regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#simple-linear-regression) is designed to capture and quantify linear statistical relationships between two variables.

The two major objectives are:

|Goal|Purpose|
|---|---|
|Understanding|Quantify relationships|
|Prediction|Forecast outcomes|

Regression therefore serves both explanatory and predictive functions.

## 4. Understanding Relationships

One goal of regression is understanding how variables move together on average.

The key inferential [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question))) becomes:

$$  
\text{How much does } Y \text{ change when } X \text{ changes?}  
$$

\text{How much does }Y\text{ change when }X\text{ changes?}

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

- How much does salary increase per additional year of experience?
    
- How much does crop yield increase per fertilizer unit?
    
- How much do exam scores improve per additional study hour?
    

Regression transforms vague qualitative relationships into quantitative mathematical estimates.

## 5. Prediction

Another major purpose of regression is prediction.

Suppose we know:

$$  
X=x  
$$

Regression allows estimation of:

$$  
\hat{Y}  
$$

the predicted value of the [response variable](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response)))-variable).

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

- predicted house price from area
    
- predicted sales from advertising spend
    
- predicted blood pressure from age and weight
    

Regression therefore acts as a statistical forecasting tool.

## 6. Why It Is Called "Linear" Regression

The term linear refers to the use of a straight-line relationship.

The model assumes:

## $$  
Y

\text{Straight-Line Function of } X  
$$

Y=\text{Straight-Line Function of }X

Graphically, the relationship is represented by [a line](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#a-line) rather than a curve.

This implies:

- constant rate of change
    
- additive structure
    
- stable directional relationship
    

## 7. Scatter Plots and Statistical Relationships

Regression begins visually with scatter plots.

Each point represents an observation:

$$  
(x_i,y_i)  
$$

(x_i,y_i)

Patterns in the scatter plot reveal:

- positive relationships
    
- negative relationships
    
- weak relationships
    
- nonlinear structure
    
- outliers
    

In regression, the line attempts to summarize the overall directional trend of the cloud of points.

## 8. Components of the Regression Model

[Simple linear regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#simple-linear-regression) involves two variables.

## 9. The Dependent Variable

The dependent variable is the variable being predicted or explained.

It is also called:

- [response variable](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response)))-variable)
    
- outcome variable
    

It is denoted by:

$$  
Y  
$$

Y

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

- exam score
    
- sales revenue
    
- blood pressure
    
- house price
    

The dependent variable is the quantity whose behavior we want to understand.

## 10. The Independent Variable

The independent variable is the predictor used to explain changes in:

$$  
Y  
$$

It is also called:

- explanatory variable
    
- predictor variable
    
- regressor
    

It is denoted by:

$$  
X  
$$

X

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

- hours studied
    
- advertising expenditure
    
- years of experience
    
- dosage level
    

Regression attempts to model how:

$$  
Y  
$$

changes as:

$$  
X  
$$

changes.

## 11. The Population Regression Model

Suppose we could observe the entire population.

The true underlying relationship would be:

## $$  
Y

\beta_0  
+  
\beta_1X  
+  
\varepsilon  
$$

Y=\beta_0+\beta_1X+\varepsilon

This is called the population regression model.

The model contains:

- deterministic structure
    
- random variation
    

This balance is fundamental to statistical modeling.

## 12. The Population [Intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#intercept))

The parameter:

$$  
\beta_0  
$$

is called the population [intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#intercept)).

It represents the expected value of:

$$  
Y  
$$

when:

$$  
X=0  
$$

X=0

Interpretation depends heavily on context.

Sometimes the [intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#intercept)) is meaningful.

Sometimes it is merely a mathematical positioning constant.

[Example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

If:

## $$  
Y

50  
+  
5X  
$$

then when:

$$  
X=0  
$$

the predicted value is:

$$  
50  
$$

## 13. Practical Interpretation of the [Intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#intercept))

A major conceptual warning:

> Intercepts are not always practically meaningful.

Suppose:

## $$  
X

\text{Years of Work Experience}  
$$

Then:

$$  
X=0  
$$

may correspond to a meaningful scenario.

However, suppose:

## $$  
X

\text{Engine Speed in Active Machines}  
$$

Then:

$$  
X=0  
$$

may lie outside the realistic operating range entirely.

This is related to extrapolation problems.

## 14. The Population Slope

The parameter:

$$  
\beta_1  
$$

is the population slope.

This is the most important quantity in [simple linear regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#simple-linear-regression).

It measures the average change in:

$$  
Y  
$$

associated with a one-unit increase in:

$$  
X  
$$

Formally:

## $$  
\beta_1

[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
\Delta Y  
}{  
\Delta X  
}  
$$

\beta_1=[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\Delta Y}{\Delta X}

## 15. Interpreting the Slope

Suppose:

$$  
\beta_1 = 5  
$$

Then:

> Every one-unit increase in $$X$$ is associated with an average increase of 5 units in $$Y$$.

Interpretation [examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

- extra study hour → +5 exam points
    
- extra advertising dollar → +5 sales units
    
- extra fertilizer unit → +5 crop units
    

The slope therefore quantifies relationship strength and direction.

## 16. Positive and Negative Slopes

If:

$$  
\beta_1 > 0  
$$

then:

$$  
X \uparrow  
\Rightarrow  
Y \uparrow  
$$

This is a positive relationship.

---

If:

$$  
\beta_1 < 0  
$$

then:

$$  
X \uparrow  
\Rightarrow  
Y \downarrow  
$$

This is a negative relationship.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

|Positive Relationship|Negative Relationship|
|---|---|
|Study Time vs Score|Price vs Demand|
|Advertising vs Sales|Speed vs Fuel Efficiency|

## 17. The [Error Term](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#error-term)

The component:

$$  
\varepsilon  
$$

represents random error.

It captures all factors influencing:

$$  
Y  
$$

that are not included in the model.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples) include:

- motivation
    
- intelligence
    
- environmental conditions
    
- measurement error
    
- omitted variables
    
- randomness
    

The regression model therefore becomes:

## $$  
Y

\text{Systematic Component}  
+  
\text{Random [Noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))}  
$$

Y=\text{Systematic Component}+\text{Random [Noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))}

## 18. Why Error Terms Matter

Without the [error term](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#error-term), the model would incorrectly assume perfect predictability.

Real systems are inherently noisy.

Regression acknowledges uncertainty explicitly rather than pretending it does not exist.

This is one of the deepest distinctions between deterministic mathematics and statistical modeling.

## 19. The Sample Regression Equation

Because observing entire populations is rarely possible, we work with samples.

Using sample data, we estimate the unknown population parameters.

The estimated regression equation becomes:

## $$  
\hat{Y}

b_0  
+  
b_1X  
$$

\hat{Y}=b_0+b_1X

where:

- $$b_0$$ estimates $$\beta_0$$
    
- $$b_1$$ estimates $$\beta_1$$
    
- $$\hat{Y}$$ is the predicted [response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response)))
    

## 20. Population Parameters vs Sample Estimates

This distinction is extremely important.

|Population Quantity|Sample Estimate|
|---|---|
|$$\beta_0$$|$$b_0$$|
|$$\beta_1$$|$$b_1$$|

Population parameters are fixed but unknown.

Sample statistics are estimates that vary across samples.

Regression therefore operates under inferential uncertainty.

## 21. Predicted Values

The value:

$$  
\hat{Y}  
$$

represents the predicted [response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response))) lying directly on the fitted regression line.

[Predictions](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#predictions) are model-generated expectations rather than guaranteed outcomes.

For [example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

$$  
\hat{Y}=70  
$$

means:

> The model predicts an average outcome of 70 for that predictor value.

Actual observations may still differ because of randomness.

## 22. [Residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#residuals)

The difference between an observed value and its predicted value is called the residual:

## $$  
e_i

y_i-\hat{y}_i  
$$

e_i=y_i-\hat{y}_i

[Residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#residuals) measure prediction error.

Interpretation:

- [positive residual](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L1/The%20Method%20of%20Least%20Squares.md#positive-residual) → underprediction
    
- [negative residual](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L1/The%20Method%20of%20Least%20Squares.md#negative-residual) → overprediction
    
- small residual → accurate prediction
    

[Residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#residuals) are central to regression diagnostics.

## 23. [The Core Problem](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W02 - Introduction To Statistical Inference/L0/Inferential%20Statistics.md#the-core-problem) of Regression Estimation

The central mathematical challenge becomes:

$$  
\text{How do we choose the best possible line?}  
$$

Many lines could pass through the data cloud.

Regression therefore requires an optimization principle.

## 24. The Method of Least Squares

The standard method is the least squares method.

The idea is simple:

Choose the line minimizing total squared prediction error.

Mathematically:

$$  
\sum  
(y_i-\hat{y}_i)^2  
$$

\sum(y_i-\hat{y}_i)^2

is minimized.

This produces the least squares regression line.

## 25. Why Errors Are Squared

Squaring [residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#residuals) serves multiple purposes:

- prevents cancellation of positive and negative errors
    
- penalizes large mistakes heavily
    
- creates mathematically stable optimization
    

Large prediction errors therefore contribute disproportionately more to the objective function.

## 26. Regression as Statistical Inference

Regression is not merely curve fitting.

It is inferential statistics.

The major inferential [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question))) becomes:

$$  
H_0:\beta_1 = 0  
$$

H_0:\beta_1=0

This represents:

$$  
\text{No Linear Relationship}  
$$

The [alternative hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#alternative-hypothesis) is:

$$  
H_A:\beta_1 \ne 0  
$$

H_A:\beta_1\ne0

A significant slope suggests evidence of a systematic relationship between:

$$  
X  
\quad \text{and} \quad  
Y  
$$

## 27. Regression and Prediction Under Uncertainty

A major misconception is believing regression provides certainty.

Regression provides:

- expected trends
    
- probabilistic [predictions](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#predictions)
    
- average relationships
    

not perfect deterministic forecasts.

Even excellent regression models still contain uncertainty because real systems contain randomness.

## 28. Deep Statistical [Intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#intuition))))

Linear regression fundamentally attempts to discover mathematical structure inside noisy systems.

The framework separates:

$$  
\text{[Signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal))}  
\quad from \quad  
\text{Random Variation}  
$$

\text{[Signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal))}\quad from \quad\text{Random Variation}

The fitted line captures systematic directional behavior.

[Residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#residuals) capture unexplained randomness.

The broader inferential goal becomes:

$$  
\text{Modeling Predictable Structure Under Uncertainty}  
$$

\text{Modeling Predictable Structure Under Uncertainty}

This is why regression became one of the foundational tools in:

- economics
    
- [finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#[finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#finance))
    
- machine learning
    
- [engineering](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#engineering)
    
- healthcare
    
- business intelligence
    
- scientific modeling
    
- predictive analytics
    

Linear regression is ultimately the starting point of statistical modeling itself.

Tags: #statistics #machine-learning #data-science #statistical-modelling