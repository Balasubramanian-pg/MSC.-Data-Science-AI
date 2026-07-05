# Initialize the notebook output mode

output_notebook()  

def create_basic_line_plot():
    """
    Creates and displays a basic line plot using raw Python lists.
    Demonstrates figure instantiation, adding a line glyph, and basic styling.
    """
    # STEP 1: Create the figure (the canvas)
    # We define the dimensions (height/width) and add a descriptive title.
    p = figure(
        height=300, 
        width=300, 
        title="Basic Line Plot"
    )

    # STEP 2: Prepare the data
    # Standard Python lists representing X and Y coordinates
    x_coords = [1, 2, 3, 4, 5]
    y_coords = [6, 7, 2, 1, 5]

    # STEP 3: Add the glyph (line)
    # We bind the data to the line glyph and apply aesthetic formatting.
    p.line(
        x=x_coords, 
        y=y_coords,
        legend_label="Series 1", # Adds an entry to the legend
        line_width=2,            # Thickness of the line in pixels
        line_color="red",        # Color of the line
    )

    # STEP 4: Render the plot
    show(p)
