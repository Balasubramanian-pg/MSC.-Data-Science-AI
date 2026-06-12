---
title: W05 - Module 3a.  Dashboards
module: Statistical Modelling And Inferencing
week: W05 - Module 3a.  Dashboards
---

## Page 1

 
 
 
 
 Page 1 of 8 
 
Dashboard for Usability Transcript 
 
Hello everyone, welcome to BITS PLANET DIGITAL. Today, we will be continuing our 
learning journey for the course Data Visualisation Storytelling. We will be continuing 
our module Building Dashboards. 
  
In today's lesson, we will be understanding how to build dashboards for usability. In 
some sense, we will talk about the UX of dashboards, the user experience of using 
dashboards and how to take into account the user experience and build in effective 
and expressive dashboards. And we will finally see what are the different types of data 
visualisation tools that are available for us to build the dashboards. 
  
Before we get into the UX aspect of the dashboards or the usability of dashboards, let 
us spend some time on understanding the challenges in building the dashboards and 
especially the dashboard data that we require for creating very effective visualisations. 
Try to understand dashboards are supposed to drive action from the data insights, 
which means the data flow to the dashboard and to the graphics should be seamless. 
It should be very happening very smoothly and effectively. 
  
So, what do I mean by this? For example, you are running a transaction based data 
dashboard, which tries to show the number of transactions that are passing through 
your system, number of failed transactions and the sale revenue that from them, 
number of transactions in dispute, number of customer tickets that have been raised, 
so on. It is a simple operational kind of a dashboard, which is monitoring the 
transaction volume. The data for this particular transactions dashboard would be 
coming from a live data server on which the transactions are happening. 
  
Resultantly, there will be a lag between the transactions and the reporting of the data 
to the dashboard. This is generally optimised saying that it would get reported within 
15 minutes or half an hour or one hour in some cases in few minutes. So, the data 
latency between the event and the update is a critical factor depending upon which 
type of dashboard you are looking at. 
  
From a user perspective, if the dashboard has high latency when the actions need to 
be taken in a short frame of time, though the dashboard might be very effective in 
visuals appealing and driving insights, it does not serve the primary purpose that is 
driving action, which has a time limit. Again, I am emphasising that the purpose of your 
dashboard is determined by the actions that you want your audience to take. In this 
case, if you are an operator, you would like to have low latency dashboard as 
compared to a strategy owner who would still be fine with periodic updates of data 
because he is looking at aggregate and average phenomenon over a period of time. 
  
Then data inconsistency, conflicting sources and definitions. This again would go back 
to the setting of the context depending upon who is the user. For example, you have 

## Page 2

 
 
 
 
 Page 2 of 8 
 
a operations dashboard and the person using the operation dashboard should not 
have any doubt on the parameters that are there on the dashboard because for him 
he is taking actions which have to be very clear in communication. 
  
He should not have conflicting signals that would make him take wrong actions. 
However, for an analyst or for a strategy manager, if there are issues with the data 
definition, they can go back and ask. Here also it is always best to be very clear about 
the definitions that you are using or the sources that you are using for building the 
visuals. 
  
At times it is helpful to provide description of the definitions on the dashboard or on 
the visual around the metric so that the person who is using the dashboard or reading 
the insights on the dashboard is interpreting them as the author would have wanted 
them to. Similarly, a big problem is missing data. When you visualise the dashboard 
and try to construct metrics, often you might not have data that supports such type of 
calculation or the data elements are corrupted at the source, you need to clean them 
before carrying out any arithmetic operations to present results on to the dashboard. 
  
You have to be aware of these operational realities that data might be missing or data 
might be inconsistent with the type of visual that you want to show. The care has to be 
taken in terms of data integrity that is flowing into the dashboard and the visual that is 
it showing. At times you might have missing data that can lead to indecision and loss 
of business opportunities. 
  
Finally, overload or cognitive fatigue. You can design a very heavy dashboard which 
would require heavy computations or requires heavy graphics, so it takes heavy time 
to load and process and it can lead to cognitive fatigue also because it is not conveying 
the information directly and in a clear and concise fashion. Resultantly, what is 
happening? The data insight and the action chain is broken at multiple levels and the 
dashboard becomes ineffective. 
  
Though it had the time and the bandwidth and space, it could have provided very good 
insight. There is a reasonable limit with which the dashboard should function and give 
the insight. So, if a person opening the dashboard should have reasonable time within 
which all the insights are visible and if he filters out a particular data or drills down, it 
should not take forever for him to get that insight. 
  
This would not happen if you have understood the processing time that would be 
required for creating a drill down or a calculation based on the drill down or a query, 
the interactive element the person has used, how much time it will take. As a designer, 
you should take care of all these aspects from a user perspective. It is very tempting 
to think that you create a complex dashboard with different levels of filters and 
features, but you should also think from the user perspective how much type and 

## Page 3

 
 
 
 
 Page 3 of 8 
 
cognitive load or the bandwidth it is consuming and the processing speed it is 
consuming to deliver that insight. 
  
And all these aspects are brought together and keeping the purpose at central, you 
can deliver a very good dashboard. Let me just explain this with more concrete 
examples. When you are talking about strategic dashboards, you are talking about 
aggregated KPIs and quarterly trends, maybe even higher periodic trends, yearly 
trends. 
  
There is no need to provide granular transaction data or build a query which relies on 
transaction data. In fact, it would be advisable to build a query which is based on 
aggregated trends, so it takes lesser time for the dashboard to get refreshed. We will 
look at these aspects in our experiential learning session to see how one should spend 
time in curating the data structure that helps the dashboard to function. 
  
Then you have mid-level analytical dashboards which are used by the analysts or what 
we call as tactical dashboards which can be used for specific purposes where there 
will be some balance between the real-time updates, the aggregate level functions 
and the granularity to which you want to present your data. And finally, you have low-
level operational dashboards where the overall view might not be present, but a very 
deep and closer view would be given for a particular operation for which they are 
responsible. So, it is always one has to keep in mind what is the purpose, how much 
amount of granularity you have to give, what are the likely data problems and what is 
the cognitive or processing load that the dashboard features would take for presenting 
the insights you want to convey to your audience. 
  
So, make the context and metrics meaningful. One way to guide through this problem 
is making your context and metrics meaningful. So, numbers alone are not enough, 
you might have to contextualise them against a target. 
  
So, targets are there when you present numbers clearly in a performance dashboard 
scenario, you would know how much is the gap to the target. Similarly, you can use 
benchmarks, goals or past period comparisons to show what is the present level of 
business or sales compared to the previous periods and provide more context to the 
numbers. Similarly, you can use visual cues like status bars, reference lines and bullet 
charts and gauges to drive home the point on the same number. 
  
It is simple to write 7% of the target is achieved, but then it is more illustrative to show 
that 7% of the target is achieved compared to 4% last year or these particular regions 
have not reached their target compared to the other regions, which can be given in 
one graphic, can bring more relation and attention to the number that you want to give 
by providing more appropriate context around it. So, always remember context 
translates the numbers into narratives and you have seen narrative when told properly 
will lead to broader retention and action. So, now let us discuss about different types 

## Page 4

 
 
 
 
 Page 4 of 8 
 
of dashboards with the purpose at hand and how to design them and how to think of 
user perspective in these different dashboards. 
  
Let us say you are talking about a strategic dashboard being looked at the top 
management of the company, they say the CEO, see suit employees are a head of a 
particular vertical. So, he would require a periodic update, let us say quarterly, monthly 
depending upon the nature of the business, then interactivity in this case would be 
low, because he is not expected to dwell into the micro details of the organisation, it 
has to be left to the line managers or hierarchy down there, but to see the overall trend 
and point out gaps and opt for course correction and the audience are the executives. 
For them, the focus is on the key performance indicators and trends, so that they know 
if they are not moving in the right direction of the strategy or not. 
  
Next, we would see the analytical dashboards, analytical dashboards are refreshed or 
updated on demand, why do I say so, the frame for analysis is fixed, regularly it is 
updated, but if situations arise, they are updated on time to understand what are the 
changes and how they are impacting the businesses. For example, analytical 
dashboards are updated post an event to understand the effect on the businesses, 
one example would be COVID-19 pandemic or weather related event affecting the 
airline cancellations, it is on demand and it has high level of interactivity to immediately 
identify the root cause of the problem or the most challenging areas to take corrective 
actions, audience or analysts are well versed with the data, they need high 
interactivity, so they can do the reporting to the top management as well as provide 
cues to the operational guys, so the key area of focus for such dashboards is 
exploration, they try to find what is happening and then come up with reasons for the 
top management or for the operation guys to look into and correct for the phenomenon, 
correct for the problem. Then you have operational dashboards which are generally 
updated in real time because they are monitoring processes to ensure the businesses 
go on time, one example is maintenance of website or maintenance of transaction 
engine, so when they are monitoring the transaction flow, they want to understand the 
peak load and the offload hours and see many changes are there and if some 
thresholds are being breached, alerts have to be generated so that they can act upon 
the alerts, here the scope for interactivity would be medium given that they would look 
into specific areas if there are problems and trigger reports to the concerned verticals 
or to the divisions for corrective actions. 
  
And finally we have tactical dashboards which is a mix of all the elements, if you are 
running a special campaign or you are trying to understand a particular aspect of your 
process, you would have a tactical dashboard which again depending upon the 
frequency with which you are interacting on the process would be refreshed may be 
daily, weekly, monthly and again here this would be assigned to a particular group 
looking for a particular process, so the managers would be the audience who are bit 
of both top management and the analyst and the operational person also, depending 
upon the orientation of the tactical change or the performance that you are looking at, 

## Page 5

 
 
 
 
 Page 5 of 8 
 
the dashboard would have more of operational or analyst or strategic orientations. And 
finally tactical dashboard is for achieving action plans and that would help the 
organisation to implement a particular campaign or drive a particular change, let us 
say there is a human HR training related task given to all the employees and that has 
to be monitored, it can be a tactical dashboard. Now we look at individual examples 
and derive more insights, strategic dashboards are for supporting high level monitoring 
and used by the top management and show the overall business health, monitor 
periodically, weekly. 
  
One of the key elements of strategic dashboard is inflow of outside information that 
means explain this more clearly, when you are a top management person, you would 
like to see how your competitors are trying to do, what is the economic growth, what 
are the tariff and how your business at whole will be impacted, so the interactivity here 
would come from the outside element of the organisation and try to see whether there 
is a need to readjust the strategy or for example you are having the quarterly business 
meeting that is about to come or the investor presentation where you have to discuss 
your financial results, you would like to know what are the trends for the previous years 
and what has led to this changes and how to communicate to the audience, so this 
would be a outlook for a strategy dashboard. Then you have the analytical dashboards 
as I was mentioning, this is primarily for exploring data, trying to uncover new patterns 
or reasons that have to be explored or to be analysed further, so if I were to capture 
the main essence of analytical dashboards, it is to find the root cause for any 
phenomenon or any trend that they are observing, so they have complex 
visualisations, multiple filters, interactivity, so they can drill down or go top and provide 
answers to the top management or to the operations people. Then you have 
operational data dashboards, monitoring real or near real time data, providing cues to 
the operational teams to take actions, so that the processes follow the expected trend 
and if there are any fluctuations, they can take immediate action and then you have 
tactical dashboards which are used for monitoring specific campaigns of sales data, 
maybe they can be used for a specific purpose and in this case, they would be limited 
tactical dashboards as the word indicates, it is a hybrid of both analytical and 
operational dashboards with some elements of strategy coming here and there. 
  
For example, if you are running a marketing campaign in a company, it is supposed to 
be for a short term and helping you reach particular targets, so now try to understand 
how this would flow, so as a strategy person in your strategy dashboard, you would 
observe sales coming down and you would ask your analyst to look out for reasons 
on exploring, he finds that couple of regions or a products are not doing well compared 
to last year or compared to the competitors stats and then the operations people would 
find in an operations dashboard scenario, the sales turnout has been falling down for 
couple of last weeks for reasons that are not known to them, from an operations 
scenario, the same thing can be analysed in for in terms of falling sales across specific 
stores where the sales have been dropping than normal, so all these trends can be 
combined together and put into a tactical dashboard saying that the company is 

## Page 6

 
 
 
 
 Page 6 of 8 
 
running a specific campaign for stores and for particular products in the stores for the 
next few weeks and help them improve sales and achieve the overall targets. So, you 
can see the level of integration that is coming both from the operational element, 
analyst elements and the strategic elements, we will now look at tactical dashboards, 
tactical dashboards are a mixture of strategic and operational dashboards with 
elements of analytical dashboards also, these are designed for particular objective in 
mind for a short to medium term guidance helping the companies to achieve specific 
objectives, for example, a marketing campaign, let us say while observing the strategy 
trends, the management feels they are likely to miss the current year targets because 
less than expected sales performance from couple of regions, the analysts would look 
for the regions which are not doing well or the particular product lines or departments 
which are not performing up to the mark, the operational teams or the operational 
performance dashboards would then give cues about which specific product lines are 
not doing well or what is the daily trends in sales, in specific stores or in retail outlets. 
While taking these cues together, the tactical dashboard designed for a specific 
campaign would capture these elements targeting the daily sales activity to the 
campaign targets and assimilating that to the overall target. 
  
In such a way, the tactical dashboard would act as a bridge between strategy analysis 
and operations enabling the organisations to achieve specific objects in a short to 
medium term time frame, they are also designed with specific purpose in object in 
mind to create impact in a short period of time. The tactical dashboards will have a 
blend summary of KPIs with different levels of interactivity for different people in the 
organisation, the tactical dashboard looked by a strategy manager would be focused 
on aggregate trends coming from the specific campaign, whereas the analyst and the 
operation people would have finer details of how the campaign performance is being 
done and what cues to be given to the field functionaries to ensure that the campaign 
targets are met. In this way, tactical dashboard is a very important dashboard concept 
that is used by organisations to reach short term objectives or any specific objectives. 
  
Now, we will be looking at a couple of principles that help one to enhance the usability 
of the dashboards. These principles can be thought of as guideposts for designing or 
increasing the usability of dashboards. First and foremost, the purpose of any 
dashboard is to drive action from data insights. 
  
To achieve this purpose, one has to organise the information to support a particular 
meaning and its use. Let us say you are trying to analyse sales in a coming from a 
product line across regions. Therefore, coding the stores or retail outlets in the same 
region with the same colour or following some amount of contrast and white space to 
distinguish regions can be visually enhancing the appeal for different regions for a 
particular product type. 
  
This would give right away the attention to the regions which have not reached the 
targets or which are doing well. So, this way you can guide the attention of the user to 

## Page 7

 
 
 
 
 Page 7 of 8 
 
particular spots onto your visualisation. Similarly, maintaining consistency in colour, 
thickness or visual application of visual attributes for a particular purpose will enable 
quick action. 
  
Let me give you an example. Let us say you have coloured a particular product to be 
yellow and some other product to be blue. Whenever you are mentioning or using this 
particular product or using this particular category type for any calculation, graphic or 
showing the trend, if you maintain this colour, it will be visually appealing and also 
enhancing the recall of the audience to that particular product. 
  
A best case in example is colouring of Democrats as blue and Republicans as red. 
Irrespective of the news channel, one can readily recognise blue reflects Democrats, 
red reflects Republicans and they can intuitively make comparisons and draw 
conclusions. So, maintaining consistency in colour and other visual attributes used for 
certain categories across the visualisation even at the levels of drill down, this would 
enhance the usability and appeal of the dashboard. 
  
The next step is to make your visual aesthetically pleasing. Always remember your 
visual should be easy to interpret, accessible and aesthetically pleasing. Aesthetically 
pleasing things have more appeal for human eye and can lead to higher information 
retention and recall. 
  
For example, when you have a well designed dashboard or a graphic which 
seamlessly blends into natural order of things like there is a logical order, the darker 
colours reflect stronger phenomenon, lighter colours reflect lower phenomenon, there 
is a ordering that is well present in the data, there are visual cues which can distinguish 
between above average and below average performance. These things would 
enhance the appeal of the visual and the attention of your audience. Making your 
visual aesthetically pleasing especially from a users perspective is very very important 
in improving the effectiveness and expressiveness of your visual. 
  
Finally, you can use your dashboard as a launchpad. You have to build a narrative 
which is driven from the readers perspective helping them to go through the story as 
you would want them to go through by enabling action from their end. This would also 
make them partner in the journey and make them own the insights and the actions 
they want to take from the dashboard. 
  
There will be a connection through which they can build their own narrative guided by 
your visuals to the insights and to the action that you want them to take upon. 
Therefore, using your dashboard as a launchpad to drive readers narrative and 
thinking from readers perspective to build that narrative and enable the visuals to guide 
this narrative at each step should be thought before and planned and executed 
accordingly. Now, finally coming to the most important aspect test the usability of your 
design. 

## Page 8

 
 
 
 
 Page 8 of 8 
 
  
Though you have taken care of the all 4 steps from the beginning, you have to 
remember you are working from your own perspective as an analyst, as a designer, 
as a businessman. Now, we will come to the last, but the most important aspect testing 
the usability of the dashboard. Though you have taken care of the 4 steps mentioned 
above, these are done from a perspective of the designer or the author. 
  
As a business analyst or a dashboard designer, you would work taking care of these 
aspects, but again you are working from your own perspective. It is always advised 
and it is better that the usability of the dashboard is tested before it is deployed. And 
in fact, you can you prototype versions to specific users for critical review and inputs 
and iterate the process to improve your dashboards effectiveness and 
expressiveness. 
  
Always remember data visualisation and storytelling is an iterative process. Data 
visualisation and storytelling is always iterative process. If you recall the 7 stages of 
data visualisation, the last and the final step is interaction and iteration, where you 
interact with the various stakeholders, take their inputs, refine your visuals and come 
back them with more compelling story and narrative framework. 
  
Likewise, the dashboards are also developed in an iterative fashion. Though they are 
fixed for a certain period of time, always one should take periodic reviews of the 
dashboard design both from the usability perspective and their relevance perspective, 
so that they remain concurrent and relevant to the users and enhance their usability 
on a regular basis. 
  
  
------------------------------------------------------End----------------------------------------------------- 
 

Tags: #statistics #machine-learning #data-science #statistical-modelling
