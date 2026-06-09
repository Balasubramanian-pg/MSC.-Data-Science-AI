---
title: W11 - Module 4d. Tableau
module: Statistical Modelling And Inferencing
week: W11 - Module 4d. Tableau
---


# Page 1

 
 
 
 
 Page 1 of 5 
 
Metadata Management Transcript 
 
We will now try to understand how to manage metadata in the tableau environment. 
We will be continuing with our sample superstore data and we have imported the data 
in just a while ago and these are the different categories of the data. Now we will try 
to understand how we will manage the different dimensions that are in the data. 
  
For example, you have location dimension, product dimension, customer type 
dimension, so on and so forth. And you also have the numerical values which are 
given below. Let me just delete this. 
  
So these are the numerical values which are originally there in the data, discount, 
profit, quantity and sales and latitude, longitude were created by the system that you 
have order forms and measure values. So these are the data which are quantitative, 
which are numerical in nature. You have the categorical data, the geographical data, 
date type data in this. 
  
Now we will try to understand how to manage metadata. So first of all, let us try to 
understand very simple functions like renaming something. For example, I have a city 
underscore USA here. 
  
I know all the cities in this particular sheet are coming from USA. There is no need to 
again specify as USA. I'm just changing this so you can just do OK. 
  
So this is how you can simply click the drop down and check the rename. And also 
you can use the duplicate to create the same categorical variable. And you might want 
to preserve the original variable and try to do a transformation on that. 
  
OK, so for example, you want to view numbers for the states. OK, instead of a state 
ABC, what you can do, you can duplicate the data and change the numbers to states, 
to numbers, something, some other transformation you want to do. So these things 
are very useful for quickly arranging the data without disturbing the original data 
structure. 
  
Then another important property is try to bring the data types which are similar 
together. For example, in this case, we have about 10 to 15 dimensions, which is not 
large and you are able to see every one of them at the same glance. But in practise, 
when you have very large scale data running to hundreds of maybe hundreds of 
thousands of columns and all the populating all the data variables are dimensions, it 
becomes cumbersome and it will affect your visualisation process. 
  
In this case, you can use the search bar to search for a particular variable, provided 
you know the exact variable type and all. But it is always advisable to create something 
or group the data which belong to certain particular category into a folder. For example, 


# Page 2

 
 
 
 
 Page 2 of 5 
 
I know there are locational variables, right? I know there are locational variables and I 
am trying to do this with a create folder button. 
  
I just create a folder saying that these are location vars, location var. I just do OK. I 
just got location var here. 
  
I move the country to this. OK. Then I also move a state variable, which is a location 
variable, right? And also the postal code. 
  
So now across all the variables, I know these are the location variables. Likewise, I 
can also create one more folder, OK? Create folder. So I can make a customer 
underscore details, OK? I can just do that. 
  
Though I have sent category by mistake, I'm just dragging it outside. OK. Cancel. 
  
So I'm just dragging it outside. So this is removed. So customer details, I'm sending 
the customer ID to that folder. 
  
Customer name I'm sending. So these are customer types. So I have the customer 
details folder and location variables folder is created. 
  
Rest are all we can also do the order date and shipment date as per our convenience 
or requirement. But creating folders, OK, will help you organise variables which are 
similar or solving one particular function. And they will be helpful in managing your 
data or recalling certain functions very easily. 
  
You need not search through the entire list. You can directly go to that folder, pick up 
the variable and do the necessary. So again, category has gone by mistake to here. 
  
I'm just taking it outside. So we just have this, OK, city and this is a customer details. 
Let us see what is this category. 
  
Yeah. So we will just do this part. So now another thing that we can do in meta variable 
management is creation of hierarchies. 
  
Let us now understand what is hierarchy. One important thing with folder is all the 
variables are together. Now let us see the sales, which we are generally interested. 
  
We have the overall sales. So then we are interested in the sales by the state. So we 
have the state. 
  
Then we have the city, OK, so sales by the city. So we know everything is in US. This 
is the sales by city. 
  


# Page 3

 
 
 
 
 Page 3 of 5 
 
And then within the each state, we are giving the city by states. Now instead of 
dragging and dropping them each time, what you can try to do is you can create 
something called a hierarchy, which represents the natural structuring in the data. For 
example, you move from country level sales, for example, you move from country level 
sales of the United States, then you have state level sales, OK, then you have city 
level sales. 
  
So this is how your data is naturally ordered and you want to create this function in a 
single go. This is where your hierarchy is really helpful. So what I'm just I'm just 
removing them so you can just remove the variables by dragging on them to the blank 
space. 
  
So I've done this. So now I'm trying to create a hierarchy. So before I do that, I'm trying 
to the hierarchy that is created. 
  
I don't need postal code. I'm taking it away from the hierarchy. I need a country, state 
and city. 
  
So I'm just dragging country to the hierarchy button this but this, OK, this symbol 
indicates hierarchy. Just putting it to country, then I have city, OK, I know this is the 
wrong order. So I'm just reordering it like this. 
  
So I just got it and I know this is wrong name. So I'm going to click on this button and 
I'm going to rename this country, state, city, OK, CSC, OK, I'm just renaming it for 
inclusion. Now what I can do is simply get this here, OK, and this is country level and 
look at this particular button. 
  
Once you click on that, you get state wise data and on state. If you click on this, you 
get city wise data. Otherwise, what you are doing is drilling down. 
  
Similarly, you do the reverse. You are drilling up and getting the aggregate data in this 
way. Hierarchy is very helpful for segmenting data and aggregating data on a particular 
logical order, and that will help you to slice and dice data, put other variables into this. 
  
For example, I have the state and country wise data, and now I'm trying to get the, let 
us say, region here. OK, so you have the region. OK, and then I want to showcase 
this. 
  
So you have the region wise, state wise data, and I'm not interested in state. So I'm 
just removing the hierarchy. So you have the overall United States, each state within 
the region, the data and the sales, which is represented. 
  


# Page 4

 
 
 
 
 Page 4 of 5 
 
So by using hierarchy, you can slice and dice, create more interesting insights onto 
the data. Especially this is useful for doing exploratory data analysis. And also, if you 
want to present data in a particular format, it will be really helpful. 
  
OK, so then we will now try to see some other examples of data management, 
metadata management. I'm just removing the variables here. I'm not interested in any 
of this. 
  
Results I'm removing. This is the legend. It was this. 
  
So now next thing that I'm trying to do is create something called measured values or 
measured columns. So now till now, we have worked on the quantitative qualitative 
data. Now we'll be working on the quantitative data. 
  
So, for example, I'm interested on the discount. I know the discount is a percentage 
value and I know the sales. I want to understand how much is the discount amount in 
actual rupees or in dollars. 
  
So I'm going to click on this. There is something called a create a calculated field. OK, 
so I'm just doing the calculation. 
  
I'm just saying discount underscore AMT and already discount field is selected. I'm 
doing an E2 into the I'm just dropping the sales field here. The calculation is valid. 
  
I'm doing OK. Now we have called a new field called discount amount. So this is you 
can create a calculated field or calculated measure that will help you to compute values 
based on your numerical data. 
  
And now you can use them for your analysis. Now, what I'm trying to do, I'll just put 
the discount amount here and I get the region here. OK, so region wise, I know the 
discount amount and also I'm getting into the sales amount here. 
  
OK, so region wise, I know the discount on sales and just changing this. So you can 
simply see what is the region by sales and how much is the discount offered in that 
particular region. You can compare them or else you can use other kinds of charts to 
try to understand the discount and sales. 
  
So now you can understand how sales and discount is varying by region and by 
category. You can also get the some other element. You can get the customer 
segment here so you can have further segment like, for example, discount amount 
sales in central region. 
  
So for each of the type of the segments that you have, so you can reorder them to get 
a different impact. So like this, by creating calculated values, you can improve your 


# Page 5

 
 
 
 
 Page 5 of 5 
 
visualisations and the information they are conveying. So this is simple metadata 
management. 
  
Again, I advise you to look at the different types of metadata management examples 
that are there in Tableau environment and get familiarised with them. Thank you. 
 
 
----------------------------------------------------End------------------------------------------------------- 
 
