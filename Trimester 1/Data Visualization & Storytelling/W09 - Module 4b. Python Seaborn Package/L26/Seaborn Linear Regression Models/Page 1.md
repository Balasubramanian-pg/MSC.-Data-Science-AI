# Page 1

Page 1 of 5 
 
Seaborn Linear Regression Models Transcript 
 
Hello everyone, we'll now understand how to fit a regression model in the Python 
environment using the Seaborn libraries. Okay, what is regression? Regression is a 
statistical technique wherein you understand the relationship between dependent and 
independent variables. In general, when we understand certain phenomenon, let us 
say you want to understand weight of a person, you think his height might be a 
determining variable. 
  
Underlying hypothesis being the person with a greater height is expected to have a 
greater weight. Similarly, family which is earning more or having a larger income is 
expected to have a higher consumption. These are relations that are known to 
everyone and the standard correlation plot would explain that relationship between the 
two variables. 
  
Now, the question is what is the extent of influence that a dependent variable has on 
the independent variable is given by a regression model. However, the understanding 
here is to capture the coefficient of regression so that you can predict the future values 
using that coefficient. Now, for the purposes of this course, we are not getting into the 
details, statistical details of the modelling details of the regression models, but we are 
focused on how to present the visualisations regarding to regression because in 
certain contexts, especially in the financial space, if you are developing models as part 
of your larger course or in this particular BFSS specialisation, you might need 
regression models. 
  
You will definitely use regression models in many contexts and you might want to 
convey the results to your top management. In that case, you want to use the 
visualisations on presenting the regression results and actual regression lines so that 
there is more acceptance in the audience. So, we will now try to use the Seaborn 
library quickly to understand the features of regression and then see how to plot a 
regression diagram. 
  
So, for that we are importing the libraries that are required. We already have Seaborn 
and Mathplotlib, but we are now installing stat models so that you can run a regression. 
Of course, we are also importing NumPy and Pandas and I have uploaded the TIPS 
dataset which you have already seen and the regression plot which is given by the 
command sns.reg plot tries to portray the relationship between X total bill and Y tip 
and the data is TIPS. 
  
So, the relationship between the total bill amount and the tip received is plotted and a 
regression line is superimposed on that. Now, let us understand what does this mean 
and this is the plot that is produced. Now, I will take you through some steps so you 
will understand the importance of a regression plot.
