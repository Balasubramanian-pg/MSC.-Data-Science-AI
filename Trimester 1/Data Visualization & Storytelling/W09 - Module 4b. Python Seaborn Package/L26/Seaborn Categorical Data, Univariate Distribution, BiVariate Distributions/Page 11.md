# Page 11

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
