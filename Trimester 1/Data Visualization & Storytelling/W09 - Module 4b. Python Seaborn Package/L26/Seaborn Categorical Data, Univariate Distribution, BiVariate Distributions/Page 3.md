# Page 3

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
