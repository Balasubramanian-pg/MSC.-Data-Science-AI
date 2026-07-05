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
