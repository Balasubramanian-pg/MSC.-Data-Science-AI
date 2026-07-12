# Regression-Based Smoothing

Regression smoothing models the relationship between attributes and then projects noisy observations toward the learned trend.

The lecture uses age and salary as an example.

|Age|Salary|
|---|---|
|20|1000|
|30|2000|
|40|3000|
|50|4000|

A domain expert may identify a relationship:

$$
y = x + 1
$$

where:

- $x$ = age
    
- $y$ = salary
    

The regression model fits a line capturing the underlying trend.

Noisy observations are then adjusted relative to this trend line.
