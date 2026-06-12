---
title: W09 - Module 4b. Python Seaborn Package
module: Statistical Modelling And Inferencing
week: W09 - Module 4b. Python Seaborn Package
---

## Page 1

 
 
 
 
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

## Page 2

 
 
 
 
 Page 2 of 13 
 
seen this in the last class but I will just try to showcase the composition of the data set 
so it is clear. So I am just doing tips dot head 10 columns just running this. 
  
So this is the data set that we have seen earlier also you have the total bill amount, 
how much tip was given, whether the customer was female or male, whether he was 
smoking or he was a smoker or non smoker, the day on which they visited the 
restaurant and the type whether it is dinner or lunch and what is the size right. So this 
was the variables that we have here okay. So then we are trying to understand the we 
are trying to understand the categorical variables. 
  
Let us say one of the categorical variables in this data is the day, the day of the week 
on which the customer has taken the meal. So you can see that this is called a strip 
plot where the entire data is presented as form of a strip. For example you have 
Thursday and if you just plot the data for example we have just plotted the data based 
on the category called day. 
  
So we are trying to take high remember in seaborn you have to parse data the data 
frame into data then x-axis or x variable as day it you can directly call the column name 
and the total bill. So what is that we are trying to do we are just trying to understand 
how day wise bill amount is changing. So that is the idea and what does seaborn 
does? Seaborn does generally it adds a jitter to the points. 
  
Let me explain this without the jitter. So set jitter is equal to false right set jitter is equal 
to false. So my bad I am just running this again jitter is equal to false. 
  
So whenever you plot categorical data right the how the columns how the variables 
are done. So Thursday starting with the lowest amount it goes up to the highest 
amount which was 50 rupees on a Thursday and 45 rupees. So it is plotting everything 
together and it is very hard to read this kind of a data. 
  
So what does seaborn do? Seaborn does add something called jitter and it's a small 
amount of random disturbance that is created around each data point so that the data 
points are clearly visible in that particular category. It won't spill over but it would create 
a nice feel for the graph like okay it is the same graph but the random disturbance is 
added to the each of the data points so that you can clearly see the distribution of the 
points instead of them lying on the straight line. The algorithm adds the underlying 
algorithm adds a random jitter so that you have the clear distribution of the points okay. 
  
So if you don't if you set jitter to false you would get something like a straight line where 
all the points are stacked up sharing the same space it becomes little tough to decipher 
any meaning. So seaborn by default adds a jitter and distributes point okay around 
that particular category so that you are able to see the distribution also. Now coming 
to the second categorical plot that we are exploring is called a swarm plot okay or 
sometimes called the bee swarm okay. 

## Page 3

 
 
 
 
 Page 3 of 13 
 
  
It uses an algorithm to adjust the points along categorical axis to prevent them from 
further overlapping. So even in the jitter plot there is some amount of overlapping. The 
swarm plot further expands the data points and it gives a better representation of the 
distribution but works better for small data sets. 
  
If you have a very large data set this doesn't work. Let us try to see how does a swarm 
plot work. I'm just passing the command into the Colab notebook. 
  
So same data set is tips and the categorical variable I am interested is in day and it is 
the total build and it is the kind. So let me just for the sake of it change it to time okay. 
Okay let me first do with day then I'll do with time. 
  
So I have done this so the same graph is now has even more clearly without overlap 
or less overlap the points are presented indicating how is the distribution on the 
particular day okay. So you can see that on Thursday the bills are concentrated around 
most of the bills are concentrated around $10 to $20 and then you have about okay 
but on Saturdays and Sundays the distribution is little wider. So you can draw this kind 
and it looks more nicer than just presenting a straight line okay. 
  
If you just set jitter to false right so it is always better than producing a plot which 
doesn't have a plot just produces a straight line it is always much good looking okay. 
So let us try this for time of the day. So I am using the beeswarm plot to plot it for the 
time of the day. 
  
So you can clearly see lunch has lesser footfalls than the dinner okay. So yeah so I 
can also so you can by adding a swarm plot beeswarm plot you are able to do that. 
So what I have done I am just adding one more layer of I can overlay more information 
on this plot. 
  
I am interested in rerunning the plot so this is the time wise distribution of total bills 
lunch and dinner. On this I am trying to add whether the gender is making any 
difference. So I am just adding hue which gives the colour for particular categorical 
variable. 
  
I am just adding here gender. You can see by plot colouring the bubbles in different 
colours I am also getting another dimension of category plotted on this same plot by 
using the hue variable. It colours the male and female customers in different colours 
and you can understand that dinner male customers are more than the female 
customers. 
  
In lunch there are almost female customers are more or comparatively more than male 
customers. We can draw these kind of conclusions. So the next plot we will be we 
have done the hue has been done for male and female right. 

## Page 4

 
 
 
 
 Page 4 of 13 
 
  
Then this is for the we can just do that for smoker and tip whether they have yeah. So 
we can do one more thing here which is very interesting ordering of the categories. So 
sometimes you want the data to be in a particular order instead of lunch and dinner 
you wanted dinner and lunch or you wanted to have male and female in one particular 
order. 
  
So you can use this order function right and just use this order function to achieve the 
same. So I am just showing this so same category instead now we are interested 
whether the smoker is there or whether the customer is smoker or non-smoker 
whether he has tipped or not and you want to order as first you want to show non-
smokers then you want to show smokers. So this is what we have done. 
  
So this is what we have got. So simply order is equal to yes or no. So you get first no 
and yes and I can just alter this say I need first smokers then I need non-smokers. 
  
So you do this plot you get yes first and no later. Okay you can order the categorical 
variables on the x-axis. Okay you can try out for ordering the days in the month or the 
gender variable and try for yourself. 
  
So then you can also alter the axis. Okay instead of showing them what on the hard 
x-axis you can also show the categories on the y-axis. All that you have to do is the 
alter the x and y variables. 
  
Okay and you can achieve the same function. So what I am doing I'm just trying to 
change the earlier it was y variable was total bill and x variable was day and I'm just 
trying to alter the x and y axis. So I am getting the x and y axis and I am using the time 
whether it is lunch or dinner. 
  
Okay so on weekends most people are coming for dinner which is quite expected on 
the weekdays or through Friday you have fewer people on Thursdays which is a 
weekday you have most people coming for lunch then you have people coming for 
dinner. Okay so here by altering the x and y variables we shifted the axis orientation 
like we shifted the categorical variables to y axis and the quantitative variable to x axis. 
This would be very interesting if you want to plot a time or date series where you want 
dates to be on x axis and the categories on y axis so that you can plot the data. 
  
Okay right then let us see some other examples. Categorical now we will come to the 
categorical distribution plots. Till now we have seen some variation of the scatter plots. 
  
Now we will talk about distribution plots. What are the basic distribution plots? You 
have the box plot, you have the histogram. These are the basic distribution plots. 
  

## Page 5

 
 
 
 
 Page 5 of 13 
 
What does distribution plots indicate? They summarise the distribution values within a 
category or within the data set. So for example when you talk about male and female 
or the days different days in the week on which the tip lunch is a lunch or dinner is the 
customers have lunch or dinner and they pay the bill amount. So on any given day you 
have the distribution of the bill amount and the tip amount. 
  
We can study these things. How they are varying? What is the average value? What 
is the median value? What are outliers? What is the entire quartile range? So on and 
so forth. So for this you use a box plot. 
  
Okay and box plot is simply again you need not change. See unlike math plot where 
you have to use the specific code. In seaborn you can just indicate the type of plot by 
calling its name out in the kind. 
  
Okay for the kind variable you can just give the box plot. Okay and earlier here it was 
swarm. Right for this it was swarm. 
  
Instead of swarm I am giving box and just running the data. So I got this and if you 
wanted a horizontal bar all that you had to do was change the x and y variable. I just 
do total underscore bill and then I just do here day. 
  
Okay I'm just running this. So I get a horizontal box. Okay so it is up to you how do 
you want to orient the boxes. 
  
Right boxes are more pleasing if they are vertical but it doesn't necessarily be that 
way. If a situation demands you want to highlight the average at a particular level in 
that way quantitative variable. Okay it's easy to present like this you can choice and 
then let us do one thing you can also order use colour. 
  
Right all these options are available. So what does block spot indicate? The middle 
line indicates the median value. This is 25th percentile. 
  
This is the right 75th. These are the 1.5 times interquartile range on both ends. So 
these are the properties of a box plot. 
  
Now I want to add a one more categorical element or overlay something in the box 
plot. I'm just trying to get the colour by using colour on the smoker type. Whether the 
customer is a smoker or non smoker. 
  
I just added the hue and plotted I'm plotting the thing again. So I get the box plot for 
smoker and non smoker. So you can see that. 
  
So these graphs indicate on Thursday the smokers bill is varying from maybe around 
12 dollars to 20 dollars with median values being somewhere around 15 or 17. Non 

## Page 6

 
 
 
 
 Page 6 of 13 
 
smokers have a larger distribution. There is more variability in the bills of the non 
smokers. 
  
Larger is the box and larger are the whiskers. The columns on that the end are called 
whiskers. So if larger is the distance between these two whiskers and larger is the 
length of the box the distribution is so widely distributed. 
  
And if it is symmetrical on both sides it has value symmetrical on both ends or both 
sides of the median. If it is very compact the distribution is very compact. So the length 
of the box shows the width of the distribution and the symmetry of the box shows the 
nature of distribution around the median values. 
  
So box plot is very intuitive to understand the distribution and also compare across 
categories and these tiny little white dots or circles represent the number of outlier 
values so that you know everything about the distribution in a given in a very simple 
graphic. Then let us try to use something called a box and plot. It is more appropriate 
for understanding the distribution of a very large data set. 
  
This is a modified box graph nothing more than that a box plot. So what we are trying 
to do is like we are trying to understand the we are now loading a different data set 
called diamonds for this purpose for understanding the box and plot. Let us first explore 
the data set. 
  
So I have loaded the data set and then I am doing diamonds dot fed and I am 
downloading the 10 10 rows okay. So so I have I am seeing the data structure so this 
is the carat cut colour clarity depth okay price there are other dimensions with the data. 
So this has been uploaded and then we are now trying to understand the distribution 
of that data. 
  
So so this is a very large data set you can understand that by using the shape 
command there are about 50,000 rows and 10 variables. So we have seen that we 
have seen the 10 there are 10 columns so 1 2 10 variables 1 2 3 4 5 6 7 8 9 10 right 
and there are 50,000 columns and plotting box diagram for them would be not very 
ideal. So let us try to do that with box and then go to the box and plot to understand 
the difference. 
  
So I am just using the same data set so I am passing a different data set now passing 
diamonds here so it has come then I am using let us say the colour and yeah so I am 
using a price. Let us understand the how colour and price are related for different 
colours what is the price and I want to colour it by the cut type okay and kind is box oh 
look at this so there are so many out layers this is how a box plot will look like okay. 
So there are five colours okay so let us first take away if the it is cluttering it is definitely 
cluttering the plot we are not getting any idea so first I am removing the colour just 
doing this so yeah so you can see these are so many out layers are there in diamond 

## Page 7

 
 
 
 
 Page 7 of 13 
 
price actually there might be other influencing factors like the carat weight and all and 
then we are having the distribution okay across the different colour of the diamond and 
the price is also scaled on the y-axis but this is very in some sense it is conveying 
some information but it is very it is not very ideal to have out layers represented here 
you would like to understand how the out layers are also distributed so in these cases 
you can use a box and plot it is simple I am just taking this code I will explain it here 
so I am loading the data set we have already reloaded the data set there is no need it 
is a snscat plot passing the data which is yeah so what am I doing here by calling the 
data I am passing a subset of that by taking the colour okay I want to are sort values 
based on the colour data is based on the colour okay it is a subset for each colour 
data then we are again plotting colour against price and kind is boxing so if you just 
run this so what is happening you are actually rearranging the data in the increasing 
order of numerical values okay so that we have the lowest prices here okay and the 
highest price okay highest number in the last column last category we are sorting the 
data so you are able to see the increasing order okay let us now try to do this without 
this sort thing and see what happens okay I am just passing the diamonds without sort 
colour and just taking this off then running the command so this is what it is looking 
like okay we will now see another kind of categorical plot that is called categorical 
estimate plots which try to show the distribution central estimate of central tendency 
for each category what are the estimates of central tendency generally the mean 
median and mode mostly you would be interested in mean or median values and C 
bond by default shows the estimate of mean okay for that particular categorical 
variable so now let us try to understand this via example and we use bar plots which 
show that is a the distribution of a categorical data on a called qualitative variable sorry 
qualitative like male and female is qualitative and how is it related to a quantitative 
variable and what is the mean of that particular variable in that particular category so 
we can estimate that using a bar plot and C bond shows the central tendency 
estimates by default okay so this time for this I am loading the very famous data set 
called Titanic which shows the number of survivors in the tragedy in the Titanic tragedy 
so explore the data set I am just using this DF dot head command okay so you have 
the survived whether the customer is sorry whether the passenger has survived is 
indicated by 1 and did not survive that is 0 and which is the class of the passenger 
whether is first class second class or third class passenger the gender age right and 
then how much fare he has whether embarked and the class okay class is again 
represented in two ways one as the categorical I mean in the numerical value another 
is in text value as third okay then you have the gender also represented as male and 
female man and woman so whether it is an adult male or not right then embarked on 
where did they embark whether whether they are presently alive or not so somebody 
has survived whether they are alive or not and whether they are alone or not so this is 
something we have in the data set and let us try to explore the distributions using the 
bar plot and try to estimate so what are we trying to estimate here we are trying to 
estimate the survival rates as per the passenger class so this is NS dot cat plot sorry 
it is SNS dot cat plot okay data is Titanic X variable is the gender you want to 
understand it based on the categorical variable of gender and Y is the we have the 

## Page 8

 
 
 
 
 Page 8 of 13 
 
count of people survived so I am just having this are taking the survived column and 
by counting the number of ones and number of zeros I will be able to tell how many 
people have survived or how many people have drowned and we are colouring it by 
the class which is nothing but PC class or normal class so you have the each colour 
class would be varied each passenger class would be coloured differently and we are 
using the bar plot so I am just doing this so the black bars that you see right on the top 
are the estimates of the central tendency so in this particular plot you have the survival 
rates plotted on the y-axis and the male and female categories it's represented on the 
x axis so each length of the each bar indicates the survival rate the mean survival rate 
for that particular category and the black bar indicates the estimate of the range where 
the true mean of the particular class is likely to fall the most important thing here is you 
can understand it the bar length is smaller the true mean is closer to the depicted 
mean and if it is larger there is a wider variation so you are also not knowing the just 
the mean value but also the likely divergence of the mean value from the true estimate 
given the distribution of the data so in this way Seaborn readily gives the estimate 
about the mean and its distribution and enables for quicker comparison on the average 
values across categories and you can also impose other kind of categorical variables 
in this class class the type of class in passenger is travelled so you can also first take 
away the class and see the difference so if you just do the overall survival rates a male 
passenger had only a 20% survival rate where the mean was very tightly distributed 
across the represented mean here which is roughly about 20% maximum it could have 
varied up to 18 or 22% whereas female passengers on an average had 75% survival 
rate and wider variation than the male passengers now as I try to understand whether 
there is a difference between the passenger class right the class variable whether it 
was class the whether the passenger from first class and second class and third class 
has different survival rates we can clearly see the for the male passengers at the 
survival rate for first class passengers was much higher at about close to 37 or 38 
percent whereas for the second and third class passengers it was almost similar with 
second class passengers being little higher and about it is about 10% whereas female 
passengers even the third class passengers in the females had more higher survival 
rate than the first class male passengers and the second class and first class female 
passengers had far more higher survival rates than the other classes passengers in 
other places by the irrespective of the gender so this kind of conclusions and the 
estimates about the mean survival rate can be drawn using the categorical plot ok 
there are other categorical plots and just leaving them we can practise based on the 
code snippets we gave you ok and then you can use that for your practise and trying 
to understand what are the different features like using the colours right different type 
of pellets so on now we will explore one more graph called point graph or the slope 
graph which connects two points and directly shows the rate of change it is one of the 
interesting graphs that you have in the categorical plot and then that will help you to 
understand the difference between two time period two categories and also by just 
representing a straight line it gives the rate of change or connection between the two 
categories ok so let us try to use a point graph for understanding the relationship 
between the survival rate and the gender category and how it varies by the passenger 

## Page 9

 
 
 
 
 Page 9 of 13 
 
class so first let us take away the class variable and plot only the clean data which 
means we are just plotting the survival rate against the gender of the passenger you 
can see male passengers at 20% survival rate whereas female had about more than 
75 72 or 73% survival rates ok this is the survival rates of male and female passengers 
but we just want to understand how does this vary across the different passenger class 
categories first class second class passenger whether it is any difference is there or 
not so whenever you touch here see here you are getting lot of options for including 
different types of commands into the syntax please explore them and try to use them 
for understanding customisation features ok the hue is only the class here we are just 
trying to alter them by the class then yeah so I have done this and then I'm just going 
to run so you have now class wise you have now class wise the survival rates and the 
point graph connects them and try to use a direct interpretation see remember when 
you are talking about visualisation it is all about helping your audience decipher things 
very easily so in a by using a point graph you are trying to say that okay I want to 
understand the relationship between the survival rates of third class passengers who 
are travelling by third class and the male and female are directly connected by a line 
so my my eye or my cognition directly connects to these two points and gets an 
estimate about the difference in survival rates so this is a benefit of using the point 
graph so then if you have customer you can also have let us say right so you have you 
just want to connect to them so altering them right so I'm just trying to alter and if you 
as so this is another kind of point graph where you have three different categories first 
second and third then they are segregated based on the gender this is one more 
dimension we added and then you have the point the point graph or the slow graph 
indicating the change in the survival rate as you traverse through different categories 
okay and you can also add a customisation element and also markers for indicating 
for improving the visualisation okay so you can try it out this example yeah so let us 
talk about faceting one more example in faceting then we will try to see the histograms 
okay so now we will see one example with faceting this is simply like putting the 
dimensions or two more two or three categories using the facet function therefore we 
are able to represent it side by side and give a better representation so by using 
faceting you can bring more dimensions onto the graph just compare the tips data set 
example we started with let us say right we started with a simple plot where we showed 
the distribution of tips okay across the time of the dinner lunch and dinner and we use 
the day also as a separate function now our objective is to get these two things into 
one particular plot and also retain the gender variable okay so that is how we are trying 
to use the facet diagram and try to get the both the features so what am I doing I am 
first using the graph which is for the days and then plotting it twice once for the lunch 
and once for the dinner and using the gender as the hue variable okay this is what I 
am trying to do so this is lunch and dinner these are two plots so within that I am again 
using the day as the categorical variable in lunch I want to understand how it is varying 
as per the day and in dinner I want to understand how is it is varying per the day okay 
and whether it is a smoker or non-smoker or it can be gender male or female okay you 
can impose more dimensions also so I'm just trying to cat plot you have an option 
called facet grid it makes easy to add faceting and visualise higher dimensions okay 

## Page 10

 
 
 
 
 Page 10 of 13 
 
you can use this by specifying the column and the row variable whether how do you 
want to do that okay so I am putting the day as the column variable okay so please 
look at the code data is nothing but tips X where X axis variable is day Y axis variable 
is total bill so the basic plot is between day and total bill but you are and then you are 
having the colouring based on the smoker okay and you are using the swarm kind of 
a plot so let us for a moment take these two off okay take these elements off and see 
what is it going to plot okay this was our good old plot right so this was the original plot 
where you had the device may have smoker and non-smoker what is the total bill 
amount now to this what am I adding and this adding this particular column called time 
right okay I want this graph to be repeated column wise based on the variable called 
time and then it is the same swarm plot okay so I have lunch and dinner so the same 
plot is repeated over lunch and dinner can also do it as row which which in which it will 
produce the plots as two different rows okay and you can also do the row as time then 
call is equal to right can do sex or the gender so you have the plot so what is this plot 
is showing for example lunch time how many male customers have had lunch on 
different days of the week and whether they are smokers or non-smokers so now look 
at the richness of the plot that you have built in by using the facet option by using 
columns and rows by specifying the categorical variables in columns and rows so you 
can whatever you are achieving in the cross tabulations you can also show them as 
graphics and enhance the appeal for your audience okay so I can just also change 
this and try to bring more dimensions okay instead of making this you can do this as 
gender and column as smoker okay so you will be then yeah getting the different 
distribution based on whether lunch time how many smokers are coming how many of 
them are male and female like that okay so now let us quickly see the distribution of 
data you are using histograms plotting univariate data using histograms so what is a 
histogram histogram shows the distribution of a variable okay so we are now using the 
penguins data set and try to understand what is the length of the flipper or the being 
so now let us look at univariate distributions we will be using histograms for 
understanding univariate distributions and bivariate distributions so we will now be 
using a data set called penguins it talks about the different species of penguins and 
the length of their wings big size whether they have webbed feet so on the other 
features of penguins okay so we need not import this we have already imported this 
so we are just loading the data set and trying to do it the histogram for this the 
command is SNS dot plot which is for distribution plot and we are only interested in 
one particular okay first variable called flipper length before that let us just simply run 
this we are getting the flipper length and you have the count of number of penguins 
having the particular wing length so you have so the distribution looks like it has a 
bimodal distribution or it has two peaks and many penguins are only a 75 penguins or 
80 penguins have a flipper length between 190 mm to 195 mm whereas other there 
are many penguins with more than 210 to 220 mm wing length also okay so this is a 
very simple distribution plot so now let us look at the other characteristics of this data 
penguins dot head okay so yeah so you have whether which island it is observed what 
is the species what is the beak bill is beak length and beak depth so flipper length 
body mass whether it is a male penguin or a female penguin or we don't have the data 

## Page 11

 
 
 
 
 Page 11 of 13 
 
some of the times you don't have not available in a not a number okay so there might 
be data correction error so you might want to drop this data for doing analysis okay 
this comes part of your data cleaning exercise okay then you can also okay so you set 
the number of bins okay so instead of taking the automatic bins given by the default 
code you want to set the number of bins to let us say 15 okay so you get the data like 
this you are dividing the number of bins into 15 so instead of I just want to extend it to 
a very large category 150 bins so this is what is happening okay so you can reduce 
the bins okay I need only five bins this is how the data will look like okay so then you 
can also try to write so sometimes you will not have a continuous variable you have a 
discrete variable on the x-axis okay for example in our tips data set you have the day 
as a categorical variable or the size okay size was the size of the bill category that we 
had and the count okay so for that you can use the tips data set and try to plot the 
categorical function okay we are using the tips data set distribution plot okay based on 
tips and we are doing it on this size so sometime when you do this it is coming like a 
simple size one is only 20 so there is no clear indication so what you can try to do in 
that case is say discrete is true because what is happening these are six different size 
categories one two three four six with one being small six being large so they are 
continuous numbers but technically the size 1.5 does not make sense right so the 
system does not understand right whether this has to be plotted continuously because 
it has 1 2 3 4 5 6 it thinks these are values at 1 at 2 at 3 at 4 it does not plot anything 
continuous in between but we know it is a it is in some sense a categorical or a discrete 
value at 1 2 3 4 5 6 so we want to cover this space so you can show that you get a 
continuous distribution plot like this you can use the command and add the say that it 
is a discrete kind of a variable so default it is set to be false unless you tell the system 
it is a discrete variable it will never plot the gaps and if you set discrete is equal to it 
shows a continuous distribution so you can understand and now you see the label x-
axis label shifting to the centre of the graph indicating that right it represent entire value 
of 1 then the number of second size is as much third size is much it is continuous 
without any gaps so we have just seen how to plot a distribution on a continuous 
variable on the also a discrete variable right and once you set that discrete is equal to 
true you will get a continuous plot okay you will get the continuous plot right now on 
this what I am trying to do if you want to just reduce the size a bit and use more slight 
gaps you can use a parameter called shrink and achieve the function so it is near for 
a discrete variable like a day or you still have the data but it is nicely arranged with 
instead of it being completely continuous so if I don't have the shrink and I just plot 
with the day this is how it will look these are stacked together right and if I use shrink 
okay and let me put 0.7 this type you get little widely spread graphs which are nice 
looking so this is a small customisation features which we want then again it is your 
conditioning on the other variables like you can see how the distribution works okay 
for a particular stripper length but you are trying to put one more dimension on to this 
say like the hue characteristic of the colour and for the same penguins diagram we are 
using the distribution plot but we are using the species for colouring the plot so this is 
how you get it so it is showing all the three types of penguin species in our data set 
and you have the distribution so but you will note right this is little difficult to read maybe 

## Page 12

 
 
 
 
 Page 12 of 13 
 
I would love to do this when maybe I would prefer to do this in terms of a right I would 
write a row is equal to species yeah so you can see our call of C was all is equal to 
species so look at this this is more elegant than this particular face it right so this is 
how you can do also you can add Q is equal to species or I should get the colour yeah 
so you got the colours also different but looking this is more a cleaner death so this is 
how you can use different facets and there are the continuous things and this is the 
yeah element is step right you have so in this way you get the transparent colouring 
so you can do all these parts and also you can use the option multiple is equal to stack 
to get a stacked graph right so yeah so you have the different customisation features 
available so now let us look at the distribution of a bivariate variable okay so you can 
look at the yet bivariate distribution where you are trying to understand the distribution 
based on two variables univariate is single variable bivariate is two variables so you 
have the distribution of X bill length okay which is beak length and beak depth you 
want to understand how these both are related just plotting them so you got so darker 
is the shade you have the higher concentration there most of the species have 40 mm 
beak length and a 20 or 19 mm beak depth and there is one more species where you 
have 45 mm under so the lighter is the shade lesser are the numbers so this is how 
you can interpret the bivariable distribution so it is nothing but two univariate 
distributions okay so if you are to see how they are there at an individual level you can 
simply plot to you can just plot the X right so this is how you get the bill length then 
you are adding one more so instead of length I am typing depth so the bivariate 
distribution combines these two and shows them in a clean graphic so that you can 
understand the distribution based on two parameters okay so you can also add the 
hue characteristic to this but I would rather prefer doing that in a in the facet format so 
I'm just going to add column is equal to species in double quotes then also add the 
colour or hue sorry you have to use hue as species so this is how you get that plot 
faceted and as you can understand that with the species sorry then let us try to 
understand what are the other distribution plots that are there in the C1 interface you 
have a joint plot which plots a scatter plot along with the histogram on the secondary 
axis vertical secondary vertical and horizontal axis okay so it is called a joint plot it 
combines the scatter plot and the histogram SNS dot joint plot I'm just doing this so 
this is how you are going to get it so I can also extend this with in this graph you have 
the scatter plot indicating the relationship between bill length and build-up so you can 
understand how they are related seemingly a negative relationship then you have the 
distribution of the data so you can understand whether the data is normally distributed 
or it is look a concentrated in one particular position so then you can also try to plot 
this okay for a different so the same thing that we try to do we try to do the column is 
equal to column is equal to species right so if you do column is equal to species sorry 
so I think joint plot will not allow that so these are joint plots which will allow you to see 
the scatter plot and the distribution simultaneously okay so now we will look at an 
interesting plot called pay plot where it plots the relationship between all the variables 
in a single diagram so it tries to show it is essentially the scatter plot plotted for the all 
the columns in the data along with the distribution okay so on the exact if you see the 
variables so you have all the numerical variables okay and you have the numerical 

## Page 13

 
 
 
 
 Page 13 of 13 
 
variables like how bill length is related to body mass how bill length is related to flipper 
length how bill length is related to build up and how bill length is related to bill length 
when bill length is related to bill length they show the distribution so that you can see 
the distribution of the data okay and you have in all other dimensions in all other grids 
you have its relation to some other variable in fact the diagonal elements are mirror 
images so you have the same relationship the represented. 
  
For example, the relationship between bill depth and flipper length is equal to the 
relationship between flipper length and bill depth. So, you have the flipper length and 
again you have the bill depth. So, this is the same thing. 
  
So, if you see these are mirror images the distribution here is here and the distribution 
it has count. So, this is a pair plot you have to just pass the entire data set into the pair 
plot because it uses all the numerical values in the data set. This is the distribution. 
  
So, let us also use this for our diamonds data set because of there are so many 
variables in diamond data set you got the relationship and you can see the distributions 
how skewed are they. It is a very large data set also let us look it for our finally, the 
tips data set. So, this is how we got the relationship between numerical variables in 
the tip data set and its relation. 
 
 
--------------------------------------------------End--------------------------------------------------------- 

Tags: #statistics #machine-learning #data-science #statistical-modelling
