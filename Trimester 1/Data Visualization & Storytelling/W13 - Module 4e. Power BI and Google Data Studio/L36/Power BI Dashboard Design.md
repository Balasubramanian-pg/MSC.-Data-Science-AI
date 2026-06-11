---
title: W13 - Module 4e. Power BI and Google Data Studio - Module 4e. Power BI and Google Data Studio
module: Statistical Modelling And Inferencing
week: W13 - Module 4e. Power BI and Google Data Studio - Module 4e. Power BI and Google Data Studio
---


## Page 1

 
 
 
 
 Page 1 of 20 
 
Power BI Dashboard Design Transcript 
  
Hello everyone, welcome to BITS Pilani Digital. Today we will continue our learning 
journey for the course Data Visualisation Storytelling. We will be now looking at our 
last lesson of how to build dashboards using the Power BI tool. 
  
You have been exposed to the Power BI environment in the course earlier, but now 
we will take it to the final extent of building dashboards and trying to convey story to 
your audience. What you are seeing on the screen is the EU Superstores sales data 
and I have created a dashboard for this which is representing the region-wise, 
category-wise sales and it is an executive dashboard which is used for understanding 
the sales performance across different regions. So before we get into today's lecture, 
I want you to upload the data that is available to you. 
  
We have used the same thing for our Tableau exercise also. We are now using this in 
the Power BI environment so that you can compare and contrast both the tools and 
learn from there. So the objective for today's class is to recreate the dashboard that I 
am currently displaying and what are the steps involved in it, how do you clean the 
data, how do you arrange the data, compute some measures, arrange these 
visualisations, customise them and improve their look and feel. 
  
Finally, you will be able to present this dashboard to your audience or to the top 
management. This is what you can try to do. Now let us see the basic functionalities 
of this dashboard. 
  
For example, I am selecting on this particular state. I am getting California here. Data 
related to California is getting highlighted. 
  
I am just clicking again on this. The entire data is changing. It is the overall data. 
  
Overall $22 million is the sale of this particular store. And then if you click California, 
you are getting about close to $4.57 million as the sales from the state of California. 
So the interactivity is a key thing in the dashboarding. 
  
We will try to develop the interactivity but also simultaneously present many measures 
that can be used for taking business decisions. So you can see sales per customer is 
$793. Profit is very high here in this case. 
  
Overall profit is $77,000. Profit per customer is $132. Profit percentage of sales is 17. 
  
Average discount offered in California is 7%. These are headline numbers. Now let us 
try to compare this with Michigan. 
  
Michigan also has similar sales but higher profit per customer. But overall sales in 
Michigan is very, very less compared to the overall sales in California. So as an 


## Page 2

 
 
 
 
 Page 2 of 20 
 
executive, you would be looking at what is the levels of efficiency, what is the discount 
I am offering. 
  
So this particular graph here shows the average discount profit per customer in the 
furniture category. Then you have the technology category like that. So you also have 
the different regions and different product lines. 
  
You can select all of them and try to see. In central region, I am talking about 
technology. So like this, interactivity will help you to navigate the data and understand 
your customers, understand the process. 
  
And once you want to come out, you can just double click on that. So you will get back 
to the original dashboard. So now we will try to recreate this dashboard. 
  
Please follow step by step with me so that you can practise this and use this in your 
course learnings. So what I am doing, I have already uploaded the data. I have already 
uploaded the data in the Power BI environment. 
  
So there are three sheets here. Orders, peoples and returns. For simplicity, I am just 
using the order sheet. 
  
Like in the case of Tableau, in Power BI also, you can use the manage relationships 
column. I am just showing this so that you are aware of what to do. So you can create 
relationship between the sheets and also simultaneously use those variables while 
doing your dashboarding. 
  
Right now I am not doing it. I am just doing a simple dashboarding for you. And then 
we will be able to take it from there. 
  
And before I do the dashboarding, let us see what other things I have done. I have 
computed something called the quick calculations or quick measures like profit per 
customer. What did I do? All that you have to do is, for example, let us say we will also 
do one thing, quantity per customer. 
  
And this saying the new measure. So new measure means you have to type the 
formula. But there is already a thing called quick measure. 
  
Once you take the quick measure, I am saying, okay, I do not need sum of sales here. 
I need quantity. So I just add sum of the quantity and count of customer ID. 
  
And this time the count of customer ID should be distinct count. Okay, it should not be 
that some customers might be buying again and again. You want distinct count, how 
many actual customer, what is the sale of quantity per customer. 
  
And you just do add. So you will be able to create a new measure which is not there 
in the original data. And this will be stored only in this particular system. 


## Page 3

 
 
 
 
 Page 3 of 20 
 
  
And if you want to export it, you can export and use the data. So what we can do for 
the sake of comfort, click on these three dots that you see behind the variable here. 
And you get the different ways to use this. 
  
So just a second. So now we have computed the quantity per customer. So I am just 
renaming it as quantity per customer. 
  
So like this you can add the values. So I have already added certain values like profit 
per customer. All that you have to do is drag the quantity that you are interested in. 
  
For example, once you click on this. Okay, so profit per customer. All that you will be 
doing is simply taking the profit. 
  
Okay, and the count of customer ID in the below. And then you will be able to do this. 
Similarly, profit percentage. 
  
I have done profit by sales. So this is the way that I have computed this. So once you 
see, this is where the formula is coming. 
  
So if somebody who is familiar with the DAX formulas or with the SQL query, you will 
understand. It is simply divide sum of orders comma sum of sales. So this is a quick 
measure. 
  
If you are familiar with formulas and comfortable with formulas, you can always try to 
create a new measure. Or there are ready-made measures in the system like average 
per category, weighted average, filters. Okay, then you have the time intelligence. 
  
Okay, rolling average year on year change. Especially this would be useful if you are 
dealing with growth rates of sales over the year. Then you have mathematical 
operations. 
  
Okay, these are very interesting. Please try to use them. Difference from a filtered 
value. 
  
Percentage difference from a filtered value. Filtered value. So conditional filtering. 
  
All these are very useful for advanced analytics. So I am showcasing the basic 
features. So you can select the division because we are interested in knowing how 
much is the discount and the profit per customer that is there. 
  
And whether discount is increasing the sales. Which regions are offering more 
discounts and what is their profit percentage. Okay, so these kind of metrics once we 
compute before we will be able to use them in the dashboard. 
  


## Page 4

 
 
 
 
 Page 4 of 20 
 
And also sales per customer. All this I have computed. Now I am ready to start with 
my dashboard. 
  
So first and foremost when you are doing a dashboard design. Okay, first and foremost 
thing in any dashboard design is to understand. Okay, how do you want to create the 
dashboard. 
  
And you have to be very thorough with the page navigation. Okay, so canvas settings. 
You want it to be 16 is to 9. Okay, so like this you can set the canvas. 
  
You can add a background if you choose to. Or maybe I am just adding a background. 
The entire canvas will become transparency is 100%. 
  
I am reducing the transparency. So you can apply whatever colour you like to. Always 
remember your dashboarding is for audience. 
  
Therefore, you would like to definitely try to understand the look and feel of the 
dashboard every now and then. So again in Power BI you have the similar desktop 
layout view and mobile layout. So if it is mobile layout, this is how it will look on the 
mobile. 
  
So you can try to understand how this will look on the mobile if you are creating a 
dashboard for your management. They are also expected to see this on mobile. So 
you can also work for that. 
  
So I am just switching back to desktop mode. We are now concerned there. So I have 
just renamed, I have created the page, gave a background title and renamed it a 
sample sales dashboard. 
  
Okay, this is what I have done. So I am saving it. Our objective is to recreate this 
particular dashboard in your Power BI environment. 
  
Okay. So first and foremost, I am trying to give a title to this. How am I going to do 
this? I am doing the title. 
  
So simple. I am writing and just going to, for simplicity, copy paste from this. I am 
copying this. 
  
Okay. And I am pasting it here. You sales. 
  
This is what I have done. Now I am going to adjust this. You can just drag this. 
  
It is up to you. How do you arrange your dashboard? Always, but only keep one thing 
in the mind that you have to keep this very elegant for people to process the data. 
Recall all your just flood principles, principles of effective visualisation, narratives to 
storytelling, so on and so forth. 


## Page 5

 
 
 
 
 Page 5 of 20 
 
  
But this is what I have done. I have recreated. First I have labelled the dashboard. 
  
So now I know this much space is available. And again, you are choice for making a 
dashboard. Okay. 
  
It's not only driven by the visualisations that are present, but the space that is available 
for you to present these things. So once we have these things ready, we will be able 
to present. I mean, we construct the dashboards in an efficient manner because every 
small detail, as you will see, will help you in either conserving the space or presenting 
the things in a more effective manner. 
  
So what we call it in normal parlance, consider this as a real estate area and every 
square inch or every space that you are using, you should be optimising it for more 
utmost impact. Okay. Yeah. 
  
Now let's continue to build visualisations into this space one after another. So first and 
foremost, I would like to create this particular headline which talks about summary 
stats or the main key elements. Leave about all the visualisations. 
  
Remember in our second week or in the very second lesson, we have said that simple 
text. There are a couple of visualisations, about a dozen of them that you will be often 
using. And if you are thorough with using them, there is no need to worry about the 
advanced or very sophisticated visualisations. 
  
Most of your data visualisation exercises can be achieved by using very simple tools. 
The first and foremost in that order is using simple text. So we will now showcase that 
particular part in our dashboarding. 
  
So whenever you look at any sales, you will ask what is the total sales and how many 
is the sales per customer. And what is the profit I am getting and what is the profit per 
customer and what is the profit percentage. I am having roughly 12% as the profit 
percentage and 16% is the average discount that I am giving across all my stores. 
  
This is the headline numbers that I am getting and I want to recreate it. Or I want that 
to be shown as the most impactful thing and that is coming right at the top. So first 
what I am trying to do, I am using this something called a multi-row card. 
  
This is what I am using. I just grabbed it here and you just add the numbers. So first 
what I am trying to do, I am adding the sales, then sales per customer, then I have the 
profit. 
  
I have the total profit, profit per customer, profit percentage and the discount. So 
discount again, now please follow each step carefully so that you understand how 
what is looking like this is now looking like this. You can customise each and every 
element of this particular visual. 


## Page 6

 
 
 
 
 Page 6 of 20 
 
  
In this case, this is a multi-row card and achieve this particular thing and I would say 
this is still not at the most efficient thing. You can still further improvise, you can give 
more colouring here, make it more impactful and designing a bland dashboard 
purposefully. So that once you go back, you would try to improvise it and use your 
creativity and artistic talent to give more look and feel to the dashboard. 
  
So I'm just coming back here. So this is the number. So what are the things that we 
want to add? So first of all, we are not interested in the sum of the discount. 
  
OK, we want the average discount. OK, if you go back to the data structure, this is why 
understanding the underlying data is very important. To create an effective dashboard, 
you should know what is the data representing. 
  
The discount column in our data represents the percentage of discount offered on the 
sale. So adding that up across all the sale values that we have about 7000 sale entries, 
you are getting this number, which does not make any sense. So it is our job to place 
the right metric. 
  
So what I'm going to convert and just making it average. So what is the average 
discount offered across all the sales? So this is the thing that I am looking at. And now 
this I can look at both at the product level, region level, state level or subcategory level. 
  
I can always compare these numbers. What is the sale? What is the sale per customer 
in that particular bifurcation? Maybe eastern region technology products. How many 
customers are there? What amount of sales have happened? What is the profit from 
them? What is the profit from that subset of customers, profit percentage and what is 
the discount offered to them? So in this way, it's a very clean numbers that we are 
getting, which we can use then to showcase how that region is performing vis-a-vis 
others. 
  
OK, now I've just done this and I'm just dragging it up right next to this particular space. 
And please look at and not merging them. I am leaving some amount of gap between 
these two, the title and the sales text to give a larger impact, a natural impact to the 
main table. 
  
OK, I've just dragged it here. Now let us look how to adjust each one of this. OK, so 
you have some of sales sales per customer. 
  
So instead of some of sales, I'm just going to use this particular rename for this visual. 
It won't rename the entire thing. It just renames for this. 
  
I'm just saying total sales. OK, this total sales. Then if you want to. 
  
OK, here also you can do a quick measure and do something. And then there are 
ways to if you want to present it as an average, you want to present it as a standard 


## Page 7

 
 
 
 
 Page 7 of 20 
 
deviation, median, all this you can try to do. And you can rearrange them on how do 
you want them to show in the appear on the visualisation. 
  
Now coming next, let us try to add more context. This is not right way to present. It has 
to indicate whether it is dollars, whether it is actual units percentage. 
  
You should help your audience to use lesser cognitive energy for processing data. So 
let us try to do that. So I'm just going to the call out and just going to increase the size 
to 18. 
  
So now this looks larger than going to category labels. I'm just trying to look it also at 
18. 18 is large and just making it 14. 
  
I don't want to spill over my table. So this is where what I'm trying to say is like you 
have to be mindful of how your dashboard looks once published onto the browser or 
onto the desktop screen. So it is the UX becomes very, very important. 
  
User experience is the central piece or what we have been saying in the first six 
lessons. Audience are at the central of your any data visualisation exercise. And this 
is where it is coming live into practise. 
  
We are always thinking from the perspective of the audience or the person who is 
looking at your dashboard. Now, coming back to this, let us see. I have done this. 
  
I'm just making it bold. OK, I can also change the font colour or I make the font colour 
conditional also based on certain things. So if it is all profit making. 
  
OK, so what we can we can then do this. What I'm saying rules and it should be based 
on the sum of profit. OK, and if the profit is less than zero, I want it to be the entire 
things to be read. 
  
So automatically I will know if the region is having negative profit, which is lawless. All 
the numbers will change in colour, indicating that there is an issue in this region. Let 
me show an example here. 
  
I'm clicking maybe on Texas. Yeah. So if I'm clicking on Texas, there is negative profit, 
which is indicated in bracket. 
  
OK, and the profit percentage is negative. The colour of the labels has changed to 
orange, indicating that there is an issue, saying that at least there is negative profit 
and there has to be an attention to that. So we can use conditional formatting to bring 
more context. 
  
OK, conditioned on specific variables and their performance to enhance our visual 
appeal. Now, going back to this, let us try to further add more values cards. OK, so 
you want to add background colour to the card. 


## Page 8

 
 
 
 
 Page 8 of 20 
 
  
Maybe if you add background colour, this is how it is looking. I don't intend to do that 
here. So and then you have the border position, top, bottom, right and all. 
  
So ascent bar and just clicking the bar that you saw here is an ascent bar. I don't want 
that. And even if you can give an ascent bar, you can also give a colour to that and 
you can make it more thicker. 
  
So just to give some look and feel to that. OK, I'm just adding it for the sake of showing 
this feature. So this is what I have added. 
  
So then again, coming back to the general features. So you don't need any title here. 
OK, and then data format. 
  
Now coming to data format is the most important thing. And before data format, let me 
also explain. Always, always try to add a visual border to anything and everything that 
you are doing. 
  
Each visualisation, if you go back to this, has a border. And once the border is there, 
it is really, really ideal and easy for you to view this. OK, look at this. 
  
So it is very simple. You are able to see each element distinction. It is distinguished 
and you can click on that without border. 
  
It becomes very overlapping and it's very clear to have a boundary around each 
visualisation. So it's a suggested as a best practise. Then let us look at I have put the 
border. 
  
Now I'm trying to. OK, and now and I don't need data right now. I'm just trying to. 
  
OK, I'm trying to format the data. So data format, total sales is total sales. Format is it 
is a currency number that is not in rupees Indian. 
  
It is US dollars. You can choose from the entire array and I don't need decimal places. 
I'm making it zero. 
  
So now this is all my sales is looking at. So this is the data is done. Now I'm going to 
sales per customer. 
  
Again, it is in currency and I don't need it to be zero. Then I'm going to have being US 
dollars. So I am going to make all those changes. 
  
So once I'm making the again, I have to select some of profit again in currency. I'm 
going to do that for USD and remember to make decimal places zero. Now coming to 
profit per customer, the profit per customer again is currency. 
  


## Page 9

 
 
 
 
 Page 9 of 20 
 
OK, then I'm making it dollar zero. So now comes the interesting point. You need a 
profit percentage, which has to be in percentage and just make it zero decimal. 
  
We are not bothered about how accurate it is right now. We are just indicating it at an 
average level. So again, discount is also a percentage and make it zero. 
  
So now we have all the elements here with you. So you can try to see the call out. OK, 
category labels, cards. 
  
So you can talk about the positioning, what is the bottom style and all. So we can play 
around and what I advise the best way to learn this is to experiment as you go along. 
So I have done this. 
  
So we have also got the main tab in place. Now let's try to build a map visual. I'm using 
Azure Maps here. 
  
Just clicked on this for location and this dragging the state variable and dropping in 
the location. Automatically, you see Azure has generated the state locations as 
bubbles. OK, it has given the bubbles as state location and just dragging it and 
adjusting it. 
  
So this is what you have to plan as an analyst, as a business, as a data visualisation 
person. Where and to what extent you will present the visualisation and what 
information it will carry. So you cannot make it too small. 
  
You cannot make it too big. Then you will lose a lot of space where you can present 
the other visuals. I have done this. 
  
OK, so now let us look at customising. What are the major data fields that you can put 
into? So what I'm doing, I don't need the you can try to. I don't need the header icons 
and switching them off. 
  
OK, title also I can put. Title I can customise title as state wise sales. OK, is this what 
we represented here? Yes, statewide sales. 
  
This is what we represented here. So I'm just going to the title, clicking here, going to 
the title. Statewise sales. 
  
I just want to make it gold centre and background colour. I want it to be uniform to the. 
Yeah, and so I'm just making it uniform. 
  
So I've done all this. Then you can also keep a divider which will distinguish between 
the area and also this is up to you. Whatever extra fonts you want to extra visualisation 
features that you want to create. 
  


## Page 10

 
 
 
 
 Page 10 of 20 
 
Now let me put the data fields for the size variable. I am getting the sales data. So the 
sales is in proportion to the size. 
  
And I also want to add most relevant factor, which is region. OK, I can also do this. I 
can just have the legend as per the region or I can also put the category. 
  
OK, if you put the category, this is the information. And every time you click, you will 
get to know what is the sale rate of the category in a particular region. What is the 
sales for different categories, office supplies, technology and furniture. 
  
And instead of sum of sales, what you can show as percentage of grand total. So then 
you get to know what is 6.7 percent, 6.2 percent overall. OK, overall furniture sales 6.7 
is coming from the California region. 
  
So like that you can do, but this is not relevant here. This does not convey anything to 
us. So it conveys some information, but that is not more relevant. 
  
So what I'm trying to do, I'm trying to get region. OK, I'm trying to get region into this. 
So I just added region here. 
  
For example, here we will try to use the particular legend consistently across all the 
graphics. So therefore, there is no need to mention this legend here, which is eating 
away the space. So I'll just go here. 
  
I'll just show what I'm trying to mean. For example, in this particular graphic, I have 
used the central east west regions consistently across all the places. So it is easier for 
a person to correlate that. 
  
OK, purple means western region across all. So once I start with this purple here, 
everything purple represents western region. So like this, you can achieve the 
commonality. 
  
So this is also in line with our principle that we have spoke earlier that you have to use 
consistent colours across dashboards or across pellets that give some sense of 
consistency for the audience and they will be able to readily correlate that. So I'm just 
going to turn off the legend on this. So now your graphic becomes a little bigger. 
  
So we have done this. So now this is around here. Maybe it also has some additional 
elements. 
  
So let us see. So effects. I want back. 
  
I just want a visual border. Yeah. OK. 
  
So this is the thing that we are done. So background colour is this. Yeah. 
  


## Page 11

 
 
 
 
 Page 11 of 20 
 
So now it is contiguous with whatever tile style we are having. So now this is the sales. 
And next we are trying to have the scatter plot. 
  
Or let us talk about this pellets that are around here. So what is the pellets here? 
Region wise sales, a simple tree map, category wise sales, again a tree map and 
segment wise sales. So I'm selecting a tree map. 
  
This is better than the pie chart. Pie chart creates some amount of confusion in terms 
of trying to read it in terms of circles. So pie chart is OK if you have lesser categories 
or absolutely are trying to focus on one kind of distribution. 
  
We have multiple distributions to show simultaneously. So in this way, tree map is 
better. So I'm just getting first the region. 
  
Then I am getting the sales. So this is the thing. And then what I'm trying to do, going 
to this particular layout and I'm making it verified. 
  
Sorry, I'm making it binary. OK, so that it looks close by. And actually the size of each 
region is representing their contribution to the sale. 
  
So now I have this. Interesting part is I can just go here, make it region wise sales, 
bold, centre, background colour. And OK, can go to effect, make the background, the 
visual border on, then background to be this. 
  
I've done all this. What I can now simply do is copy paste this, drag it here. OK, instead 
of region, I get the category. 
  
So, yeah, category sales. OK, I can go to the title. Right. 
  
All that I have to do is go to the title, say category wise sales. Right. Then copy paste 
them below. 
  
And here I have the segment. So category, then segment. I'm just going here, 
removing the category. 
  
I'm just including the segment here. Right. And going to the title, general, then right. 
  
Segment wise sales. I've done all this. Now, what is that I'm doing more, even more 
here is I'm trying to adjust them. 
  
OK, so that I have space for other visualisations because they are conveying the major 
information that I want. So. I'll also explain why I chose a tree map and why I'm 
including almost similar things again and again on the dashboard. 
  


## Page 12

 
 
 
 
 Page 12 of 20 
 
So try to equalise the construction. So it is like actual, like a architectural piece, like an 
artist. You have to plan each and every element of your dashboard and try to bring 
most more aesthetics into it. 
  
OK, I'm trying to equalise this particular. So this red lines that you are getting help you 
as visual cues in arranging your visualisations. OK, they will try to help you in aligning 
things in symmetrical fashion without losing or without much effort. 
  
So. So I just intend to have some gap between them. So I'm trying to achieve. 
  
So in these cases, if you are working on a laptop, it might be quite taxing. So try to get 
used to it. OK, or else you can work on a desktop where things will become more 
convenient to work. 
  
Now, what I'm doing, I'm also trying to use the cursor bars. I'm not using my mouse. 
I'm using the arrow keys on the keyboard to move the palettes around because finer 
movements cannot be drawn by hand. 
  
So this is how I have arranged all these three. Now, what I'm trying to do, let the region 
wise sales indicate the colour. OK, so west, east, central and south all have the same 
colours. 
  
But for category wise sales, I'm going to use a different colour pattern. OK, I'm going 
to use the conditional formatting. I'm using the gradient. 
  
I'm adding a middle colour. OK. And I'm going to modify that using a particular colour 
palette, central value and the highest value to be the darker shade. 
  
OK, so I've done this. Then I'm in segment wise sale. Also the same thing I'm doing. 
  
I'm doing the conditional formatting. I'm going to gradient, add middle colour. I'm going 
to change the colour maybe to this. 
  
Then I have the darker shade or the darkest shade. So now why am I doing this? Just 
to distinguish here between the region wise colour, which I'm also using as legend in 
other visualisations. I use the same thing here also. 
  
It is confusing and I don't want that confusion to my audience. But my major purpose 
here for including these three types of tree in the same visualisation. OK, I can also 
draw a vertical line, the stacked bar or I could have used a simple area charts. 
  
My point here was this particular palette. OK, the tree maps, all the three tree maps 
working together act as automatic filters for me. So they give a very nice look and feel 
at the same time without inserting filters or trying to indicate another functionality on 
the dashboard. 
  


## Page 13

 
 
 
 
 Page 13 of 20 
 
OK, the same thing I can achieve by what I'm trying to say. If I have a slicer, I have a 
slicer. I can do this. 
  
I can select central region. Right. I can select East region. 
  
I can select South region, but I don't want to do this. I don't want to lose that particular 
information. OK, I know anything Eastern region. 
  
Let us say North Carolina and Kentucky almost have similar sales, but Alabama, 
Mississippi, Arkansas and Louisiana have lesser sales. That is fine. But I want to know 
the information also simultaneously. 
  
So I'm going to revert back to the original thing where I have the palette. Right. I have 
the palette. 
  
So I have the tree diagram, which clearly shows me if I'm just clicking on the centre is 
not only showing the states that are in the central region, but also it is showing 
automatically the quantity of sales in the technology category by the Eastern region 
and the furniture and the office supplies. Now, if you want to also indicate which region 
has to come here. So you can just add the in the tool tip. 
  
The narration that is coming is called the tool tip. In this, you want to add certain other 
data. Also, you can just drag the region here. 
  
So you get B. This is a change. This region is South. Maybe in this again, you can. 
  
Yeah. So we can we can do all that kind of features here. So that's why I wanted to 
have the tree diagram, which can automatically act as both as a filter and also 
showcasing the information. 
  
Now, I have achieved this particular functionality. And I also use the conditional 
formatting. So you can do this. 
  
And then what you can do, you can also add the data labels again. All of them all have 
borders. So if you add data labels, OK, you get the values there. 
  
So you can do that. You can add data labels which are not done earlier. So, yeah. 
  
So what you can do, you can make it colour to be black or you want to choose any 
other particular colour blue. So you you can choose whatever colour pleases you the 
most. And what is appropriate here? I am choosing black because the background 
becomes more evident in terms of the number. 
  
I don't want to lose that part. OK, so I have done the labels also. So you can quickly 
understand, OK, what are the sales. 
  


## Page 14

 
 
 
 
 Page 14 of 20 
 
So if I click on home, you can completely get the home values. And like that, you can 
do the slicing and dicing very easily. OK, now let me also get the another plot, the 
scatterplot that I am talking about, which is very important in the analysis that we are 
going to perform. 
  
So I am using the major space in between the central focus on the scatterplot. The 
analytical value is coming from the scatterplot. Rest all diagrams are coming from the. 
  
Rest all diagrams, rest all visualisations are just mere descriptive, but we are trying to 
build analysis into the scatterplot. So what is the scatterplot trying to indicate? The 
scatterplot here indicates average discount versus profit per customer. How much 
discount I am giving, how much profit I am getting across the regions. 
  
So average discount and profit per customer. And we will also see the size of once we 
select here, the size of the bubble is sales per customer. So you will also know, let us 
say for a particular eastern region, if you are talking about the eastern region, OK, the 
larger is the circle. 
  
You will know that is the average sale per customer is very high there. But and you 
can readily see the average discount and profit per customer in one particular go and 
make a comparison simply. So though this particular thing, which is furniture, has very 
high discount, average discount is around 15.5 percent or 15 percent. 
  
Profit per customer is very low at 8.21 and also the sales per customer is 561, which 
is lesser than the sales per customer in the technology. So like this comparisons you 
can do. We will now try to see how to achieve this. 
  
OK, so I'm going to simply select. First of all, I'll go do that. Add something to do 
something. 
  
So let me first add. The discount. To X axis, which is the dependent variable, that is 
our summarization. 
  
OK, we want to understand how discount is. So how discount is influencing profit. Per 
customer. 
  
OK, so yeah, so profit per customer. So this is what we have done. And now we want 
to understand this across. 
  
OK, now I'm going to do the basic elements. I'm going to. Yeah. 
  
Visual border background to be this. So I've done all that. And title. 
  
Average discount on profit per customer, making it central and making it bold. I've 
done all that. Now, what I'm going to do, I'm just going to add. 
  


## Page 15

 
 
 
 
 Page 15 of 20 
 
Right. The. Sales, not sales. 
  
Sales per customer to the size. Then what is the main distinguishing character? The 
main distinguishing character is both region and the type of the product. OK, category 
of the product. 
  
So what am I doing in the legend, which is what I want to make similar between these 
three visualisations? I am trying to get the region. So I got region in the legend. So 
now you can see this is purple. 
  
OK, then you have East, South and West. So the values are cut off here. What you 
can try to do is go adjust your X axis and Y axis because it takes an optimised view to 
ensure maximum visibility. 
  
So what we are going to do, we are just going to put zero. OK, and also maximum we 
are going to give about 300. So or maybe we review 200. 
  
So you get to see everything on them. Then what we are going to do, we are going to 
also add the category as the main thing. So now we have all the values. 
  
So some of them have below zero also. We will see. OK, so this is the reason. 
  
And you have got the graphic. What I'm trying to do, then what you can also do is use 
the analysis or add analytical elements to your visual. So here I'm going to add two 
average lines, the average line for X axis or the Y axis. 
  
So this shows the average discount value. OK, so average of discount. OK, you can 
also add the data label, which will show 16 percent is the average discount. 
  
So you can also data value display units is auto, none. OK, zero decimals. Sorry, you 
need two decimals. 
  
OK, 16 percent. Maybe you can make it thick red here. OK, so this is the way that you 
can format it. 
  
And the position is left of that. OK, then the line can be made less transparent to look 
it stronger and width also can be made higher. OK, maybe and use a solid line with a 
smaller width. 
  
Of course, a solid line with smaller width. All this I have done. So average discount is 
added. 
  
Now I'll add one more line. OK, I'm going to add one more line. This is not for average 
discount, but for profit for customer, which is horizontal. 
  


## Page 16

 
 
 
 
 Page 16 of 20 
 
OK, so I'm again going to make it solid that width is lesser. Maybe this time I'll make it 
orange or not. I'll use something which is not there. 
  
I'm going to make it till red. So this is what we have done again. Data label is there. 
  
So 61.02 here. I don't need the decimals. I'm going to make it zero. 
  
OK, so yeah, we have the 61 and 16 percent. These are the values that you have. And 
you can also use the shaded area part to include which is above and below the 
average. 
  
So this is a very interesting feature in Power BI where you can plot the average lines 
for especially the scatter plots. For each quadrant, this is above average for both 
variables. Above average in Y variable, but not in X. Below average in Y variable, but 
above average in Y. So below average for both the variables. 
  
Above average on X, below average in Y. So you can also have these conclusions 
very easily. So now you have a very big title. I want to edit it. 
  
I'm going to the general title. I don't need this much. This is average, discount, and 
profit per customer. 
  
So I just make it small. So this is the thing that I have ready. So I can just now look at 
this. 
  
OK, so Y-axis is getting truncated. I'm going to edit the Y-axis to include something 
like minus 10. Yeah, so it is even further, minus 20. 
  
And then X-axis also has to be edited. Maximum is 0.40. Now, 40 is too much. You 
can make it 0.35. Then also Y-axis has to go down much below. 
  
So I'm going to Y-axis, maybe making the range to be. So let us look at this. Yeah, so 
you have minus 0.93. OK, so minus 0.93. So taking 25. 
  
Yeah, now almost all everything is visible. X-axis minimum is, I'm going to give as 0. 
So now you have everything visible to you, clearly all regions. So once I select eastern 
region, you can see eastern region bubbles on all other graphics. 
  
That's how the interactivity is coming up. So let us construct the final graphic, and then 
we'll take it from there. Thank you. 
  
Now let us construct the final visualisation for this dashboard. We are now going to 
use the horizontal bar to understand what is the level of sales for the different types of 
category of products for major offices, supplies and technology across three central 
regions. This is already represented here. 
  


## Page 17

 
 
 
 
 Page 17 of 20 
 
OK, but we don't have the classification region-wise sales. OK, this is what we are 
trying to achieve so that we can know that which region is having most sales. What 
I'm going to do, I'm just going to take the horizontal bar, clustered bar chart. 
  
Sorry, yeah, clustered bar chart. And I'm adding, first of all, the sales to the X-axis. 
OK, then Y-axis is my segment. 
  
OK, not segment here. Maybe I'm interested in category. So we have this segment 
and category. 
  
So we have done this particular thing. Now, the feature that I'm using here is there are 
two ways to do this. One is I can get the region here. 
  
OK, I have got the region here and it is not looking very nice. Actually, it is conveying 
the same information. If I select this, I get the western region details. 
  
OK, or else I can select on the west. I get the western region details. So this is how I 
can achieve this function. 
  
But this looks very cumbersome, but I want to convey this information. So this is where 
instead of using it on legend, I get it into small multiples. OK, remember small multiples 
enables you to replicate the data, replicate the same graph across a particular 
dimension. 
  
In this case, the dimension that we are using is region. The same horizontal bar graph 
is repeated. And I don't want it to look like in four by four. 
  
So I make it one row and four columns because we need four regions. So we just have 
four regions, four columns. This is how the graph is going to look like. 
  
And then now I will start using the elements from our decluttering exercise and all other 
concepts to make the graph more visible. OK, and from a cognitive perspective, it is 
very difficult for the customer or the audience to read the numbers by comparing the 
x-axis values. So what I'm going to do in this particular graph, I'm going to enable data 
labels. 
  
OK, and for all series and I want them to be inside and OK, and value will be there, 
value will be bold. So and also I can also use the colour to be black. So it is evident 
very clearly. 
  
White is also evident, but it's up to us. You can also use, OK, white and make less 
transparent. White is also fine. 
  
You can also increase the font. OK, this is the values. But the point that we have to 
remember is we are now let us talk about a smaller region. 
  


## Page 18

 
 
 
 
 Page 18 of 20 
 
OK, the graph becomes very small. So we should be able to also account for such 
kind of cases. So we will try to keep the font at the minimum. 
  
So inside and we don't want to work for the text. OK, some of the sales is not required 
here. So I'm just going to keep the font smaller. 
  
OK, so that I can accommodate other things. And I'm using OK, let me be white colour 
for a while. So then what am I going to do? I'm going to remove my X axis. 
  
OK, so I'm going to keep shared X axis is common because they're sharing the same 
X axis. And this is where OK, I am removing the X axis values. There is no need for X 
axis. 
  
And that is saving the space directly getting attention to the person where the data has 
to data can be interpreted. Then you also have the OK, we have the small multiples. 
We have the layout. 
  
OK, whether we want border. I don't need border. So did we use border here? Yeah, 
so yeah, you can also use instead of using border. 
  
I am not using the border. What I'm going to do, I'm going to do something more 
interesting. So let me go to the small multiples. 
  
There is border. You don't need border, but I'm going to put background for each one 
of this. So that is creating a natural barrier between all of this. 
  
And this is the border that I'm going to use a second colour. Right. And then then I'm 
going to also use the bars already already are there. 
  
So we can use the colour. OK. Different colours if you want to use for different 
categories that you can also do. 
  
For example, if you are using a legend here, you can also use the same legend. But 
I'm not interested in this. My objective here is to showcase the region wise sales that 
we are going to have. 
  
OK. Now we have all this data that is ready with us. So title is on position is healthy. 
  
OK. I don't want to. Yeah. 
  
This is the top centre bold. Yeah. A larger font for central east and west. 
  
OK. Yeah. So this is what I have done. 
  
So I have the region and I don't. Yeah. So what I can do. 
  
Right. Then go to the title. See here. 


## Page 19

 
 
 
 
 Page 19 of 20 
 
  
Region sales. These are sales by category. OK. 
  
And then make it bold. Make it centre background colour to be this so that it is 
continuous with whatever we have. OK. 
  
So then I have done. I'm going to general. I'm going to the efforts. 
  
I need background colour. I did visual border. My background colour to be seen. 
  
OK. In this case. Yeah. 
  
This is the problem here. What I'm going to do. I'm going to use a slighter differential 
background colour. 
  
So I still have that distinction between the background space and the different small 
multiples. So now everything is ready for me and I have everything here which is 
looking like exactly like this particular dashboard. OK. 
  
So we have this ready here then what I'm going to do I'm going to add one final element 
that will make the dashboard complete for example let us look at the from a user 
experience perspective there is some amount of effort that has to go in terms of 
reading this particular elements which are white in colour I want or you can try to 
change them and simultaneously these are looking very small so I can try to go and 
make it okay what you can try to do let us try to do that part in the small multiples okay 
the background colour we can make it okay functional okay try to based on a field 
value it should be region okay so maybe we can give okay the first if rules region if it 
is first if this is let us say central then use blue colour okay then add a new rule if it is 
sent it is west use the maybe purple colour right then let us try to see this so now we 
are getting this particular background which is then corresponding to the tiles I just try 
to showcase this but it is not adding much value but you can also try to do that so like 
this you can improvise your okay graphic and now let us talk about interactivity let us 
say I'm selecting a particular region here Texas okay everything else is coming all 
other things have a context I know I'm talking about Texas okay so in Texas I have the 
different this is the problem when you select ranges for a particular graphic because 
now you are now seeing only the technology but you also you are not able to see 
furniture and office supplies so what I suggest is you go back and try to make the x-
axis y-axis as auto so just do the auto theme so you will then have all the variables 
visible to you okay so you need not worry about setting ranges for but what is missing 
here is there is no way that I know this is Texas so what I am going to do I am going 
to insert something called a card so a card is a very simple thing okay this has just 
distorted my placement so I am just going to pull this off here a bit and I am here going 
to use this space for creating a card and what is the card that I am going to place here 
is dragging it here to make it look like this mind to this I'm just dragging the statement 
so you get first statement that is no problem because no selection is made so that's 


## Page 20

 
 
 
 
 Page 20 of 20 
 
how it will look like right so you can just take the call out value reduce the size to be 
more 36 then make it bold right so let the colour be there yeah then category label is 
not required you we don't need the label so first of state so I am still making it smaller 
okay 27 maybe yes it's Alabama 27 and call out value general effect again visual 
border but this time I am going to give a different background colour okay I am going 
to make it more evident that I want this to be seed by the party so that they know this 
is the state they are talking about right simple so now I am ready to go so I am good 
to go I have done all this so if I select this particular state here okay I know I am talking 
about Wisconsin I know what is happening in Wisconsin and then I talk about let us 
say Missouri or I am talking about California I know so now the person looking at this 
particular dashboard is well aware of which state they are talking and they know what 
is the sales across category and what is the contribution in the total region that they 
are having and overall Western region sales this is the coming from California 
technology this is the sales category wise segment wise this is the sales and you can 
also hover around and see what is average discount on profit that they are getting 
okay profit per customer and sales per customer whether this is justified and finally 
you can also compare the profit percentage versus average discount what are the 
values then you want to compare that with let us say Florida you just check Florida 
you see Florida is in losses and you can see which segments are actually having 
losses so so you can do much more I have demonstrated only the basic features 
please explore this and finally and most importantly once you are done with your work 
you want to share this with your colleagues you can just click on this publish button so 
you can then save it to Power BI environment and share the Power BI file with your 
people okay you can share in your workspace so once it gets so it will get replaced 
and you want to create or add something what you can do is we can simply okay you 
can simply duplicate this so you can just duplicate this you can duplicate this so you 
get more then of course we can do a lot with filtering on this particular visual particular 
page and across all pages and also trying to create the particular if you are selecting 
the entire page how the page should look like whether there should be a background 
to it whether how the filter card should look like for example filter pane you can give a 
border you can also give a background to the filter pane make it like this so just for 
showcasing I'm doing this you can do all these features at once and then make it more 
interesting for your audience okay remember dashboarding is all about trying to utilise 
the space in the most optimal fashion maintaining aesthetics and finally giving a look 
and feel to your audience and interactivity to them okay thank you. 
 
 
-------------------------------------------------------End---------------------------------------------------- 
 


Tags: #statistics #machine-learning #data-science #statistical-modelling