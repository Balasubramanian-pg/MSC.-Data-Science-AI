---
title: W09 - Module 4b. Python Seaborn Package
module: Statistical Modelling And Inferencing
week: W09 - Module 4b. Python Seaborn Package
---

## Page 1

 
 
 
 
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
  

## Page 2

 
 
 
 
 Page 2 of 5 
 
So, I am just doing a simple cat plot between total bill amount and tip which should 
give me a scatter diagram telling the relationship between the total bill and the tip 
amount. So, you should get a scatter plot which should look like this same diagram 
without the line. So, this is the diagram. 
  
Okay. So, you got the diagram. You have the total bill amount and it is showing the 
total bill amount and total tip amount. 
  
This is how the distribution is. Okay. sns.cat plot. 
  
This is the relationship between total bill amount. So, as the bill amount increases, the 
tip amount is increasing. So, what is this particular regression plot or regression line 
is doing is it is trying to fit a relationship between total bill amount and the tip. 
  
So, this straight line represents that equation where if I give you the total bill amount 
you should be able to tell the corresponding tip amount. Okay. It need not be the actual 
data but it represents a line which gives a overall representation of the existing 
underlying relationship between total bill and tip amount. 
  
Okay. So, regression line does not pass through all the points but it captures the 
essence of all these points. So, interested people can learn about regression on their 
own but for the purposes of this particular course we are interested in plotting the 
regression line and the regression relationship between the dependent variable which 
is the tip amount and the independent variable which is the total bill. 
  
Larger is the total bill you expect the larger the tip amount to be. So, total bill is 
influencing or determining the tip amount. Therefore, total bill is the independent 
variable and tip amount is the dependent variable. 
  
Okay. So, you can use the red plot command for plotting total bill versus tip and you 
will get a nice graph like this and the thick blue line indicates the regression line which 
captures the linear relationship between total bill and tip amount. Now, let us look at 
the another function called SMS SNS LM plot. 
  
Okay. So, it also produces a similar result. It is a different command. 
  
Sorry. It produces the same result giving the regression line capturing the relationship 
between total bill and tip. So, what is the difference between LM plot and the 
regression line? A red plot function. 
  
Red plot is an access level function while LM plot is a figure level function. Therefore, 
LM plot is more flexible format of the data. Right. 
  

## Page 3

 
 
 
 
 Page 3 of 5 
 
LM plot is more flexible. So, sorry. Red plot is more flexible for about the data format 
it accepts whereas LM plot requires X and Y to be strings referring to columns in the 
particular data frame. 
  
So, these are functional differences but one more advantage here is with LM plot has 
the hue parameter. So, what I can do I can take LM plot and parse certain commands 
to overlay additional data points like I can set the hue in this case to be the gender 
which we have seen earlier. Right. 
  
So, if I do this I am getting two regression plots. Right. For one for the male one for 
the female both present in the same diagram. 
  
So, instead of that I can try to do them in the different columns so that they look more 
pleasing and appropriate. So, this is the regression plot for male customers. This is 
the regression plot for the female customers and now maybe either want to do that 
also with the time of the lunch. 
  
Right. When the time of the visit to the restaurant. So, now you can see the difference 
in which you can use the parameters and bring out more relationship. 
  
So, now let us understand what is this four diagrams are meaning. For male customers 
and during the dinner time this is the regression function and for the female female 
customers during lunch time this is the regression function. So, you can estimate four 
different relationships and show their impact in a single graph by imposing more 
dimensions and enhance in the richness of your graphic. 
  
Now, let us talk about different kinds of models. We just plotted a linear function. We 
can also plot a nonlinear function so that you can have a better fit of the data. 
  
So, let me explain that. If you remember the Anscombe's quadrat which shows that 
the central tendencies are the aggregate measures of the data are similar for four 
different data sets but the underlying data distributions are very different. Right. 
  
You had a highly distributed data. You had a parabolic data. You had you had a 
parabolic data and you had a single out layer. 
  
There are different kinds of data which had the same central tendency measures like 
the mean median. Right. So, this is what the speciality about Anscombe format, 
Anscombe's quadrat and we have used that as a case showing that you need to 
visualise data to understand how is it what is the pattern. 
  
So, now let us load Anscombe data and see what regression functions give better 
results for each data set. So, first we are trying to plot the relationship between the 
first data set. Okay. 

## Page 4

 
 
 
 
 Page 4 of 5 
 
  
Let me first before I do anything let us look at Anscombe. Okay. Dot head. 
  
So, this is XY of each data 1 2 3 4 the day. Okay. I should also do the shape to 
understand the total shape. 
  
Yeah. So, there are 44 rows and 3 columns. Okay. 
  
So, let us look at all the 44. So, yeah. How is the data? It is categorised as whether 
the data set is belonging to first, second, third and fourth. 
  
You have four data sets. Right. And about 10 observations in each or 11 observations 
in each. 
  
Okay. That is how you have the data and on X and Y variables. Right. 
  
This is Anscombe quadrat and just to visualise what we can do the Anscombe quadrat. 
Right. I am just doing SMS LM plot data is equal to Anscombe and I am subsetting the 
data to be the first category. 
  
Okay. Within the data set to be first. Then I am setting the confidence interval to be 
none which is nothing but the yellow the blue band around the linear regression line 
showing the confidence percentage around the line. 
  
Right. And the scatter. So, this is what we have because we wanted to highlight the 
scatter a size to be 80. 
  
Okay. If you can reduce or increase the size I have to increase the size just to show 
the difference. Okay. 
  
Maybe I can make it even more 20 also. So, you get the smaller dots. So, let us keep 
a larger dot. 
  
So, the visibility is clear. So, this is how you can you have plotted for one data set. 
Okay. 
  
So, this is the linear plot now. Okay. It is fitting reasonably well. 
  
Now, let us try this for plotting the data set 2 which looks like a parabola. Right. Which 
looks like a parabola. 
  
So, I am just using this and I am plotting the data. So, you can clearly see the straight 
line or linear function LM plot is not most ideal for data set 2 which has a parabolic 

## Page 5

 
 
 
 
 Page 5 of 5 
 
shape or which has a curvature and the linear straight line is failing to capture it 
completely. So, what we try to do is we try to fit a polynomial function. 
  
Okay. Of order 2. Okay. We try to incorporate. 
  
If you look at the difference between this and this, we are just trying to fit a polynomial 
function of order 2. Okay. Let me show what happens if you just plot a polynomial of 
order 1. You will get the same result which is the straight line. Now, instead of plotting 
a polynomial of order 1, I am plotting a polynomial of order 2. Right. 
  
So, you should be getting a curvature and that should be able to capture the data 
ideally. So, now you have a plot which captures the data very well because it is using 
a polynomial function instead of a linear function and you can experiment with these 
things. Now, let us look at the data set 3. Okay. 
  
Data set 3 and then it uses. So, now let us try to fit the plot, linear plot for all the 
elements in the Anscombe query, Anscombe squared rate. I just use the column. 
  
I set the column to be data set. So, it will have four different graphs because there are 
four different data sets just running this. So, if you fit, forcefully fit the linear plot on all 
Anscombe squared rate, you might not have the best ideal fit in each of the cases. 
  
Therefore, it is better to modify the functions for different cases. Okay. And we have 
also seen how to use the hue characteristic and impose the additional dimensions on 
the regression plot. 
  
Okay. Thank you. 
 
 
---------------------------------------------------End-------------------------------------------------------- 
 

Tags: #statistics #machine-learning #data-science #statistical-modelling
