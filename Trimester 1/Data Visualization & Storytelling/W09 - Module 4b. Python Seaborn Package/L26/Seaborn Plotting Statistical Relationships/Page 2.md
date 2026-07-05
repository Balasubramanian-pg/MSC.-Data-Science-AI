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
