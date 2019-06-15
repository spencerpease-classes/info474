const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');


const transitionLength = 350;

const margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 300 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

var x = d3.scaleBand()
  .domain(["Addition", "Deletion"])
  .range([margin.left, width - margin.right])
  .padding(0.1);

var y = d3.scaleLinear()
  .domain([0, 1])
  .range([height - margin.bottom, margin.top]);


var editColor = function(editType) {

  const color_scale = {
    addition: "#66c2a5",
    deletion: "#fc8d62",
    neutral: "#515151"
  };

  var color = color_scale["neutral"];

  if (editType == "Addition") {
    color = color_scale["addition"];
  } else if (editType == "Deletion") {
    color = color_scale["deletion"];
  }

  return color;

}


class D3RatioBars extends D3Component {

  initialize(node, props) {

    const svg = this.svg = d3.select(node).append('svg');

    svg.attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', 'auto')
    .append("g");

    var xAxis = d3.axisBottom()
      .scale(x);

    var yAxis = d3.axisLeft()
      .scale(y);

    svg.append("g")
      .attr("transform", "translate(0," + (height - margin.bottom) + ")")
      .attr("class", "x-axis")
      .call(xAxis);

    svg.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .attr("class", "y-axis")
      .call(yAxis);

  }

  update(props, oldProps) {

    const ras = +props.ras;
    const rds = +props.rds;
    const editMagnitude = ras + rds;

    const editData = [
      { editType: "Addition", size: ras, fraction: (ras / editMagnitude) },
      { editType: "Deletion", size: rds, fraction: (rds / editMagnitude) }
    ];

    var bar = this.svg.selectAll(".bar")
      .data(editData);

    // var barText = this.svg.selectAll(".text")
    //   .data(editData);


    bar.enter().append("rect")
      .attr("class", "bar")
      .merge(bar)
      .transition().duration(transitionLength)
      .attr("x", function(d) { return x(d.editType); })
      .attr("y", function(d) { return y(d.fraction); })
      .attr("height", function(d) { return y(0) - y(d.fraction); })
      .attr("width", x.bandwidth())
      .attr("fill", function(d) { return editColor(d.editType); });

    bar.exit().remove();

    // barText.enter().append("text")
    //   .attr("class", "label")
    //   .merge(barText)
    //   .transition().delay(transitionLength).duration(0)
    //   .attr("x", function(d) { return x(d.editType) + x.bandwidth() / 2 ; })
    //   .attr("y", function(d) { return y(d.fraction); })
    //   .attr("dy", ".75em")
    //   .attr("text-anchor", "middle")
    //   .text(function(d) { return d.fraction.toFixed(3); });

    // barText.exit().remove();

  }
}

module.exports = D3RatioBars;
