---
title: W12 - Module 4d. Tableau (Continued)
module: Statistical Modelling And Inferencing
week: W12 - Module 4d. Tableau (Continued)
---


## Page 1

 
 
 
 
 Page 1 of 11 
 
Building Your First Advanced Dashboard Transcript 
 
Welcome to BITS PLANET digital, today we will continue our learning journey for the 
course data visualisation storytelling, we will be now learning how to construct or 
develop dashboards in the Tableau environment. In the last couple of lessons, we 
have learned how to use the features in Tableau public, we have imported data, 
constructed a few graphs, understood how to create joins or relationship between two 
different sheets in a data source. And also finally, we also learned how to do a visual 
analysis. 
  
Now we'll combine all these learnings for developing or designing dashboards. So 
primarily, once you have to download the data and import it into the Tableau public 
environment. For this particular lesson, I am using the sample EU superstore data, 
which is there in the Tableau public, it's a open source data. 
  
And the reason for using this is you can go back and practise even advanced learnings 
beyond this lesson for improving your knowledge and expertise in the Tableau 
environment. So I have already downloaded the data, all that you have to do is go to 
this particular page, and then download this particular data. And I have connected this 
into the Tableau public environment. 
  
So we have done this in the last lessons. So if somebody is facing difficulty, please 
refer to that. So now I am just dragging the order sheet to create the data source. 
  
So this is the primary sheet where you have the data. And then I'm also getting the 
people's sheet here and trying to establish a connection between them. So the 
connection is established. 
  
So automatically Tableau recognises the common elements and builds a relationship 
and you can edit it if needed. But we are now going with the default settings just to 
indicate how these two sheets are connected. So orders is also written related to the 
return sheets via order ID for people's it is a people sheet is related via region ID. 
  
So now we have established the connections, we are ready to build the dashboard. 
Now one thing in Tableau environment is you have to build dashboards, you need 
different set of visualisations. Let us say our task for today is to build an executive 
dashboard, consider the executive which is managing who is managing the entire 
stores across the entire United States. 
  
So he wants to understand what is the reason why sales, what is the discount value, 
whether discount is related to sales, so on and so forth. He wants to understand all 
this and you are tasked with showcasing a dashboard to him which captures all this 
information in a very crisp manner. And in Tableau to achieve this, you have to design 
individual visualisations and for each visualisation you have to use one sheet. 


## Page 2

 
 
 
 
 Page 2 of 11 
 
  
What do we mean by this? In Tableau framework, one sheet represents a particular 
visualisation and you can customise, develop, connect all the features for that 
visualisation in that sheet. Like that you make let us say four or five sheets and all 
these sheets are brought together as a dashboard. Now let us see first we'll create a 
couple of visualisations and then stitch them together to make a Tableau dashboard. 
  
So first sheet that I'm going to make is to understand the relationship between profit 
and discount and sales or I just want to first create the category wise sales. So one 
useful feature in Tableau is you can select a couple of categories and what we call as 
the dimensions and the measures. For example, I'm selecting category sales and then 
also the region and you can click on this show me button. 
  
So it will show you the basic tables that can be used for this purpose. OK, you have 
selected these two categories. OK, and you can click on the show me button to show 
the most appropriate visualisation. 
  
So you have the region and sales and I'm just getting the sales value into this. OK, I 
want it to be a table, not as a graph. So this is our first thing. 
  
So this is a simple summary statistic or the summary position of what is the region 
wise sales according to the category of according to the category. So simple number 
and then you can also include do some formatting here. I want this is a sales number, 
so it should not be confused with some numerical value I'm making it. 
  
So custom. No, sorry, there is currency. So currency format is already there. 
  
So I'm choosing currency. OK, and then you can choose any. So let me put United 
States dollar and I don't want again. 
  
Let me customise. I don't want decimal places. I want it to be zero decimal places. 
  
And this is the prefix. So this is the value that we have. So this is very clear. 
  
And what is the sheet name I want to give for this? So I am clear. So region and 
category wise sales in USD. OK, or else you can put simple dollar symbol here and 
try to make it central bold. 
  
So all these customisations will help you. OK, all these customisations will help you to 
understand the context very clear manner and help your audience to grasp the 
information. See, our objective is to help your audience to clearly get the information. 
  
So there are different fonts you can try. So whatever you want, the default is tab blue 
light. So and the colour is black. 


## Page 3

 
 
 
 
 Page 3 of 11 
 
  
So you can also change the colour. So I'm just taking this to be blue. OK, so blue 
colour. 
  
And then press OK. So this is what I have got. So now this is one simple visualisation. 
  
OK, remember the table visualisation. So you have a region and the category. Now, 
what else I want to do? I just want to go here, create one more sheet in this. 
  
I want to create a map. So for that, what I am trying to do is first select a OK, first I'll 
select state, OK, then sales. And I'll do show. 
  
So you see, you got the map for which the sales are shown. The state is the detail that 
you have here. I'm just closing this back. 
  
So now you have the states. So I just want to understand the sales per state. So my 
objective here is if I go back to this particular sheet. 
  
So whenever you are designing dashboard, you should have the final objective in 
mind. Our final objective is to showcase the sales per region and across different 
states. So once I select any particular region, I should be able to see what are the 
states in that region and how are they performing on sales or something. 
  
So what I am doing, I have the sales also. So but the tool tip, OK, also I'm including 
the discount. OK, so what is the discount I want to do? I want to compute the discount. 
  
For example, when I see this particular, OK, I'm getting sales as a number and 
discount is some summation. Summation of discount doesn't make sense because 
discount is listed as a percentage. So I'm going to change it as average. 
  
OK, what is the average discount offered in that particular region? So and we want 
average discount to be displayed as a again, I go to the format number. I simply 
choose it as percentage. Decimal places is one. 
  
So now I come and see the tooltip. OK, Oregon State has average discount of 28.9 
percent with $17,000 as the sales value. So again, tooltip, OK, and sales is there, 
right? So we can, these are the data that are coming in the tooltip. 
  
OK. So we can also format this tooltip colour and all we can do that. And then finally, 
what I mean, I want labels also. 
  
So what I want to label is the profit. So more than profit, I am I'm interested in 
computing something called as a calculated measure. You have already seen a 
calculated measure, right? So create a calculated field. 


## Page 4

 
 
 
 
 Page 4 of 11 
 
  
OK. So we want sum of profit divided by, OK, sum of packet, OK, sales. So this is OK. 
  
So I have done this. So you got the calculation one. So I did not name it. 
  
Maybe I should have renamed it. So profit percent, OK, profit percent, I renamed it. 
I'm taking that to the label. 
  
So again, this is the profit percentage profit as per as percentage of sales. And again, 
I'm formatting the number. I want that to be a percentage with one decimal or rather, I 
would say zero decimal percentage. 
  
OK, I did not. My bad, I did not just select percentage here and make it. Zero decimals, 
why zero decimals right now, these are looking very nice on the map, which is 
extended, but when we put it on a dashboard, you would obviously squeeze the map 
to a lesser area. 
  
So you should still be able to visualise this. Then what am I doing? I want to also 
change the colour palette. OK, so I want to colour. 
  
OK, edit colours and I want colours to be OK, this is also fine, but I just want to increase 
the colours to steps. OK, I want to increase the steps in the colour. So instead of five, 
I want them to be eight colours. 
  
And then this is what I have done. So automatically you have the eight gradations here 
and these are the sales that you have for each region. So what we are having is we 
are having higher sales and the profit numbers also. 
  
OK, so this is a multidimensional graph. The underlying colour represents the sale, 
whereas the number indicates the profit. So in that case, it might be OK, aggregate 
profit percentage. 
  
So this is what we are having here. So this is sales percentage and this is also the 
sales value. So you can see that New York has a large profit when it has aggregate 
24 percent profit to compare to sales and also has large sales. 
  
Whereas what is interesting is to see Nevada, which has about 20 percent profit, 
actually has low sales, which means it is more profitable than other regions where 
there are higher sales. For example, in Texas, the profit is negative, though the Texas 
represents a higher state. So like this, we can combine multiple dimensions in the 
graph. 
  


## Page 5

 
 
 
 
 Page 5 of 11 
 
And get it ready. So now we have the region, we have the geography. Now, let us try 
to understand how discount is related to sales, whether discount is increasing the 
sales or not. 
  
OK, now we have seen region wise profit. Now we are going to try to see region wise 
discount. So for this, what I am trying to do. 
  
So how do we study two variables and the relationship between them? We can use 
simply the cross tab. OK, so I'm just choosing the cross tab. So you have the average 
discount at 15.62 percent. 
  
OK, and the average profit is coming to be 28,000 dollars. Now, what I want to also do 
is I want to understand this with the particular region. So what am I doing? I'm adding 
the region wise. 
  
OK, sorry, I'm adding region to the. So in eastern region, I'm offering the central region, 
I'm offering an average 24 percent discount. I'm getting a profit. 
  
So more than profit, what is what would be more appropriate here? Because we are 
just talking about both percentages. So I'll just remove this. Yeah, so now both are in 
ratios terms, you can talk about. 
  
So you are offering 24 percent discount, but you are getting only 8 percent profit in the 
central region, whereas in the western region, your discount ratio is 10 percent profit 
ratio is 14 percent. OK, so in general, if your discount is increasing, your profit is falling 
down. So let us try to understand the profit and the sale relation. 
  
Also, what we have to see is like this is the profitable discount versus profitability. So 
higher is the discount, not necessarily you are having higher profit. OK, this is the 
conclusion that you can draw. 
  
It's a very good insight saying that higher discounts is not leading to higher profits. OK, 
so this is something and then what we can do here, we can also make the OK, we can 
also what we can do, we can also impose the size. OK, we can create one more 
dimension here by taking the sum of the sales as the size. 
  
So size of the bubble. OK, marker size, we can keep a large marker size so that we 
can see the regions with higher sales, OK, representing higher size of the bubble. 
Then also we can also include the distinguish the shape by the category. 
  
You can also include the increase one more dimension by getting the category. OK, 
you are now trying to understand the category wise differences, for example, plus 
indicates technology, how technology products, how furniture, how office supplies is 


## Page 6

 
 
 
 
 Page 6 of 11 
 
working across four regions. If you want to draw them separately, you can put it in the 
column. 
  
So you'll have four different graphs or you can put it in rows where you have the can 
also put it in the row column. So depending upon whether you want to arrange it 
horizontally or whether you want to arrange it. So if you have done a mistake, just click 
this button, you can go back. 
  
Yeah, this is the row wise arrangement. So here you have the furniture, office supplies, 
profitability and the you have the profitability and the discount region wise bifurcated 
as per the particular category of the product. So this is what you can do. 
  
And if you are not OK, then you want to also use the shape. Right. So you can also 
get the category on to the shape. 
  
So you should get to the different shapes for that. Yeah, so now these are different 
shapes, so it is more easy and vivid. They got these are all. 
  
Yeah, so for example, if you are talking about central region, OK, you can average this 
count is 25 percent, profit is 5 percent, sales are 1,67,000, which is up. So larger sales 
correspond to an average lower discount, you are capturing a lot of information. So 
now let us also try to see one more particular graph and then we will construct our 
dash. 
  
So before building two dashboards, it's always a good practise to label your sheets so 
that you know, OK, so that you know which particular graph you are taking into your 
dashboard. So this is category and region wise. Sales, OK, sales, discount, category 
and region wise, I would say discount versus. 
  
Discount. Versus profit. So this is what we are trying to showcase and always bold 
and centre, it will help you in final dashboarding. 
  
OK, so and also we have to rename this here. We did not rename. So this is simply 
you double click on this. 
  
You will get it here region wise sales and profit percentage. OK, so maybe region is a 
wrong name because here we are having the region as East West Central. So it is 
state wise sales and profit percentage. 
  
So we have done this. So it's very easy to identify them later stage. OK, now you also 
have the region and category wise sales. 
  
So now what else we can do? OK, what is another important metric that you would be 
interested in? You'd be interested in how much is the per customer, OK, sales that is 


## Page 7

 
 
 
 
 Page 7 of 11 
 
happening in each region. So for that, you need to calculate, you need a measured 
value. So I'm again going to go to sales, OK, create a calculated field for that. 
  
I have the sales, OK, some of sales because we have to take it for the entire and 
count. OK, count D, we need distinct customer needs. OK, so instead of customer, 
OK, it is I have to type it here. 
  
So customer underscore that is not underscore customer ID. So we have to do a 
measured value. So we are just typing a distinct count of the customer ID. 
  
One good thing with Tableau is if you type the variable name, it will suggest you what 
to take or it will show the list of variables that are there and the calculation is valid. 
Just apply. OK, so you got this particular calculation. 
  
So again, just trying to. You should. What what should we do? We should rename this. 
  
So primarily we should rename this. I'm renaming it. So I've renamed this as sales per 
customer, so which is readily available for you. 
  
You can just look at the. Try to get this data, so. So I bought this data here, so we don't 
need all this data, so let me just move this. 
  
So you have average sales per customer is around two thousand dollars. Yeah, to 
create measured values. So let us try to create the profit per customer. 
  
So you can just have to click on this profit, try to create a calculated field. So calculation 
is profit percentage. So you're trying to calculate the amount of profit that you are 
getting as percentage of your sales. 
  
So some of profit divided by some of sales. So in Tableau, the advantage is if you type 
the variable names, the right, if you type the variable names, the expression is 
automatically telling whether it is right or wrong. So let us see what. 
  
So now you have the right variable coming up. The calculation is valid. And once 
you've done that, you have the profit. 
  
You can simply drag it here so you can see 12 percent is the average profit on sales. 
So then likewise, you can also create per customer sales. So I just do a calculated 
field. 
  
So sales per customer. So I'm just taking sales, sum of sales. Right, sum of sales 
divided by count, I'm using distinct count because I need the distinct count of 
customers, so I'm just taking customer ID here, so I'm just doing OK. 
  


## Page 8

 
 
 
 
 Page 8 of 11 
 
So I got the customer sale per customer. Now I have the new measures. What is it I'm 
looking at is OK, I'm also looking at. 
  
Yeah, you can also create one more field, can also create the calculated field profit 
per customer. So I'm just taking profit here. OK, sum of profit. 
  
Right. Divided by count, distinct or. Customer ID, I got the per customer sales, sales 
per customer, sales per product. 
  
So what I'm going to do, I'm trying to what I can look at here is I can create, let us say, 
I want to create category wise what is happening to the sales and profitability. Let us 
take subcategory here. OK, and then I'm just taking the profit percentage to rows. 
  
So this is what is happening. And I can also order it. You know, what is the profit 
percentage per category can also have a combo chart. 
  
OK, combo chart can include many more elements. So what I am trying to do here is 
I can take the profit per customer. OK, into this graph. 
  
I can also know the. So I have the subcategory. Now the profit percentage and the 
profit per customer in the same graph like this. 
  
We can also do so. We can try to. Yeah, so we can try to change. 
  
This graphics and try to increase the more information content. OK, the point here is 
we are trying to create the calculated fields and measured fields, which will be helpful 
for us to present the data in a very clear format. OK, so anytime you should do a 
change. 
  
If you want to undo it, you just check the back button. You'll be coming back to it. So 
these are the graphs now. 
  
Now let us try it. Go and create a dashboard for creating dashboard. Please press on 
this symbol where there are four sheets in Tableau. 
  
The way dashboard works is you have the different individual sheets and you use them 
for creating the graphics. So in case if you want to modify anything. OK, so this sheet 
is not there. 
  
Just let me delete it. So in case you want to create anything, you create first in the 
sheets and then modify them as the graph. So I'm just removing this profit per 
customer. 
  


## Page 9

 
 
 
 
 Page 9 of 11 
 
I'm just interested in this. But what I'm going to add, I'm going to add region. OK, I'm 
also getting the region variable here. 
  
So it is now the subcategory wise. What is the profit and profit per region? So this is 
what we are also getting here. We also have the regional variable. 
  
The overall profit levels and also labels you can add. So this is profit percentage. I'm 
adding to the profit percentage. 
  
This is the label also I've added. OK, so I can do all these things. So you can remove. 
  
And if I'm interested, I'm not interested in this particular region. I'm removing it. But I 
want to add, let us say, profit per customer as the size. 
  
So it can also show the bars in different sizes, showing that what is the profit like this. 
We have to first curate the graphics that we want. And then later we can do the 
aggregation for the visualisation. 
  
OK, so this is a new dashboard. So you can always start with the title saying that what 
is the dashboard that we want? We want it to be named as executive dashboard. OK, 
executive dashboard for monitoring sales, executive dashboards, sales monitor. 
  
This is the name I'm going to give. So people know what is the thing. And I'm also 
going to add a background colour, make it centre align and do OK. 
  
So this is what I have done. The simple dashboard. And then now let us try to first 
create a horizontal container and also a vertical container. 
  
Horizontal container allows horizontal alignment, vertical container allows vertical 
alignment. What am I trying to do? So I'm trying to get the first, the overall sales 
description, because this is the numbers that people would like to see. So and then 
I'm going to, you can also drag the, yeah, I'm dragging the graph here. 
  
So now there are only two elements in my dashboard. And of course, this is the what 
we call as the legend sheet or the palette sheet where you are having. You can adjust 
the visibility of the legends, you can adjust the visibility of the legends. 
  
OK, now these are the two things. We also have the area graph and the bar graph. 
We'll bring them later. 
  
Now let us try to understand how your dashboard is working. First of all, in Tableau, 
you can have the different sizes of the dashboard. Here it is range we have given. 
  


## Page 10

 
 
 
 
 Page 10 of 11 
 
We also have automatic dashboard, which gives us the largest size possible. And you 
also have fixed size, which is customised to different things. Now I'm just looking at 
the desktop browser. 
  
This is what my desktop browser would look like. So I have to place all my elements 
in such a way that I get the maximum possible view, the best possible resolution. So 
this is how I have just arranged. 
  
But I also have two more graphs to come. So what am I doing? I'm using this as a 
horizontal container. OK, in that I am trying to get my area graph. 
  
OK, and also I'm trying to get the. OK, I have got the bar graph also. So this is how I 
place this. 
  
So right now, if you see, this is how the dashboard is looking like. So now let us try to 
first rename everything here. So instead of sheet name, we are just saying category 
subcategory wise is profit percentage. 
  
So again, I'm going to bold it, centre it. OK, I'm applying it. So I'm having this. 
  
Right. And what have you noticed? This particular subcategory graph is not best 
aligned horizontally because it is not it is truncating the text labels. So I want it to be 
vertical. 
  
So what I'm going to do, I'm going to get the sheet and here and just trying to. Here 
also I can do this. I can just swap the rows and columns. 
  
I got the name here and yes, you make the way that you can alter the graph. Right 
now, this is looking better. Yeah, but now, again, this is not that much readable. 
  
So always remember in the dashboard design, the primary thing is to ensure 
readability across all your audience. So this again, what we have to do, we have to 
use the OK. In this case, we want it to be a standard entire view. 
  
So this is how your dashboard should look like. It should stand the entire view. And 
now if you see, the dashboard is very clearly representing four or five things that you 
have. 
  
The executive dashboard saves monitor. You have the regional discount and sales. 
So you have the average discount, profit, sales and returns. 
  
So you can clearly also. OK, in this case, you can also go to sheet three and add the 
profit percentage. You can also add a profit percentage here. 
  


## Page 11

 
 
 
 
 Page 11 of 11 
 
OK, so you have the profit percentage which is coming now. And in fact, let it be right 
next to the. OK, you can write next to the sum of profits, you have the sales and the 
returns, you have the count of returns. 
  
Also, these are the values. Now, now come to dashboard three. Automatically, this is 
now updated. 
  
You also have the profit percentages that you can do the interactivity. So now also let 
us try how else we can improve the visibility of this particular dashboard. What I feel 
is we should be using more space for the graph, the map and lesser space for the, let 
us say, the scatterplot. 
 
--------------------------------------------------------End--------------------------------------------------- 


Tags: #statistics #machine-learning #data-science #statistical-modelling