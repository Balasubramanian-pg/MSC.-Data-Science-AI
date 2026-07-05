---
title: W09 - Module 4b. Python Seaborn Package
module: Statistical Modelling And Inferencing
week: W09 - Module 4b. Python Seaborn Package
---

## [Visualizing Continuity with Seaborn (`lineplot` & `relplot`)](./Visualizing%20Continuity%20with%20Seaborn%20%28%60lineplot%60%20%26%20%60relplot%60%29.md)

## [Apply a clean aesthetic grid globally](./Apply%20a%20clean%20aesthetic%20grid%20globally.md)

## [=====================================================================](./%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D.md)

## [1. LOAD THE DATASET](./1.%20LOAD%20THE%20DATASET.md)

## [This pulls the default fMRI dataframe built directly into Seaborn](./This%20pulls%20the%20default%20fMRI%20dataframe%20built%20directly%20into%20Seaborn.md)

## [Display the first few rows to understand the structure](./Display%20the%20first%20few%20rows%20to%20understand%20the%20structure.md)

## [2. CORE FUNCTION: Simple Line Plot with Statistical Aggregation](./2.%20CORE%20FUNCTION%20-%20Simple%20Line%20Plot%20with%20Statistical%20Aggregation.md)

## [Note: Because there are multiple subjects ('s1', 's2', etc.) for each](./Note%20-%20Because%20there%20are%20multiple%20subjects%20%28%27s1%27%2C%20%27s2%27%2C%20etc.%29%20for%20each.md)

## [timepoint, Seaborn automatically aggregates them. It plots the MEAN as a](./timepoint%2C%20Seaborn%20automatically%20aggregates%20them.%20It%20plots%20the%20MEAN%20as%20a.md)

## [solid line and a 95% Confidence Interval (CI) as a shaded band around it.](./solid%20line%20and%20a%2095%25%20Confidence%20Interval%20%28CI%29%20as%20a%20shaded%20band%20around%20it.md)

## [3. MULTIDIMENSIONAL: Adding Categories (Hue & Style)](./3.%20MULTIDIMENSIONAL%20-%20Adding%20Categories%20%28Hue%20%26%20Style%29.md)

## [We use 'hue' to color lines by region and 'style' to change line patterns by event.](./We%20use%20%27hue%27%20to%20color%20lines%20by%20region%20and%20%27style%27%20to%20change%20line%20patterns%20by%20event.md)

## [Move the legend outside the plot box so it doesn't overlap data points](./Move%20the%20legend%20outside%20the%20plot%20box%20so%20it%20doesn%27t%20overlap%20data%20points.md)

## [4. ADVANCED: Subplot Faceting with `relplot`](./4.%20ADVANCED%20-%20Subplot%20Faceting%20with%20%60relplot%60.md)

## [As mentioned in the transcript, `relplot` (Relational Plot) is a figure-level](./As%20mentioned%20in%20the%20transcript%2C%20%60relplot%60%20%28Relational%20Plot%29%20is%20a%20figure-level.md)

## [function. It allows you to automatically split data into physical subplots](./function.%20It%20allows%20you%20to%20automatically%20split%20data%20into%20physical%20subplots.md)

## [(columns/rows) for a crystal-clear side-by-side trend comparison.](./%28columnsrows%29%20for%20a%20crystal-clear%20side-by-side%20trend%20comparison.md)

## [Set an overall master title above all subplots](./Set%20an%20overall%20master%20title%20above%20all%20subplots.md)

## [Technical Deep-Dive: Visualizing Dimensions & Reducing Cognitive Load](./Technical%20Deep-Dive%20-%20Visualizing%20Dimensions%20%26%20Reducing%20Cognitive%20Load.md)

## [Global styling configuration for clean, publication-ready visuals](./Global%20styling%20configuration%20for%20clean%2C%20publication-ready%20visuals.md)

## [Load the built-in fMRI time-series dataset discussed in the transcript](./Load%20the%20built-in%20fMRI%20time-series%20dataset%20discussed%20in%20the%20transcript.md)

## [1. THE BASELINE PLOT: Understanding Statistical Aggregation](./1.%20THE%20BASELINE%20PLOT%20-%20Understanding%20Statistical%20Aggregation.md)

## [This displays how Seaborn calculates the mean and error band automatically.](./This%20displays%20how%20Seaborn%20calculates%20the%20mean%20and%20error%20band%20automatically.md)

## [Customizing layout via Matplotlib layer over Seaborn](./Customizing%20layout%20via%20Matplotlib%20layer%20over%20Seaborn.md)

## [2. OVERLAYING DIMENSIONS: The Hue + Style Approach (Axes-Level)](./2.%20OVERLAYING%20DIMENSIONS%20-%20The%20Hue%20%2B%20Style%20Approach%20%28Axes-Level%29.md)

## [Intent: Bring in 'region' and 'event' parameters without splitting the plot.](./Intent%20-%20Bring%20in%20%27region%27%20and%20%27event%27%20parameters%20without%20splitting%20the%20plot.md)

## [Note: Great for digital presentations, but has limitations in Black & White printouts.](./Note%20-%20Great%20for%20digital%20presentations%2C%20but%20has%20limitations%20in%20Black%20%26%20White%20printouts.md)

## [Move the legend outside of the main charting area to prevent data overlapping](./Move%20the%20legend%20outside%20of%20the%20main%20charting%20area%20to%20prevent%20data%20overlapping.md)

## [3. FACETING (SMALL MULTIPLES): Reducing Cognitive Load with `relplot`](./3.%20FACETING%20%28SMALL%20MULTIPLES%29%20-%20Reducing%20Cognitive%20Load%20with%20%60relplot%60.md)

## [Intent: Replicate the 'Small Multiples' concept from PowerBI. By separating](./Intent%20-%20Replicate%20the%20%27Small%20Multiples%27%20concept%20from%20PowerBI.%20By%20separating.md)

## [categories into distinct subplot columns, we drastically reduce the audience's mental processing effort.](./categories%20into%20distinct%20subplot%20columns%2C%20we%20drastically%20reduce%20the%20audience%27s%20mental%20processing%20effort.md)

## [Apply global title architecture across the complete Figure grid](./Apply%20global%20title%20architecture%20across%20the%20complete%20Figure%20grid.md)

## [Orientation Variation A: Columnar Layout (Side-by-Side Comparison)](./Orientation%20Variation%20A%20-%20Columnar%20Layout%20%28Side-by-Side%20Comparison%29.md)
