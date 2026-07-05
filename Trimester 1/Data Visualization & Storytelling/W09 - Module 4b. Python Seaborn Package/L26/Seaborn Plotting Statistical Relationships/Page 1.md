# Page 1

Page 1 of 6 
 
Seaborn Plotting Statistical Relationships Transcript 
 
Welcome to BITS PLANET DIGITAL. Today we will continue our learning journey for 
the course Data Visualisation Storytelling. We will be now looking at the advanced 
features of the Seaborn library for making visualisations in the Python ecosystem. 
  
As you have already seen, Seaborn is little advanced than the protein matplotlib library 
which is used for making visualisations. And as discussed in the last class, we have 
seen that Seaborn is more of a statistical tool which enables visualisations to convey 
the information about the underlying data, its trends and its statistical properties. In 
this slide, in today's class, we will be exploring the features of Seaborn library which 
enables us to do some statistical analysis. 
  
So let us get into the world of Seaborn and see what are the tools and techniques it 
offers for driving insights from our data so that you as a business analyst or a data 
scientist can make more effective visualisations. So in today's class, the main objective 
is to understand the statistical relationships of the data using the Seaborn library. 
Okay, so we will be using the scatter plot and line plot which are essentially used for 
understanding relationship between variables or the changes over a period of time. 
  
We have already seen the continuous feature that is available via line plot in the 
Seaborn where you get the line as an average of the values and it is also presented 
with a confidence interval band so that you can know about statistical properties and 
the nature of the underlying distribution at a single point. Now let us first try to use the 
normal libraries and then see what else we can do by importing certain specific 
functions. So I am just importing the required libraries NumPy S, NP, Pandas, 
Mathplotlib and Seaborn and there is also set theme like the style grid that we have 
used in Mathplotlib we are using the dark grid in this case for generating our graphics. 
  
Okay now and we are covering it we are covering lot of examples in this case and we 
will supply you with this a collab notebook so that you can practise the set your leisure 
and learn the various techniques. Please follow through the class and you will get the 
collab file which you can practise later and also in live classes we will be taking more 
examples to strengthen your understanding of the Seaborn ecosystem. Now first what 
we are trying to do we are trying to plot a scatterplot. 
  
What is the use of a scatterplot? Scatterplot represents a relationship between two 
variables and try to see whether they are positively associated negatively associated 
or there is no association right and it is a very good tool for exploratory data analysis 
wherein you try to understand what is the relationship between different variables in 
your data set. So let us we are first loading the tips data set I will take a minute to 
explain this data set we will be using it quite often in this class so it's always whenever 
you see a new data set or what we have loaded as a data frame it is always good to 
explore what are the contents in the data set. So by calling the heads I mean head
