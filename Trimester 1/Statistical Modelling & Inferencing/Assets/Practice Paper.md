Statistical Modelling and Inferencing
End Term Examination - Practice Paper
Total Marks: 40
Questions
QUESTION 1. 
A mobile phone manufacturer surveyed 400 customers to study whether preferred phone brand (Brand X, Brand Y, or Brand Z) is associated with the customer’s age group. The observed frequencies are [10 marks]:
	Brand X	Brand Y	Brand Z	Total
18–30 years	60	80	60	200
31–50 years	50	40	30	120
51+ years	30	20	30	80
Total	140	140	120	400
Formulas provided:
"Expected frequency: " E_ij=((〖"Row total" 〗_i )×(〖"Column total" 〗_j ))/"Grand total" 
χ^2=∑(O_ij-E_ij )^2/E_ij  ; df=(r-1)(c-1)
"Cramér’s V"=√(χ^2/(n×min(r-1,c-1) ))
"Proportion test: " z=(p ̂-p_0)/√((p_0 (1-p_0 ))/n)
Critical Values
Test	df / Tail	Critical Value at α=0.05
Chi-Square	df=2	5.991
Chi-Square	df=4	9.488
Z (two-tailed)	—	±1.960
Z (one-tailed, right)	—	1.645
Part (a) State the null and alternative hypotheses for testing whether brand preference is independent of age group. Calculate all expected frequencies, compute the chi-square test statistic, and state your conclusion at α=0.05. [5 marks]
Part (b) Compute Cramér’s V for the chi-square test performed in Part (a). Interpret the strength of association using the following guidelines: V<0.1 (negligible), 0.1≤V<0.3 (small), 0.3≤V<0.5 (medium), V≥0.5 (large). [2 marks]
Part (c) The marketing team claims that more than 30% of customers aged 18–30 prefer Brand Y. Using the observed data (80 out of 200 in the 18–30 group prefer Brand Y), test this claim at α=0.05 using a one-tailed proportion test. State your hypotheses and conclusion. [3 marks]
QUESTION 2. A food processing company wants to study the effect of two factors on the shelf life (in days) of a packaged food product: Packaging Material (Plastic, Glass) and Storage Temperature (Low, Medium, High). A balanced experiment with 3 replications per combination was conducted, giving a total of N=18 observations. [10 marks]
Two-Way ANOVA Table (Partially Completed):
Source	SS	df	MS	F-statistic
Packaging	150.0	A	D	G
Temperature	280.0	B	E	H
Interaction	C	F	45.0	I
Error	180.0	12	—	
Total	700.0	17		
Formulas provided:
MS=SS/df ; F=(MS_"effect" )/(MS_"error"  )
df_A=a-1 ; df_B=b-1 ; df_(A×B)=(a-1)(b-1) ; df_"error" =N-ab
SS_"Total" =SS_A+SS_B+SS_(A×B)+SS_"Error" 
F-distribution Critical Values at α=0.05
Degrees of Freedom (df_1, df_2)	F_"critical" 
(1, 12)	4.75
(2, 12)	3.89
Part (a) State the null hypotheses for: (i) the main effect of Packaging Material, (ii) the main effect of Storage Temperature, and (iii) the interaction effect. In practical terms, explain what a significant “interaction effect” between packaging and temperature would mean for the company. [3 marks]
Part (b) Calculate the values A through I in the ANOVA table. Also verify the Total SS. Show your working. [5 marks]
Part (c) Using the F-critical values provided, determine which effects are statistically significant at α=0.05. If the interaction effect is significant, explain why interpreting the main effects alone would be misleading. [2 marks]
QUESTION 3. A quality control manager at an electronics factory inspects circuit boards from a production line. [10 marks]
Part (a) - Maximum Likelihood Estimation [6 marks]
The manager randomly selects 25 circuit boards and finds that 5 are defective. Let p denote the true defect rate. 
Formulas provided:
"Binomial probability: " P(X=k)=(n¦k) p^k (1-p)^(n-k)
"Likelihood function: " L(p)=(n¦k) p^k (1-p)^(n-k)
"Log-likelihood: " l(p)=ln(n¦k)+kln(p)+(n-k)ln(1-p)
	Write the likelihood function L(p) for the observed data.
	Derive the log-likelihood l(p) and find the MLE p ̂ by differentiating and setting equal to zero.
	Using the invariance property of MLE, find the MLE of the odds of a defect, defined as p/(1-p).
	State any two properties of MLEs (other than invariance) and briefly explain each.
Part (b) - Bayesian Inference [4 marks]
The factory has two production machines. Based on maintenance records:
	Prior probability that Machine 1 is the source: P("Machine 1" )=0.30
	Prior probability that Machine 2 is the source: P("Machine 2" )=0.70
	If from Machine 1, P("Defective" )=0.25
	If from Machine 2, P("Defective" )=0.05
Formulas provided:
"Bayes’ Theorem: " P(A∣B)=(P(B∣A) P(A))/P(B) 
"Total Probability: " P(B)=P(B∣A) P(A)+P(B∣A') P(A')
	A randomly selected circuit board is found defective. Using Bayes’ theorem, calculate the posterior probability that it came from Machine 1.
	Using the posterior from (i) as the new prior, a second circuit board is also found defective. Update the probability that it came from Machine 1.
	Briefly explain the difference between a frequentist confidence interval and a Bayesian credible interval.
QUESTION 4.  A municipal body collects data on 8 environmental indicators for 60 cities to build a “Green City Index.” A Principal Component Analysis (PCA) is performed on the standardized data. [10 marks]
PCA Results - Eigenvalues:
Component	Eigenvalue	Proportion of Variance
PC1	3.60	45.0%
PC2	1.80	22.5%
PC3	1.10	13.8%
PC4	0.65	8.1%
PC5	0.40	5.0%
PC6	0.22	2.8%
PC7	0.13	1.6%
PC8	0.10	1.2%
Total	8.00	100%
Note: The Kaiser criterion recommends retaining components with eigenvalue >1.
Part (a) Using the Kaiser criterion, how many principal components should be retained? What is the cumulative variance explained by the retained components? Explain why PCA is performed on standardized data rather than raw data when variables have different units. [4 marks]
After the PCA analysis, the municipal body also wants to group the 60 cities into clusters. A hierarchical clustering (agglomerative, using Ward’s linkage) was performed on 6 pilot cities (P, Q, R, S, T, U). The merging sequence from the dendrogram is:




Stage	Clusters Merged	Distance at Merge
1	P and Q	1.8
2	T and U	2.5
3	{P, Q} and R	4.2
4	S and {T, U}	5.0
5	{P, Q, R} and {S, T, U}	11.5
Part (b) Using the merging distances above, identify where the largest “gap” occurs between successive merge distances. Based on this gap, how many clusters would you recommend? List the cities in each cluster. Explain the difference between Ward’s linkage and single linkage methods. [3 marks]
Part (c) A colleague suggests using K-Means clustering instead. State one advantage of hierarchical clustering over K-Means and one advantage of K-Means over hierarchical clustering. If the number of cities were 10,000 instead of 60, which method would you prefer and why? [3 marks]

