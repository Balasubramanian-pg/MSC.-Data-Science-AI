# Page 1

Page 1 of 13 
 
Seaborn Categorical Data, Univariate Distribution, BiVariate Distributions 
Transcript 
 
Welcome to BITS PLANET DIGITAL. Let's continue our learning journey for the course 
Data Visualisation Storytelling. Today we will be continuing our learning for the 
visualisation using the Python environment and specifically the Seaborn library. 
  
We will now understand how to visualise categorical data using Seaborn. Before we 
delve into the contents of today's lecture, let us understand what is categorical data. 
Categorical data represents categories that are there in the data. 
  
For example, gender has two categories male and female. So if you are tracking 
customers, you can understand the sales by gender whether males are buying more 
or females are purchasing more in a given period of time. So like that you have other 
categories. 
  
For example, in our election data set each state can represent a category saying that 
what is the voting percentage, right? State is the variable categorical variable and then 
you have different states or if you are having state and then gender there are two 
levels of categorical variables. Categorical variables are helpful in bifurcating the data 
set and understanding the behaviour at the subgroup level and trying to compare 
trends between two subgroups so that you can make more analytical insights into the 
data. So we like always we have to upload the necessary libraries before we perform 
any visualisation function in the Colab environment. 
  
So I'm just opening a new notebook so that I can simultaneously run the commands 
and demonstrate how these seaborn features can be used for visualising categorical 
data and other advanced features. So you have generally whenever we are talking 
about categorical variables you try to understand the relationship between the 
categories or category and another variable of interest, okay, using typically the scatter 
plots, distribution plots, right? These are the go-to graphs that you use for 
understanding categorical data. So let us now talk about categorical scatter plots. 
  
The default kind of plot that you get in seaborn which is cat plot is a scatter plot. So if 
you plot just type cat plot in seaborn it will automatically produce a scatter plot. We will 
see the other types of distribution plots and strip plots to understand categorical data. 
  
Let us start off with an example. So I am first importing the necessary libraries into the 
Colab environment. So I have imported seaborn as SNS, mathplotlib as pyplot, 
mathplotlib.pyplot as PLD. 
  
Then I am uploading the tips data which indicates the tips received by people who are 
tips received in the restaurant for various types of lunches that are there that is the 
lunch and dinner and what depending upon the bill says what is the tip. So we have
