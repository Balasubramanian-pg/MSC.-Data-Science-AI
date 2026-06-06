# 1. Module 6 Introduction: Linear Regression

Previous modules focused primarily on statistical inference techniques such as:

- estimation
    
- hypothesis testing
    
- ANOVA
    
- categorical association analysis
    

These methods allowed us to [answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#answer))) questions such as:

- Are two population means different?
    
- Is a treatment effect statistically significant?
    
- Are variables associated?
    
- Does a factor influence outcomes?
    

However, many real-world systems involve continuous relationships rather than simple group comparisons.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W8/L0/Time%20Series%20Analysis.md#examples) include:

- how sales change with advertising expenditure
    
- how exam scores change with study time
    
- how house prices change with area
    
- how demand changes with price
    
- how temperature affects energy consumption
    

These problems require a different statistical framework:

$$  
\text{Regression Analysis}  
$$

\text{Regression Analysis}

Regression is one of the most powerful and widely used tools in statistics, data science, economics, [finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W4/L1/Inferences%20for%20Two%20Population%20Variances.md#[finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#finance)), [engineering](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W3/L2/Errors%2C%20P-values%2C%20and%20Significance.md#engineering), and machine learning.

# 2. The Core Goal of Regression

The central objective of regression is modeling relationships between variables.

Specifically:

- one variable acts as the predictor
    
- another variable acts as the [response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response)))
    

The inferential [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#question))) becomes:

$$  
\text{How does } Y \text{ change as } X \text{ changes?}  
$$

\text{How does }Y\text{ change as }X\text{ changes?}

where:

- $$X$$ = explanatory variable (predictor)
    
- $$Y$$ = [response variable](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response)))-variable) (outcome)
    

Regression therefore moves statistics beyond simple comparisons toward mathematical modeling of relationships.

# 3. What Is Linear Regression?

Linear regression models the relationship between variables using a straight-line equation.

The simplest form is:

# $$  
Y

\beta_0  
+  
\beta_1X  
+  
\varepsilon  
$$

Y=\beta_0+\beta_1X+\varepsilon

where:

- $$Y$$ = [response variable](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response)))-variable)
    
- $$X$$ = predictor variable
    
- $$\beta_0$$ = [intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#intercept))
    
- $$\beta_1$$ = slope coefficient
    
- $$\varepsilon$$ = random [error term](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#error-term)
    

This equation forms the foundation of [simple linear regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#simple-linear-regression).

# 4. Why the Relationship Is Called "Linear"

The term linear refers to the relationship being linear in the parameters:

$$  
\beta_0,\beta_1  
$$

Graphically, the relationship forms a straight line.

This implies:

- constant rate of change
    
- additive structure
    
- proportional directional effect
    

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

# 5. The Meaning of the [Intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#intercept))

The [intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#intercept)):

$$  
\beta_0  
$$

represents the predicted value of:

$$  
Y  
$$

when:

$$  
X = 0  
$$

X=0

Interpretation depends heavily on context.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W8/L0/Time%20Series%20Analysis.md#examples):

- baseline salary
    
- starting measurement
    
- default system output
    

In some applications, the [intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#intercept)) has practical meaning.

In others, it serves primarily as a mathematical anchor for the regression line.

# 6. The Meaning of the Slope

The slope coefficient:

$$  
\beta_1  
$$

measures the average change in:

$$  
Y  
$$

associated with a one-unit increase in:

$$  
X  
$$

Formally:

# $$  
\beta_1

[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W4/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
\Delta Y  
}{  
\Delta X  
}  
$$

\beta_1=[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W4/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\Delta Y}{\Delta X}

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W8/L0/Time%20Series%20Analysis.md#examples):

- increase in sales per advertising dollar
    
- increase in salary per year of experience
    
- increase in crop yield per fertilizer unit
    

The slope is therefore the central measure of relationship strength and direction.

# 7. The [Error Term](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#error-term)

Real-world data never falls perfectly on [a line](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#a-line).

The [error term](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#error-term):

$$  
\varepsilon  
$$

captures variability unexplained by the regression model.

Sources include:

- measurement error
    
- omitted variables
    
- randomness
    
- human variability
    
- environmental fluctuations
    

Thus:

# $$  
Y

\text{Systematic Component}  
+  
\text{Random Component}  
$$

Y=\text{Systematic Component}+\text{Random Component}

Regression attempts to model the systematic structure while acknowledging unavoidable randomness.

# 8. Building the Regression Line

Given sample data:

$$  
(x_1,y_1),  
(x_2,y_2),  
\dots,  
(x_n,y_n)  
$$

we estimate the regression line:

# $$  
\hat{Y}

b_0  
+  
b_1X  
$$

\hat{Y}=b_0+b_1X

where:

- $$b_0$$ estimates $$\beta_0$$
    
- $$b_1$$ estimates $$\beta_1$$
    

The estimated line is called the least squares regression line.

# 9. The Least Squares Principle

The regression line is chosen using the least squares method.

The objective is minimizing the total squared prediction error:

$$  
\sum  
(y_i-\hat{y}_i)^2  
$$

\sum(y_i-\hat{y}_i)^2

where:

- $$y_i$$ = observed value
    
- $$\hat{y}_i$$ = predicted value
    

The quantity:

$$  
y_i-\hat{y}_i  
$$

is called the residual.

# 10. Why Errors Are Squared

Squaring [residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#residuals) serves several purposes:

- prevents positive and negative errors from cancelling
    
- penalizes large errors heavily
    
- produces mathematically tractable optimization
    

Large prediction errors therefore receive disproportionately larger penalties.

This creates stable and computationally efficient estimation.

# 11. [Residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#residuals)

[Residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#residuals) measure prediction error:

# $$  
e_i

y_i-\hat{y}_i  
$$

e_i=y_i-\hat{y}_i

Interpretation:

- [positive residual](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L1/The%20Method%20of%20Least%20Squares.md#positive-residual) → underprediction
    
- [negative residual](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L1/The%20Method%20of%20Least%20Squares.md#negative-residual) → overprediction
    
- small residual → accurate prediction
    

Residual analysis becomes critically important for diagnosing model quality.

# 12. Model Significance

Once the regression line is estimated, we evaluate whether the relationship itself is statistically meaningful.

The central hypothesis is:

$$  
H_0:\beta_1 = 0  
$$

H_0:\beta_1=0

This represents:

$$  
\text{No Linear Relationship}  
$$

The [alternative hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W3/L2/Errors%2C%20P-values%2C%20and%20Significance.md#alternative-hypothesis) is:

$$  
H_A:\beta_1 \ne 0  
$$

H_A:\beta_1\ne0

A statistically significant slope suggests evidence of a linear relationship between:

$$  
X  
\quad \text{and} \quad  
Y  
$$

# 13. Interpreting [Statistical Significance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W3/L2/Errors%2C%20P-values%2C%20and%20Significance.md#statistical-significance) in Regression

A significant regression result implies:

> Changes in the predictor variable are systematically associated with changes in the [response variable](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response)))-variable).

However, significance alone does NOT imply:

- causality
    
- strong predictive accuracy
    
- practical importance
    

This distinction is extremely important in applied analytics.

# 14. Coefficient Interpretation

Regression coefficients quantify relationships numerically.

Suppose:

# $$  
\hat{Y}

50  
+  
3X  
$$

Interpretation:

- [intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[intercept](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#intercept)) = 50
    
- slope = 3
    

This means:

> Every one-unit increase in $$X$$ is associated with an average increase of 3 units in $$Y$$.

The slope coefficient therefore becomes the central inferential quantity.

# 15. Regression for Prediction

One major purpose of regression is prediction.

Given a new predictor value:

$$  
X=x  
$$

the model predicts:

# $$  
\hat{Y}

b_0+b_1x  
$$

\hat{Y}=b_0+b_1x

Applications include:

- sales forecasting
    
- demand estimation
    
- risk prediction
    
- price prediction
    
- trend analysis
    

Regression transforms historical relationships into predictive tools.

# 16. Regression as Statistical Modeling

Regression is fundamentally more than curve fitting.

It represents a formal statistical model:

# $$  
Y

f(X)  
+  
\varepsilon  
$$

Y=f(X)+\varepsilon

This separates:

- explainable structure
    
- random uncertainty
    

The entire framework attempts to discover stable mathematical structure inside noisy real-world systems.

# 17. Assumptions of Linear Regression

Classical linear regression relies on several assumptions.

## Linearity

The relationship between:

$$  
X  
\quad \text{and} \quad  
Y  
$$

should be approximately linear.

---

## Independence

Observations should be statistically independent.

---

## Constant Variance

Residual variability should remain approximately constant across predictor values.

This property is called:

$$  
\text{Homoscedasticity}  
$$

\text{Homoscedasticity}

---

## Normality of Errors

[Residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#residuals) should be approximately normally distributed.

Violations of these assumptions can distort inference and prediction reliability.

# 18. Regression and Correlation

Regression is closely related to correlation.

Correlation measures:

$$  
\text{Strength of Linear Association}  
$$

Regression models:

$$  
\text{Functional Predictive Relationship}  
$$

Correlation is symmetric:

$$  
r(X,Y)=r(Y,X)  
$$

Regression is directional:

$$  
X \rightarrow Y  
$$

This distinction is crucial.

# 19. Why Regression Is So Important

Regression is one of the most widely used tools in quantitative analysis because many systems exhibit continuous relationships.

Applications include:

- economics
    
- [finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W4/L1/Inferences%20for%20Two%20Population%20Variances.md#[finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#finance))
    
- healthcare
    
- [engineering](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W3/L2/Errors%2C%20P-values%2C%20and%20Significance.md#engineering)
    
- machine learning
    
- business intelligence
    
- operations research
    
- scientific modeling
    

Much of predictive analytics fundamentally rests on regression-based thinking.

# 20. The Deeper Statistical Perspective

Regression represents a major transition in statistical thinking.

Previous modules focused primarily on:

$$  
\text{Group Comparison}  
$$

Regression focuses on:

$$  
\text{Relationship Modeling}  
$$

\text{Group Comparison}\rightarrow\text{Relationship Modeling}

The broader inferential goal becomes:

$$  
\text{Discovering Mathematical Structure in Data}  
$$

\text{Discovering Mathematical Structure in Data}

Linear regression is therefore not merely a statistical procedure.

It is one of the foundational frameworks for understanding, predicting, and modeling complex real-world systems under uncertainty.