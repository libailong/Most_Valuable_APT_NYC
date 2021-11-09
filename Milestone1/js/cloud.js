
function draw(data) {
  svg.append("g")
     .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
     .selectAll("word")
     .data(data)
     .enter().append("text")
     .style("fill", "pink")
     .style("font-size", d => d.size)
     .attr("text-anchor", "middle")
     .style("font-family", "Impact")
     .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";})
     .text(d => d.text);
}


var wordcloud = [{word: "Queens ", count: "14"}, {word: "Payback low", count: "13"}, {word: "Worth investment", count: "11"}, {word: "Bad", count: "11"}, {word: "Nice house", count: "11"}, {word: "location", count: "11"}, {word: "bright", count: "10"}, {word: "dark", count: "9"}, {word: "park", count: "9"}, {word: "smelly", count: "9"}, {word: "crowded", count: "9"}, {word: "recommend", count: "10"}, {word: "lake", count: "11"}, {word: "grid", count: "10"}, {word: "field", count: "10"}, {word: "see", count: "8"}, {word: "window", count: "8"}, {word: "Manhattan", count: "7"}, {word: "Awesome", count: "9"}, {word: "Broadway", count: "8"} ]
var cloudlayout = {top: 20, bottom: 20, left: 20, right: 20};
var height = 600 - cloudlayout.top - cloudlayout.bottom;
var width = 600 - cloudlayout.right - cloudlayout.left;


var svg = d3.select("#mycloud")
    .append("svg")
    .attr("height", cloudlayout.top + height + cloudlayout.bottom)
    .attr("width", cloudlayout.left + width + cloudlayout.right)
    .append("g")
    .attr("transform", "translate(" + cloudlayout.left + "," + cloudlayout.top + ")");


var layout = d3.layout.cloud()
  .size([width, height])
  .words(wordcloud.map(function(d) { return {text: d.word, size:d.count}; }))
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .padding(7)
  .fontSize(function(d) { return d.size * 4; })
  .on("end", draw);

layout.start();
