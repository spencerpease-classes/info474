// Setup ---------------------------------------------------------------------

var margin = {top: 25, bottom: 10, left: 25, right: 25},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom
    slider_height = 150 - margin.top - margin.bottom;

var startDate = new Date("2018-08-11"),
    endDate = new Date("2018-08-30");

AQI_breaks = [12.0,  35.5,  55.5, 150.5, 250.5];
AQI_colors = ["#00E400", "#FFFF00", "#FF7E00", "#FF0000", "#8F3F97", "#7E0023"];
color_scale = AQI_colors;

var data_path = "data/pm25_data.csv"

var parseDate = d3.timeParse("%Y-%m-%d");

var formatDay = d3.timeFormat("%d");
var formatMonthDate = d3.timeFormat("%b %d");
var formatDate = d3.timeFormat("%Y-%m-%d");


// Load data -----------------------------------------------------------------

function prepare_data(d) {
  d.pm25 = +d.pm25;
  d.date = parseDate(d.date);
  d.hour = +d.hour;
  d.day = +d.day;
  return d;
}

d3.csv(data_path, prepare_data, function(data) {
  dataset = data;
  update(d3.min(data, function(d) { return d.date; }))
})


// Define scales -------------------------------------------------------------

// For the slider
var xt = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, width])
  .clamp(true);

// For the plot
var x = d3.scaleBand()
  .range([margin.left, width - margin.right])
  .padding(0.1)

var y = d3.scaleLinear()
  .range([height - margin.bottom, margin.top])

// for the color
colorAQI = function(pm25) {

  var color = "#A2A2A2"

  if (pm25 < AQI_breaks[0]) {
    color = color_scale[0];
  } else if (pm25 < AQI_breaks[1]) {
    color = color_scale[1];
  } else if (pm25 < AQI_breaks[2]) {
    color = color_scale[2];
  } else if (pm25 < AQI_breaks[3]) {
    color = color_scale[3];
  } else if (pm25 < AQI_breaks[4]) {
    color = color_scale[4];
  } else if (pm25 >= AQI_breaks[4]) {
    color = color_scale[5];
  }

  return color;

}


// Create tooltip ------------------------------------------------------------

var div = d3.select('#vis').append('div')
  .attr('class', 'tooltip')
  .style('display', 'none');

function mouseover() { div.style('display', 'inline'); }

function mousemove(){
  var d = d3.select(this).data()[0]
  div
    .html("pm 2.5" + '<hr/>' + d.pm25)
    .style('left', (d3.event.pageX - 34) + 'px')
    .style('top', (d3.event.pageY - 12) + 'px');
}

function mouseout() { div.style('display', 'none'); }


// Create slider -------------------------------------------------------------

var svgSlider = d3.select("#slider")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", slider_height);

var slider = svgSlider.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + margin.left + "," + slider_height / 2 + ")");


// Draw slider ---------------------------------------------------------------

slider.append("line")
    .attr("class", "track")
    .attr("x1", xt.range()[0])
    .attr("x2", xt.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { update(xt.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(xt.ticks(10))
    .enter()
    .append("text")
    .attr("x", xt)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatMonthDate(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatMonthDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")


// Update slider -------------------------------------------------------------

function update(h) {

  // update position and text of label according to slider scale
  handle.attr("cx", xt(h));
  label
    .attr("x", xt(h))
    .text(formatMonthDate(h));

  // filter data set and redraw plot
  var newData = dataset.filter(function(d) {
    return d.day == +formatDay(h);
  })
  drawPlot(newData);
}

// Create plot ---------------------------------------------------------------

var svgPlot = d3.select("#vis").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom + 20);

var plot = svgPlot.append("g")
  .attr("class", "plot")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add plot axes
var xAxis = d3.axisBottom()
  .scale(x);

var yAxis = d3.axisLeft()
  .scale(y);

plot.append("g")
  .attr("transform", "translate(0," + (height - margin.bottom) + ")")
	.attr("class", "x-axis")
	.call(xAxis);

plot.append("g")
	.attr("transform", "translate(" + margin.left + ",0)")
	.attr("class", "y-axis")
  .call(yAxis);


// Add labels
plot.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width/2)
    .attr("y", height + 20)
    .text("Hour of Day");

plot.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("PM2.5 (micrograms per cubic meter)");


// Draw Plot -----------------------------------------------------------------

function drawPlot(data) {

  x.domain(data.map(function(d) { return d.hour; }));
  y.domain([0, 200]);
  // y.domain([0, d3.max(data, function(d) { return d.pm25; })]);

  plot.selectAll(".x-axis")
    .transition()
    .duration(0)
    .call(xAxis);

  plot.selectAll(".y-axis")
    .transition()
    .duration(0)
    .call(yAxis);

  var bar = plot.selectAll(".bar")
    .data(data);



  bar.enter().append("rect")
    .attr("class", "bar")
    .attr("width", x.bandwidth())
    .merge(bar)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout)
    .transition().duration(1000)
    .attr("x", function(d) { return x(d.hour); })
    .attr("y", function(d) { return y(d.pm25); })
    .attr("fill", function(d) { return colorAQI(d.pm25); })
    .attr("height", function(d) { return y(0) - y(d.pm25); });

  bar.exit().remove();

}
