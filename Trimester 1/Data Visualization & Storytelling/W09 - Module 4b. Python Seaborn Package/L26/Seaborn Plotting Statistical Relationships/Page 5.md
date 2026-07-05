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
