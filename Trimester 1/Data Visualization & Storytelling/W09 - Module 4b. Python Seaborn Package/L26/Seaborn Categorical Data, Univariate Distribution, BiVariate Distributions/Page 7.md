# Page 7

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
