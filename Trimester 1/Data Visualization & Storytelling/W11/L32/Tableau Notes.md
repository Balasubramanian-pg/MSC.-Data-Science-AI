
# Page 1

 Tableau:  Lecture Notes 
 
1. Tableau Ecosystem 
 
Tableau is an end-to-end data analytics platform. Its core components are designed for 
different stages of the analytics workflow. 
●​ Tableau Desktop/Public/Creator: 
○​ Desktop (Paid): The main authoring tool for creating visualizations, dashboards, and 
stories. 
○​ Public (Free): A free version to create visualizations but must save workbooks to the 
public Tableau Cloud platform. Good for learning. 
○​ Creator: A licensing role that includes Tableau Desktop and Prep. 
●​ Tableau Server/Cloud (Online): 
○​ Server (On-Premise/Private Cloud): Used to publish, share, and manage 
workbooks/data sources within an organization. 
○​ Cloud (SaaS): The fully hosted version of Server. Allows users to view, interact with, 
edit, and collaborate on published content from a web browser or mobile app. 
●​ Tableau Prep: A separate application used for cleaning, shaping, and combining data 
before analysis in Desktop. 
 
2. Getting Started & Core Interface 
 
The standard workspace is where you build your visualizations. 
Area 
Purpose 
Data Pane 
Lists all available fields from your data 
source, automatically categorized as 
Dimensions or Measures. 
Columns/Rows Shelf 
Fields dragged here create the columns 
and rows of your view (e.g., placing Sales 
on Rows and Year on Columns). 
Marks Card 
Controls the look and feel of the data 
marks (Color, Size, Label, Detail, Tooltip, 


# Page 2

Shape). 
Filters Shelf 
Used to narrow down the data displayed in 
the view. 
Pages Shelf 
Used to separate a view into a sequence of 
pages based on the values in a dimension. 
"Show Me" 
A panel that suggests appropriate chart 
types based on the fields currently 
selected in the Data Pane. 
●​ Dimensions (Categorical Data): Typically fields that categorize or describe data, such as 
Name, Date, Region. They are often discrete (blue pills). 
●​ Measures (Quantitative Data): Fields that can be measured, aggregated, or calculated, 
such as Sales, Profit, Quantity. They are often continuous (green pills). 
 
3. Data Connections 
 
You can connect Tableau to almost any data source. 
●​ Live Connection: Tableau queries the data source directly. 
○​ Pros: Real-time data, saves space on your machine. 
○​ Cons: Performance depends on the source database/network speed; can slow down 
the source system. 
●​ Data Extract (.hyper): A compressed snapshot of the data, stored locally (or on the 
Server/Cloud). 
○​ Pros: Extremely fast performance, portable, supports offline work. 
○​ Cons: Data is not real-time (must be refreshed), requires local storage space. 
○​ Best Practice: Use extracts for large datasets or slow connections. 
 
4. Metadata Management 
 
Metadata is "data about the data." It helps you control how Tableau interprets your raw source 
data. 
●​ Renaming Fields: Give columns business-friendly names (e.g., change Cust_ID to 


# Page 3

Customer ID). 
●​ Changing Data Type: Ensure columns are correctly identified (e.g., String, Number, 
Date, Boolean, Geographic Role). 
●​ Creating Aliases: Rename specific values within a dimension (e.g., change CA to 
California). 
●​ Creating Hierarchies: Organize related dimensional fields for drill-down analysis (e.g., 
combine Region > State > City). 
 
5. Combining Data: Joins vs. Data Blending 
 
These are two methods to bring data from multiple tables/sources together. 
 
A. Joins (Recommended for Same Source) 
 
●​ Combines tables from the same data source (or from compatible different sources using 
a cross-database join). 
●​ Merges data at the row level (creates a single, merged table). 
●​ Defined in the Data Source tab before creating a sheet. 
Type 
Description 
Inner 
Includes only rows that have matching 
values in both tables. 
Left 
Includes all rows from the left table, and 
the matching rows from the right table. 
Non-matches get null for right table fields. 
Right 
Includes all rows from the right table, and 
the matching rows from the left table. 
Full Outer 
Includes all rows from both tables. 
Non-matches get null where applicable. 
 


# Page 4

B. Data Blending (For Different, Dissimilar Sources) 
 
●​ Combines data from separate, different Tableau data sources (e.g., Excel and a SQL 
database). 
●​ Data is not merged at the row level; instead, Tableau queries each source 
independently, aggregates the results, and then visually presents them together in the 
view. 
●​ Requires a Primary data source (used first) and a Secondary data source. 
●​ A linking field (indicated by a chain icon $\text{🔗}$) is required to define the 
relationship. 
●​ Limitation: All fields from the secondary source are treated as aggregated values (using 
ATTR or another aggregation). 
 
6. Essential General Concepts 
 
●​ Worksheet: A single page where you create an individual visualization (a viz). 
●​ Dashboard: A collection of several related worksheets, filters, and other objects 
presented together to provide a holistic view. 
●​ Story: A sequence of worksheets or dashboards that work together to convey a guided 
narrative about the data. 
●​ Calculated Fields: Custom fields you create using a formula to extend your data (e.g., 
[Sales] - [Cost] = [Profit]). 
●​ Parameters: Dynamic values that can replace constant values in calculations, filters, and 
reference lines. They allow the end-user to interactively control parts of the visualization. 
