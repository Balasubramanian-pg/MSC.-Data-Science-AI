---
title: W11 - Module 4d. Tableau
module: Statistical Modelling And Inferencing
week: W11 - Module 4d. Tableau
---


# Page 1

 
 
 
 
 Page 1 of 5 
 
Data Connections Transcript 
 
Hello everyone, welcome to Bitsplanet Digital. Today we will continue our learning 
journey on how to use Tableau for building data visualisations as part of our data 
visualisation and storytelling course. We will now look at how to connect to different 
types of data sources and learn about metadata management in the present lesson. 
  
So let us start with the Tableau public web-based application. So you are expected to 
sign in to the Tableau public environment using your Gmail account or any other work 
account. You will end up on a page like this where you can create a web-based 
Tableau page or you can also work in the Tableau desktop public edition. 
  
In the last class, we have worked in the Tableau public desktop version. Now we will 
be working on the web-based version so that you are familiar with both the 
environments. So once you have opened, this is how you will get to the connection 
data page where you have the files and connectors. 
  
For example, because it is Tableau public, you have only limited options, which is, this 
is a free source where there are only limited options to connectors like Google Drive 
and OData. Otherwise, you can import the files like Excel, text, JSON into this 
particular drag and drop command and get the data source. But if you are to use the 
advanced paid versions, you get a whole range of data sources to connect with and 
create your visualisations and dashboards. 
  
But for the purposes of this course, we will stick to Excel files and basic file types to 
explore the features of Tableau. So I'm uploading the file which we have used in the 
last class also. I'm using the SuperStore sample SuperStore data, which has data on 
sales across regions and returns data of different customers. 
  
So once I have uploaded the data, this is how you will end up on the data source page. 
So our focus is today to understand what are the various features of manipulating and 
managing data before you start building your visualisations. So please remember, in 
a visualisation exercise, establishing the basic data structure is very, very important. 
  
Therefore, you can construct the right type of visualisations and get across the 
information that you want to your audience. So the more you pay attention to your data 
source and structuring of the data, more effectively your dashboards can be designed 
and they can convey the information. So now let us see. 
  
First let us explore the basic Excel sheet. Then we can see how it is behaving in the 
Tableau environment. So this is the Excel sheet that we had. 
  
So this is the orders data. It has about 50 of 5,000 rows, almost 10,000 rows. The 
count is 10,000 rows. 


# Page 2

 
 
 
 
 Page 2 of 5 
 
  
You have almost 10,000 order dates. You have the order ID, order date, so on and so 
forth. There are different variables and the profit from each order. 
  
What is the sales quantity, sale and how much quantity is there and how much 
discount have you given. So for each sale, you have the sale volume, how much is 
the quantity sold, discount offered and profit from each particular sale. This is captured 
in the main order sheet. 
  
Then you also have the returns sheet where there is an order that has been returned. 
So order date and return is also there. And finally you have the people sheet where 
each region is represented by a particular sales manager or a vendor can think like 
that. 
  
So these are in three different sheets. So the primary sheet does not contain the 
returns information and also the people who are responsible for the sale. So this is 
only purely orders. 
  
We don't have this return information and the person who has sold that. And what else 
the data is there. If you have country, state, city, you have postal code, you have which 
region, then you have customer segment, then customer name is there. 
  
Okay. Whether you have, how did you ship it? What is the order date? What is the 
shipment date? Then also you have the category, subcategory, product name, so on 
and so forth. We will get familiarised with this data set so that we will use it across 
multiple classes to build a dashboard out of this to understand what advanced features 
can be built from this very basic data. 
  
Okay. Now let us go back to our public environment Tableau public. So these are three 
sheets order people returns. 
  
So you have to tell Tableau which sheet is that you are trying to operate. So first for 
that, what Tableau calls it as creating a data model, which means it tries to understand 
how data is related within the sheet. So I'm selecting the order sheets, which is the 
main sheet with a lot of data. 
  
So now once you type the, once you select the order and drag it to the canvas. So this 
is where you can, first of all, do data transformations, manipulate data, connect with 
other data sheets. So this is where you will spend substantial time before you start 
doing visualisations. 
  
Okay. So I have connected this to the orders data. Likewise, if you want to connect to 
new data source, you can click this. 
  


# Page 3

 
 
 
 
 Page 3 of 5 
 
Okay. So while working with this, you can also connect to some other data source, 
which is related to this and also determine how these two data sources are talking to 
each other. Okay. 
  
First, let us work out one. So you can also upload one more data source or let us say 
you want to connect to a web based location where you want to get the state or you 
have the postal codes, but you don't have the name and the state name and the 
location name. You can connect to a particular website where the pin code and the 
names are there. 
  
You can extract from them. So you can connect to the other data sources and make 
these two data sources also interact with each other. First, let us take simple steps. 
  
So first I'm trying to understand how orders data set is there. So these are the different 
fields that are there. So please look at this. 
  
So you have the row ID and type. So we will see a little bit later what are the different 
types related to the metadata management. So row ID is a numerical value, ABC is a 
categorical or a character value. 
  
Then you have order date, ship date. Then ship mode is again textual data, countries, 
geographical. So we have seen this in last class also. 
  
See, interestingly, postal code is also treated as a geographical variable, but not as 
the numerical variable, though postal code, as we have seen, is just a numerical value. 
OK, the postal code that we have seen is a numerical value. It can be simply confused 
for a number, but it is taken as a geographical value because Tableau is intelligent 
enough to discover that as a geographical value. 
  
Then you have region, product ID, so on and so forth. And finally, sales, quantity, 
discount and profit are all numerical values. So you have all these things determined 
and these are the variables that are given here. 
  
So now I'm just trying to click the update now button. So you will get the data, I think 
around 100 rows data you get. So you can also, yeah, so you can get the 100 rows 
data, first 100 rows data is displayed here so that you can glance it through, eyeball 
the data and see what are the data types. 
  
And if you want to make any changes here, you can just click on this and then try to 
change this particular role. OK, for example, you want to make United States country, 
geographical role can be Congressional State. You can change this. 
  
 
 


# Page 4

 
 
 
 
 Page 4 of 5 
 
 
This is airport area code US. So like that, you can try to change this and use that for 
your visualisation. And now, once you have this particular drop down button also 
allows us to rename, copy values, hide and duplicate. 
  
OK, you can duplicate and rename it and work on additional calculations. OK, you can 
change data type, so on and so forth. There are these values and you can also order 
the IDs. 
  
So just to eyeball while you are importing the data. So we have done this. Now there 
is one more thing that we can do, which we will discuss in the next lesson is building 
relationships or joints. 
  
For example, we know the first sheet contains the order data and the third sheet 
contains the returns data, which shows which order has been returned and these are 
joined. And the common element in these two sheets is the order ID. So a particular 
order ID will tell whether the order has been returned or not. 
  
So what we can do is to connect these data sheets. You can just drag it here. So the 
right automatically this tableau identifies the common identifier and then you can also 
make the cardinalities, which we will see in the next lesson. 
  
But for now, I am removing the relationship. I don't need this. I just need this particular 
order stay only. 
  
I don't need the returns data right now. So I am just removing it. So I'm removing the 
returns. 
  
I'm only interested in orders and then the data source is done. I'm updating it here. 
OK, so you are in this particular sheet. 
  
So now let us try to go to the sheet to understand the metadata management. So like 
this, you can connect with the data sources, same thing about text files. But only the 
point is while importing the data, you have to. 
  
So you have to, if you are importing a new data source, be very careful about what 
kind of data source you are importing. You have to choose the appropriate file 
connector. So I can now once your data source is determined, you can then go to 
sheet one or any other sheets where you can start building your visualisations. 
 
 
 
  


# Page 5

 
 
 
 
 Page 5 of 5 
 
So the first time that you create sheet, it will create something called an extract, which 
is a local memory of your data so that your visualisations will work at a faster rate. So 
now. 
 
 
---------------------------------------------------End-------------------------------------------------------- 
 
