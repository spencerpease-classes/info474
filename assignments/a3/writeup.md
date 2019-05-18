## Background

Last summer, Washington experienced several days of smoky air due to several
large wildfires across the Pacific Northwest. Any smoke particulate in the air
is unhealthy to breath for any period of time, but it is especially dangerous
for those with chronic health conditions, such as asthma, or those who are
required to spend their day working outdoors.

Researchers in the EPA and National Forest Service are able to track smoke
levels by looking at the data from federal air quality monitoring stations
across the US. In recent years, work has been done to make this data more
accessible and easy to work with, putting useful information in the hands of
more people.

## The Domain

In this project, we will be looking at air quality data in Seattle around the
time of peak smoke levels in August 2018. Specifically, we will be looking at
air particulate matter at a size of 2.5 micrograms or greater for one monitor in
downtown Seattle. This is measured as "pm 2.5", with units of microgram per cubic
meter. Every monitor makes one measurement per hour. In order to smooth the data
and dampen potential outliers, a "lagged-mean" filter called NowCast is applied
to the data.

The target audience for this project would be members of the local community,
who are interested in looking at trends in air quality, but lack domain
expertise.

## The Visualization

A bar plot was chosen as the primary visualization, which will show the PM 2.5
NowCast value for every hour of a given day. Bar plots are good at showing
differences in length and position encodings for ratio data, and they will
be colored based on the EPA air quality category. Together, these encodings will
allow the audience to see the magnitude of difference between two PM 2.5
measurement, while also being able to quickly see the ordinal rank of each
measurement.

## The Interaction

Our audience is likely to be interested in not just the variation in air quality
throughout a day, but variations in air quality between days as well. In order
to facilitate this kind of exploration, we will implement a slider that allows
the audience to change the day and update the bar plot accordingly. When the
date is changed, the bars for each hour will adjust height and change color to
display the new data. This will allow users to see the change as a flow instead
of something abrupt, matching with the fact that air quality doesn't instantly
change either.

In addition, each bar will display it's PM 2.5 value in a tooltip when hovered
over. This will allow those interested in exact numbers to get the information
they want without distracting other users who are more interested in trends and
differences.


## Application Description

The application in its final form is mostly similar to the storyboard design.
The primary visualization is the bar plot, which shows PM 2.5 level for each
hour of a day. The bars are also colored based on their air quality category,
and hovering over a bar will display it's PM 2.5 value. Users can scroll through
a few weeks worth of data to see how air quality changed over time. The
visualization beings to update as soon as the slider stops moving, adding to the
flowing nature of the change.

One change was in the color palette used to encode air quality category. The
official colors most closely follow a qualitative pattern, but the data they
encode has order, and would better be described by a sequential palette. On top
of that, the official palette isn't colorblind friendly either. A legend was
also added, to explain more of what each category means.



