# Assignment 1: Visualization Design

> Spencer Pease  
> INFO 474, Sp 19  


## Visualization

![Plot comparing antibiotic effectiveness against different bacteria.][plot]


## Design Rationale

The goal of this visualization is to compare the relationship each antibiotic
has with with each tested bacteria. A heatmap was chosen because is good at 
showing the relative differences between two interacting variables. Its purpose
is not to present the exact data (looking at a table of number would be more
effective for that), but to make it easy to see the realationships between
different bacteria / antibiotic pairs. Arranging the data in a grid with colored
cells makes it easy to see these differences. In this case, antibiotics are
shown on the $x$-axis, and bacteria are shown on the $y$-axis, where each
rectangle represents one combination of the two. Since each axis represents
nominal data with text labels, the axes are sorted alphabetically to aid in
searching for a specific bacteria / antibiotic pair. 

The primary relationship this visualization focuses on is the MIC values for
every bacteria / antibiotic pair, which is encoded in the color values of the
heatmap. Because the MIC values have a range extending across 6 orders of
magnitude, with most values concentrated around the lower limits, the $log_10$
transform of the data was used to make the differences between values more
apparent. Since this data is quantitative (ratio), we can color it based on a 
continious color scale. The _viridis_ color scale was chosen for its perceptual
clarity.

The secondary relationship in this visualization is a bacteria's response to
"Gram Staining". Because the response is binary (either positive or negative),
bacteria can simply be seperated in categories based on their response. This is
encoded by faceting the heatmap by "Gam Staining" response, which presents
itself as seperation in the vertical (bacteria) axis. Each facet is labeled with
its category for optimal clarity.

This visualization was created using _R_ and the _ggplot2_ package. The script
used to create this visualization can be found [here](https://github.com/spencerpease-classes/info474/blob/master/assignments/a1/script.R).


[plot]: plot.png
