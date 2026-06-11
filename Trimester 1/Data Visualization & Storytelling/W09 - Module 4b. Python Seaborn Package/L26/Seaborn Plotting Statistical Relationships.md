---
title: W09 - Module 4b. Python Seaborn Package
module: Statistical Modelling And Inferencing
week: W09 - Module 4b. Python Seaborn Package
---


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


# Page 2

 
 
 
 
 Page 2 of 6 
 
function I'm seeing the first 10 entries or 10 rows and what are the columns so we 
have the total bill amount and the tip that is given on the bill amount and what is the 
gender of the customer whether he or she is a smoker and which day of the day they 
have visited the hotel and whether it is for lunch or dinner and there is categorisation 
of the bill amount by the size into four buckets and if you are working in a Colab 
environment you have these two interesting features called interactive table and some 
suggested graphics so with interactive table if you just click this you get the it's in a 
table format and you can try to filter this out you can rearrange so the at times it might 
be useful for you to understand how this will be helping you in understanding the 
underlying data structure without even trying these some visualisations okay now let 
us now get into the plotting of scatter plot using the seaborn so basic scatter plot here 
we are using something called re plot okay this is a figure level function for visualising 
statistical relationship between okay so what is re plot re plot is a figure level function 
instead of applying functions on the axis x-axis and y-axis applies function on the entire 
figure so that is the main part function of the re plot function as opposed to the 
statistical as opposed to the normal commands which plot function plot graphics using 
access level functions okay so let us now plot the scatter plot so SNS re plot data data 
is coming from tips data frame and if you hover on this shape is 244 by 7 244 customer 
entries are there the bill amounts and 7 columns are there right 1 2 3 4 5 6 7 right okay 
leaving index there are 7 columns right and you are trying to see what is the relation 
between total tip bill amount and tip okay so you are getting a positive relationship 
higher is the bill amount larger is the tip size that you are getting and tip can go up to 
some $10 or something right so this is the tip amount that you are getting and there is 
a seemingly a positive relationship that you can understand now what next we are 
trying to do while these points are plotted in two dimensions we can add another 
dimension as we have seen according to third variable using the huge semantic you 
want to understand whether smokers are paying more or non-smokers are paying 
more so I'm just in this particular plot what I'm trying to do I am trying to add one more 
layer or overlay particular characteristic called smoker so this is the entire sample 
within this sample there are both smokers and non-smokers and trying to colour them 
or distinguish them using colour by calling on the hue right hue gives a hue uses 
colours to distinguish the various categories that are in the data so I am just trying to 
do that so all smokers are coloured blue and non-smokers are coloured orange okay 
this is how it is done okay and you can also try out customising this because you have 
to match the colour with the mood okay now you also got the total bill amount or tip 
amount so what is the other way to do this so you can also try to do this by using this 
style so you can also include this style because this is not that distinctive because in 
a sense both are circles the distinction is coming with the colour what you can also 
add is along with the colour you can also change the shape so that cognitively it 
becomes easier for the audience to process the difference between smoker and non-
smoker in the same graphic so now in this graph as compared to the earlier graph we 
can see you can clearly see the distinction this is cross and this is dot so principles of 
similarity the gestalt principles of similarity it always is the crosses belong to same 
group and the dots belong to the same group so though both are dots the mind has to 


# Page 3

 
 
 
 
 Page 3 of 6 
 
process one more layer of information called colour to distinguish these two right at 
one level the mind is thinking both are dots which means they are similar but colours 
are different so they have some other characteristic so now we are making that 
distinction even more pronounced by taking different shapes to the smokers and non-
smokers and also adding different colours to them okay so now we can also do one 
more we can add one more layer of information to this as to understand when is the 
party has had the visited the diner whether it is for when the customer has visited the 
diner whether it is for the lunch whether it is for the dinner okay so what we can do let 
us look at the difference we are just retaining the colour coding right we are retaining 
the colour it is based still on the smoker see always remember shoe is for colour you 
are colouring the objects based on the smoker or non-smoker type but instead of the 
style which earlier was based on smoker which is also included as smoker now we are 
getting one more element called time when did they visit the restaurant right so every 
time you see a cross right it is for dinner whether every time you see a dot it is for 
lunch and a blue dot indicates non-smoker having dinner a orange cross indicates a 
non-smoker having dinner okay sorry if you see a blue dot it is a smoker having lunch 
and a cross orange cross means a non-smoker having dinner so you have not only 
got the overall relationship between total bill amount and the tip amount you have also 
got the understanding of whether smokers are having whether when are the smokers 
attending the when are the smokers are coming to the restaurant or when are the non-
smokers are coming to the restaurant you can see that most of the smokers are 
coming at the dinner time right sorry most of the non-smokers are coming at the dinner 
time right as compared to the as compared to the non non-smokers who come at the 
lunch time so this kind of conclusions can be drawn from this particular graph so you 
can also use the size parameter right you can also use the size parameter simply by 
using size is equal to size of the bill amount okay so the point is you have indicated 
already the total bill but you also want to give importance to the size of the actual 
amount of the bill so you can simply use the size parameter and dry and say that it 
should reflect the okay it should reflect the size of the total bill which is given by these 
four categories here two two three four so there are four categories of size there are 
six categories of size which are represented in the data now you don't want to use the 
predefined data set that is there you can also give a custom size in parameter by 
simply specifying the size as 15 to 2000 and within this range the system will 
automatically scale the data and give the say so now you can see the size of the bill 
being higher right and and the size of the tip corresponding to the bill right so you have 
clearly varied the size parameter here it is based on the data here it is generated 
depending upon the range and what is the volume of the data in between for example 
15 to 2000 is the sizes you give 200 and it is automatically scaling them and trying to 
get the size of the bubble in proportion to the sizes that you have mentioned you can 
also use the size function and specify the variable that you want to plot from the data 
set or else you can also give the range the system will automatically scale them now 
let us try to understand emphasising continuity with line plot so we are now loading a 
data set called Dow Jones which is nothing but a financial data set it is the index values 
from the United States so I have loaded Dow Jones so let us look at what is there in 


# Page 4

 
 
 
 
 Page 4 of 6 
 
the Dow Jones data set so there is nothing but the date and the price okay so what is 
the dimensions here so now we are trying to create the line plot so simply SNS replot 
Dow Jones so in seaborn you will parse the entire data frame and select the specific 
columns right call the specific columns you wanted date to be on x-axis and price to 
be on y-axis and what is the kind of plot that you want to draw it is line plot so you just 
do the line plot okay so you are simply having date from 1920 to 1970 and the price of 
the Dow Jones index you got the values plotted now you want to add aggregation 
representing uncertainty so the interesting part with line plot is like you can understand 
the statistical properties by seeing whether the particular time point is representing the 
mean value of device for a given X value and how good are these ways we have 
already seen this in the last class so I am going to skip this and try to focus on the 
features that are more important for our present discussion so we have seen all this 
yeah so we will see one interesting feature of the line plot in the signal data set that 
we have seen earlier I will the fMRI data set I will try to show certain characteristics for 
you so that this will be helpful in designing a particular kind of data okay so first load 
we will load the fMRI data set okay and then this plot the line okay so in this particular 
data set if you see right fMRI dot head so there is something called event on which 
you can order the data so what am I trying to do and trying to when I am plotting so 
many features my legend is getting cluttered and it becomes really tough for me to 
correlate what is there in the legend but the basic difference is there are two regions 
of the brain that you are trying to scan that is peritoneal lobe and the frontal part so 
you want to understand how different signals are performing in these two regions so 
what am I doing here I am trying to subset or call only a particular part of the data set 
while plotting the entire line part so X is time point Y is signal strength that is not 
changing and I am colouring based on the region that is my objective frontal and the 
peritoneal and the frontal part and units are subjects okay the units are subjects and 
the estimator there is no estimator involved and we want to have the line plot right but 
while giving the data the major change that I am doing is fMRI is the data frame and 
on that I am saying a query or a condition you can think it is a condition right where 
event is equal to STIM stimulus it is not Q it is only stimulus I am limiting it to the 
stimulus and then plotting this okay so this is what I am getting so let me try this also 
with I think it is called CE right this it is Q CUV so it is called CUV which is for Q and I 
am plotting so this is what it will look for Q so now presenting these two things side by 
side would make more sense than presenting them together for all the 13 event units 
that we have in the subject I mean the 13 subject types that we have okay so this is 
one of the uses of line plot where you can create a conditional plot by giving specifying 
conditions on the data set okay so in this only after satisfying this condition the data 
the plotting is done based on the other parameters after the data is filtered or 
conditioned based on the parameters that you give in the Boolean operator okay now 
let us try to understand how you can show multiple relationship with relationship 
between variables multiple relationship between variables using facets okay or when 
multiple relationship with facets the main objective of doing this is to understand how 
a relationship depends on more than one other variable and you can do this using the 
facet visualisation because this will help you to plot the things simultaneously across 


# Page 5

 
 
 
 
 Page 5 of 6 
 
variables so that you can understand the underlying relationship in a better manner 
okay so you can also use the subplots with the shared axis so that you can see how 
you are able to see the relationship between the variable of interest being influenced 
by different variables okay so in this case we are again using the tips data data set 
and what are we trying to do we are parsing the data from tips into the data the next 
is the total bill right and why is the tip amount we are just looking at the tip amount and 
the total bill so that is our interest understanding relationship between total bill and tip 
amount and we are also distinguish in the plot between smoker and non smoker but 
we want to understand how whether the time of the visiting the restaurant whether 
lunch or dinner makes the difference between the tip amount and the total bill amount 
so what am I using here call which is the column which is the in that I am parsing a 
variable called time so type is lunch and dinner in our data set it will reconstruct the 
two graphs based on the variables in the time call let us say if you had three time 
columns breakfast lunch and dinner you would have three plots here we have only 
lunch and dinner so we will be having two plots where it would plot the relationship 
between total bill and tip amount and distinguish between the smoker and non smoker 
within each plot so this is what what the code is doing and so you can clearly see 
dinner has more footfalls on an average dinner has though dinner has many people 
eating as similar to the range that people are eating in the lunch period but there are 
more people who eat for who spend a larger amount of bill in the restaurant and also 
give more tips so if you are a waiter trying to choose for let us say the which part of 
the which restaurant shift you would take so that you get a higher tip amount you would 
rather prefer in dinner because there is a very high chance that you get a larger tip 
based on a larger spend by the customer okay so this this is something that you can 
use like though we are understanding the relationship between total bill and tip amount 
we are focussing on the lunch and dinner also to understand whether they are causing 
any influence on the tip amount right so we will also now see how to use the facet or 
the multiple grids in which the plots can be simultaneously but positioned so that you 
can visually see the relationship between the variables okay so now we want the 
columns and rows to indicate the graphs both on the columns and rows so this is what 
we are trying to do now in this particular graph snippet so again what I would urge you 
is like whatever examples we are discussing here are limited in scope there is entire 
documentation that is available in the seaborn library the original documentation where 
you have multiple graphs we will be discussing a few of them but the entire universe 
is very large so you can use the tutorials here and the examples that are given over 
here to understand and improve your skill set in designing the various graphics based 
on seaborn okay now coming back to this we just saw either to make it on column or 
it on the row basis now you want to make it on both so we are trying to use this logic 
so again data is the fMRI data set okay and then you are using the line plot simple 
logic is you are trying to see how the signal strength is moving across time and then 
the hue here is subject instead of subject where hue being the region where the 
parietal or frontal region you have the subject as the hue and then column region is 
column is region and row is event so that is how you are distinguishing the graphs now 
you are trying to build a grid where row row indicates event event is stimulus and Q 


# Page 6

 
 
 
 
 Page 6 of 6 
 
region is frontal and parietal and frontal so you will have four combinations of parietal 
region and the frontal lobe both being regions there are two regions and there are two 
events you will have four columns and height you are setting at three you can all say 
and there is no estimator so I'm just running this so that I'll explain this to you so leave 
about the graphs so let us say for example I take away the hue here for simplicity to 
understand make you understand so this is what the graph would look like okay so 
also I am taking away the estimator is equal to none so that it will be a smokey yeah 
it is a smooth line so if you take away the estimator you won't get those confidence 
bands I could be the true data without averaging and also it would be very it would 
have all kind of noise in that so what did we do we are just trying to bring in more 
understanding to our relationship our primary relationship is understanding the effect 
between time in point and what is signal in signal strength so we know how they are 
moving together but we also want to see how they will move when juxtaposed with 
other variables in the other variables of interest what are the variables of interest our 
variables of interest are the region whether the focus region is in parietal lobe or frontal 
lobe of the brake or it is the event whether it is a cue event or it is a stimulus event this 
is something that we wanted to understand so what we are doing we are creating a 
grid this represents for example imagine there are no graph this would indicate events 
this is stimulus event this is cue event this is parietal region this is frontal region what 
is the signal strength and time relationship for parietal region stimulus event frontal 
frontal region stimulus event parietal region cue event frontal region cue event that is 
how this graph is depicted and you can clearly understand okay this is the way that 
graph is moving and then we can come make all these comparisons last time all these 
four are mixed together and this is now presented elegantly in different and you also 
have got customisations possible on different levels one of such customisations is 
trying to give shoe based on subject see already has such suggested that particular 
part subject and don't forget to give commas otherwise the code will become it will 
become wrong so you can see what are the different subjects and how are they moving 
right so you can also do the yeah so this is how you can do this particular graph okay 
now in all of this you are trying to get more variables into context so that you can and 
explain phenomenon by accounting for different variables. 
 
 
--------------------------------------------------------End--------------------------------------------------- 
 
