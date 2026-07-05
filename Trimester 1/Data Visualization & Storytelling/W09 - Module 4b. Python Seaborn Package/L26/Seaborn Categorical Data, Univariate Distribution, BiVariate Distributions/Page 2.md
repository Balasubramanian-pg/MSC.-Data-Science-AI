# Page 2

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
