# 3.5.3. Mathematical Formulation of the Chi-Square Statistic

The Chi-Square statistic aggregates the relative differences between the observed and expected counts across all categories.

The mathematical formulation is:

$$
\chi^2 = \sum \frac{(O - E)^2}{E}
$$

Where:

- $$ \chi^2 $$ = Chi-Square test statistic
    
- $$ O $$ = Observed frequency for a specific category
    
- $$ E $$ = Expected frequency for a specific category
    

By squaring the difference in the numerator, the formula ensures that positive and negative deviations do not cancel each other out. Dividing by the expected frequency in the denominator scales the deviation relative to the size of the category, preventing massive categories from dominating the statistic purely due to their volume.
