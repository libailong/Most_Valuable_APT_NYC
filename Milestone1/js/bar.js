var barlayout = {top: 20, bottom: 50, left: 300, right: 40};
var height = 600 - barlayout.top - barlayout.bottom;
var width = 1600 - barlayout.right - barlayout.left;
var svg = d3.select("#mybar")
     .append("svg")
     .attr("height", barlayout.top + height + barlayout.bottom)
     .attr("width", barlayout.left + width + barlayout.right)
     .append("g")
     .attr("transform", "translate(" + barlayout.left + "," + barlayout.top + ")");

d3.csv("data/ROI_Dynamic.csv", function(dataset){
  var yaxis = d3.scaleBand()
    .range([ 0, height ])
    .domain(dataset.map((d) => d.Zipcode))
    .padding(.10);
  svg.append("g")
    .call(d3.axisLeft(yaxis))

  var xaxis = d3.scaleLinear()
     .domain([0, 0.08])
     .range([0, 500]);
  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xaxis))
     .selectAll("text")
     .attr("transform", "translate(-10,0)rotate(-45)")
     .style("text-anchor", "end");

  svg.append("text")
      .attr("class", "xlabel")
      .attr("text-anchor", "end")
      .attr("x", 530)
      .attr("y", height + 50)
      .text("ROI:Revenue / cost");

  svg.append("text")
      .attr("class", "ylabel")
      .attr("text-anchor", "end")
      .attr("y",1)
      .text("Zipcode in NYC");

  svg.selectAll("myRect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", xaxis(0) )
    .attr("y", function(d) { return yaxis(d.Zipcode); })
    .attr("width", function(d) { return xaxis(d.Payback); })
    .attr("height", yaxis.bandwidth() )
    .attr("fill", "steelblue")

})
