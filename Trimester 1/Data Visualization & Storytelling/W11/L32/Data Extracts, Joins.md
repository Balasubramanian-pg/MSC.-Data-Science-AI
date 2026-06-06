
# Page 1

 
 
 
 
 Page 1 of 8 
 
Data Extracts, Joins Transcript 
 
Good morning, hello everyone, we will now continue our learning journey for the 
course Data Visualisation Storytelling, we will be now continuing our understanding of 
leveraging different features in the Tableau environment, especially how to interact 
with the data sets and try to build the joints and data blending exercises. This is a very 
important step in stabilising your data source so that you can perform appropriate 
calculations and visualisations and build interactive dashboards that clearly 
communicate the information to your audience. So as I was saying in the last class, 
preparing your data source or the initial data set is a very important step in any data 
visualisation exercise. 
  
In this case, you will be using certain features in the Tableau environment to achieve 
that functionalities. Particularly, we'll be seeing about the relationships, joints and 
finally the data blending. These tools or techniques will help you to connect the 
different data sets with common identifiers and also use them simultaneously for 
building visualisations, thereby bringing more interactivity and cross functionality 
among different data sets, simultaneously exploiting the trends across data sets to 
showcase the insights to your audience. 
  
So let's start with the Tableau public environment. So by now you should be familiar 
with logging into the Tableau public environment. I have logged in using my account. 
  
Then I'm going to do a web authoring, which is the app based version and it is done 
online. And I have downloaded one particular data set called the bookshop data set, 
which is available from here. I will post the link in the class materials or else you can 
also search from this particular bookshop data set Tableau, you will get the direct link 
to this article where you are expected to download this particular Excel file 
bookshop.xlx. So once you download that, it will be there in your downloads or in your 
local drive. 
  
From there, you can simply drag and drop to the upload section and the file is getting 
uploaded. As a good practise, you can always try to first scan the data on your own 
and then you can work about the features in the Tableau environment. So if possible, 
if you are dealing with an Excel file or a text file, it is a good habit or a practise to 
understand the underlying data by just eyeballing the raw data. 
  
Sometimes if you are working with certain tables or formats which are internal to your 
processes and system, you might not be able to visualise data. But still, in case if you 
have a chance, please do try to see the different types of what are the data and what 
is it containing. So now this is a data about book author and book author sales. 
  
So you have author ID, book ID, and quickly if you are coming to sales, you have the 
order ID and item ID, series. Then there are different book IDs and ratings of the 


# Page 2

 
 
 
 
 Page 2 of 8 
 
publisher. There are many different fields, but the main point that we are trying to 
understand is this is the same data about books, sales, ratings and reviews, but 
organised in different sheets. 
  
And our task here is to connect them, connect individual sheets so that we can perform 
combined operations across the sheets. So this is the task for today or in this lesson. 
And we will try to achieve that by using some special functions in Tableau, especially 
the join and data blending. 
  
And we will take it from there. Now let us go into the Tableau environment. So you 
have loaded all the sheets and this is the physical layer or the where your data source 
is getting built up, OK? So these are the different sheets. 
  
So you can try to select a couple of sheets and then see how they are interacting. So 
let us first start with the author sheet and just selecting it. Author sheet has come here. 
  
I'm just clicking the update. So you can see the number of fields that are there, author 
ID, first name, last name, birthday, country of residence, hours of writing per day, HRS 
is hours of writing per day. So you have these details here, which is this is the only 
numerical value here. 
  
This is the date value here, OK? And which are again, you have the author's last name, 
then author ID. So now let us try to see what is that we want to connect with. Go back 
here. 
  
Look at the author. This is the author info. This is what we have been seeing. 
  
Then you have the book ID. So here you don't have the book ID, you just have the 
author ID. In book, there is no, there is author ID, sorry, there is author ID and these 
are the books written by the author. 
  
Now let us try to connect these two sheets, OK? So I'm just taking the author and 
book. Let us explore other things later. So this is the relationship. 
  
This is what we call as a noodle. And this clearly shows it is connecting automatically. 
Tableau has detected the primary sheet author sheet is connected to the secondary 
sheet book sheet where the common identifier is the book. 
  
So this is simply what we call it as a relationship where the Excel sheets are talking to 
each other using one particular identifier. In this case, the key field in this case, which 
is the author ID. There might be multiple author fields, multiple key identifiers. 
  


# Page 3

 
 
 
 
 Page 3 of 8 
 
So you can also add them like if you have such, you can also add. So you don't, in this 
case, you don't have any other field. But if you had any field, which is also there, you 
can add that. 
  
So it will be sequentially matched and the data set is created. Now let us look at the 
data set. So this is the title, book ID and author ID, OK? So then once you change the, 
yeah. 
  
So once you change it to the author sheet, so you click on the book sheet you have 
here, the book variables, then you have select on author, you have the author sheet. 
So now the point that I'm trying to make is once you click on this relation, it is showing, 
OK, how this is related. So you have all the operators, logical operators, how to relate 
these two and how to connect these two sheets. 
  
So in a relationship, the underlying logic in Tableau is such that it tries to connect these 
two sheets automatically using the particular ID that is there, which is common in both 
the sheets. And then you can directly use them in your functions. So now this 
relationship is established using the author ID. 
  
So which is there. And you can also add this performance options. For example, this 
is what we call as cardinality principles, whether the mapping is many to many. 
  
For example, there is one author and there is one. If it is a unique combination, you 
can use one to one, OK, or else you can use one to many. One author can map to 
many books there or many authors can have too many books. 
  
So the default is many to many and it is advisable unless you are very sure how the 
mapping is working. Don't disturb with this and the system will automatically take care 
of that. Now, let us try to see how this will help us in working out the different examples. 
  
So what I'm trying to do, I'm going to sheet one. OK, so it is creating an extract. As I 
was saying in last class, data extract is nothing but a snapshot of your data created 
for that one particular instance out of your base data. 
  
It helps in faster query so that it will complete faster query and helps in efficient 
analysis of the data. So now what am I trying to do? I have just have the author ID. So 
I'm just pulling it. 
  
So this is the author ID. So I can also make it as. So these are the author and I just 
going to make the count. 
  
So there are about 40 authors that I have. And in fact, if I do the count author ID 
instead, I want it to be measured to be distinct count. How many unique authors are 
there? So of course, the unique authors is also 41. 


# Page 4

 
 
 
 
 Page 4 of 8 
 
  
So there are 41 authors. And then I'm trying to see that with the country of residence. 
OK, so each country of residence you have like this or else I'll take it here. 
  
So you have the country of residence. This is the number of authors country are based 
on the country of residence. OK, then what am I adding from this sheet? I'm directly 
taking the book ID. 
  
OK, so so distinct count of books as per the country. And I want to change it into 
sideways so that I can compare which country has more authors and more books 
published. So you have all these values coming up right away, very clean. 
  
So instead of having two graphics which could have been created in two separate 
sheets, you have connected them with the author ID and it is clearly able to measure 
across the sheets. This way relationship is built by identifying the key variable which 
is there in the both the sheets. So now what I can also do, I can also get the hours of 
writing. 
  
So we have the hours of writing also here. So clearly showing if there is hours of 
writing, number of books and number of authors, we have all these numbers. So you 
can also try to format, try to include other variables. 
  
So the factor is the main point is you are able to work across the sheets using a 
common identifier and get more insights. For example, if the sheets are not connected, 
you will not be able to address the combined question of which country has the highest 
number of working hours or the writing hours, but relatively low number of authors and 
publications. So you can answer those questions or present this data to your audience. 
  
So this is how you can do this features in by combining the data. This is particularly 
what we call it as a relationship. Now let us talk about joints. 
  
So let us talk about joints. So for every sheet, you have to go back and redefine your 
relationship. So here, what am I doing? I'm trying to, for sheet 2, I'm saying edit data 
source. 
  
So I'm going here for this sheet, I'm saying edit data source. So I'm going to edit data 
source. Here I'm trying to, so now this is how you can build relationship between two 
sheets. 
  
For example, if you are taking the rating sheet. Okay, so it connects sequentially with 
the rating sheet using the book ID, author will get mapped to book, book will map out 
to ratings. So once we go to this particular sheet, you also have the, now you have 
three sheets here. 
  


# Page 5

 
 
 
 
 Page 5 of 8 
 
So what am I doing? I'm just trying to take the country of residence as rows. Okay, 
then author ID, we can just show the values. These are the country of residence. 
  
This is the author. Then I have, okay, hours of writing. Then I have the ratings also, 
some of ratings. 
  
So this is what we have. Maybe here it would be appropriate to get the first name of 
the author. So I'm just removing this. 
  
So for example, you can simply see that I'm not using anything from the sheet called 
book one, whereas I'm using directly author and rating sheet, but I'm connected via 
the book sheet. So like this, by building relationship, you can come, you can connect 
two, three data sheets and work simultaneously for improving your visualisations. We'll 
now explore the join feature in the Tableau space. 
  
We will now try to understand how we can connect two or more databases for 
generating a specific data structure. We are, we have seen relationships, which is the 
default way in which Tableau connects the different data sources. For example, when 
you combine two sheets using a common identifier, the Tableau using the 
relationships creates a larger data set, which preserves the features of the original 
data sets while allowing you to construct the visualisations by exploiting the common 
features in both the data sets. 
  
However, you can revert back to the original data set without much, without the 
changes. Now, however, in cases where you use the joint function, you want to create 
a particular data structure or create a subset of data with specific features of the 
common element. This is very useful in allowing hierarchy access to the different 
employees in the business. 
  
For example, you have the transaction data and sales data, and you don't want all 
levels of employee seeing this data. So therefore, you can create an employee ID with 
the designation and interact with these two data sets, the transaction, the sales data, 
depending upon the hierarchy of the employee. In that case, you would want each 
employee to look at a specific portion of the data set, which can be achieved using the 
joint functions. 
  
So there are four types of joint functions that are generally used, which are inner joint, 
left joint, right joint and fuller, full outer joint. And these joints are simple analogous to 
our set theory that we learn in our high school mathematics. You have A intersection 
B, which is nothing but the common elements. 
  
Then you have left union, left joint, which preserves the elements from the primary set 
plus the common elements. Then you have the right joint, which preserves the 
common elements plus the secondary set. Then you have the full outer joint, which is 


# Page 6

 
 
 
 
 Page 6 of 8 
 
nothing but A union B, where it takes all the elements and the common elements from 
both the data sets and tries to create the integrated data set. 
  
Finally, you also have a union, which is not exactly like a intersection or a union 
function in the set theory parallels, but you have common elements and you keep 
appending the rows. A best business use case would be tracking the daily sales data. 
You would have specified number of columns like the transaction ID, time, purchase 
value, quantity, so on and so forth for a particular day. 
  
And there are about 1000 transactions on a given day. And the next day you have 
5000 transactions. You simply append these data together to get the overall sales data 
and work with them. 
  
In such cases, the columns are common between the two data sets and you just 
append the rows to create a larger data set. These are the different ways in joint 
function is used. Now, let us see a couple of examples to understand how the different 
types of joints work. 
  
And then we will go to understanding the blending of data. So all this is being taken 
from the Tableau source itself. So you are advised to refer to this data set again and 
practise. 
  
So what I am doing here is I have created two more data sheets with partial data from 
author and book sheets. So this is the same Excel example that we were using earlier, 
the bookshop data set. So you can go back and work on the same thing. 
  
So what I am doing, I am trying to first understand how book is related to authors. So 
I have got a book into the canvas or the work area. And I click this particular button to 
create the joint functions. 
  
Once I have opened this, I will try to drag the author field into this. OK, even before 
that, I just wanted to show you how many rows are there in the book ID. There are 
about 58 rows, OK, in the book sheet. 
  
Each representing a different title of the book, author ID, country ID and book ID. So 
these are the different things that we have here. So I just took and now taking the 
subset of author here and I just got the author here. 
  
OK, so now I'm just updating it. I just want you to see now the rows have reduced to 
37. And what is happening here is performing an inner joint, which means it is taking 
the common elements, OK, common elements from both the sheets and presenting 
the data only for them. 
  


# Page 7

 
 
 
 
 Page 7 of 8 
 
OK, it is a presenting the data for common elements which are there in the both sheets. 
And what is the variable based on the common elements are identified is the author 
ID. For example, in this sheet, you have the author ID, which is the key which we have 
used for relationship also. 
  
In the book sheet also, you have the author ID and it is matching the common 
elements. If you see, these are the common elements AM 329, 329 and these are 
ordered and altogether you have 37 common elements from both the sheets which 
are combined and the data set is created. This is one way to join the data. 
  
Now let us explore with the same thing, the left joint, wherein the. Now you have the 
58 rows, OK, wherein the data is populated. So you please see the data is now 
populated for the left sheet along with the common elements. 
  
So first you have the common elements, the author ID, OK, the author ID, common 
elements have been presented 37 rows. After that, you still have the original data or 
the primary data, in this case, the book sheet and all other null values are replicated. 
So this is how your data is getting created. 
  
So you are trying to look at the common elements from the book data and the author 
data while preserving the all the elements from the book data. This is a left joint. Now 
we can do the opposite. 
  
We can do the right joint also, wherein you would take only the common elements and 
the full data from the author sheet. So look at, you should get, you are getting 43 rows 
where the elements which are not there in the book ID are represented with null values, 
but all the elements in the author's data set are represented. So these particular 
authors are not present in the book ID, therefore it is not creating the data for them. 
  
It is representing as null, but it is taking the entire data for the authors and it is giving 
only partial data or the common elements which are there in the book ID. Then you 
take the full outer joint, which is the final one, wherein you have the entirety of data 
from both the sheets. OK, so you have the author ID for which there are no 
corresponding book IDs. 
  
Similarly, when you go down, you have the book IDs for which there are no author IDs. 
So this is how your full outer joint works. And you can also, if you have two or more 
matching variables, you can give more conditions here. 
  
OK. And you can also define joints not only as equivalents, but as inequivalents or 
being greater than. However, be very, very careful on how do you use joints because 
they will modify the data once for all. 
  


# Page 8

 
 
 
 
 Page 8 of 8 
 
And once this is done, you just do the create extract. So it will create the extract and 
just using the full union data. So now this data is created, which will be used for 
visualising. 
  
OK, so this is how you can do this particular extraction is complete. So extract contains 
all data. So this is what has been added here. 
  
So now you go here, then you can create. So author ID as rows. OK, then you have 
the maybe you can just read the nationalities. 
  
You just got this. OK. So you can do this nationality wise number of authors which are 
there. 
  
And you don't have authors from Singapore and Netherlands, which are in this 
particular datasets. So that's how you can use the joint function to create subsets and 
work with the data. Now we will now look at another. 
 
 
------------------------------------------------------End----------------------------------------------------- 
 
