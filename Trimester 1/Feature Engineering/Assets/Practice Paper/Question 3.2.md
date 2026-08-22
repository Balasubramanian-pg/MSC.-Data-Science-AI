**Part (b)**
*   **(i) What is an edge in an image? [2 Marks]**
    An edge is a boundary or a region in an image where there is a sharp, sudden change in brightness, color, or pixel intensity. Edges typically correspond to the boundaries of objects, shadows, or structural changes in the scene.
*   **(ii) Why is smoothing (noise removal) important before feature extraction in images? [2 Marks]**
    Real-world images contain "noise" (random variations in pixel color/brightness due to camera sensors or lighting). Edge detection algorithms look for sudden pixel changes. If noise is not smoothed out (e.g., using Gaussian blur), the algorithm will mistakenly detect this noise as hundreds of fake edges, ruining the extraction process.
