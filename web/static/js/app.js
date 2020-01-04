// Initialize SVG Chart 1

var svgWidth = 700;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Load data
d3.csv("/static/data/housing.csv").then(function(housing_data) {

	console.log(housing_data);
	document.getElementById("test1").innerHTML = housing_data;
  

    var stack = d3.stack()
	  .keys(['Never', 'Sometimes', 'Often'])
	//   .value(function(d) { return d.values.value; })

    var series = stack(housing_data);

    console.log(series)

   			//Set up scales
			var xScale = d3.scaleBand()
				.domain(d3.range(series.length))
				.range([0, width])
				.paddingInner(0.05);
		
			var yScale = d3.scaleLinear()
				.domain([0,				
					d3.max(series, function(d) {
						return 100;
					})
				])
				.range([height, 0]);  // <-- Flipped vertical scale
				
			//Easy colors accessible via a 10-step ordinal scale
			var colors = d3.scaleOrdinal(d3.schemeCategory10);
    
      // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
      var svg = d3.select("#chart1")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

      // Add a group for each row of data
			var groups = svg.selectAll("g")
				.data(series)
				.enter()
				.append("g")
				.style("fill", function(d, i) {
					return colors(i);
				});
	
			// Add a rect for each data value
			var rects = groups.selectAll("rect")
				.data(function(d) { return d; })
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return xScale(i);
				})
				.attr("y", function(d) {
					return yScale(d[1]);  // <-- Changed y value
				})
				.attr("height", function(d) {
					return yScale(d[0]) - yScale(d[1]);  // <-- Changed height value
				})
				.attr("width", xScale.bandwidth());
    
  }).catch(function(error) {
    console.log(error);
  });



