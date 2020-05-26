// Load data
d3.json("/data").then(d => {
	
	var leftOver_money = d['money_leftover'] 
	chart1(leftOver_money)

	var affordExpense = d['afford_expense']
	chart2(affordExpense)

	// var rejected_credit  = d['rejected_credit']
	// chart3(rejected_credit)

	var payday_loan = d['payday_loan']
	chart4(payday_loan)

	var housing = d['housing']
	chart5(housing)
})

// d3.datum("/static/data/money_left.datum").then(d => chart1(d))
// d3.datum("/static/data/2000_expense.datum").then(d => chart2(d))
// d3.datum("/static/data/rejected_credit.datum").then(d => chart3(d))
// d3.datum("/static/data/payday.datum").then(d => chart4(d))
// d3.datum("/static/data/housing.datum").then(d => chart5(d))

// Draw Chart 1 -- Money Left at end of month
function chart1(datum) {
	
	// // Get data for gets 
	//var keys = datum.columns.slice(2);
	var keys = ["Always", "Often", "Sometimes", "Rarely","Never"]; 
	console.log(keys)
	// // Get the names for the demographic categories
	var category   = [...new Set(datum.map(d => d.Category))]

	// Create dropdown for choosing demographic categories
	var options = d3.select("#category1").selectAll("option")
		.data(category)
		.enter().append("option")
		.text(d => d)

	// Create parameters for chart
	var svg = d3.select("#chart1"),
		margin = {top: 35, left: 55, bottom: 70, right: 50},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)

	var y = d3.scaleLinear()
		.rangeRound([height - margin.bottom, margin.top])

	var xAxis = svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")

	var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

	// Sets up colors
	var z = d3.scaleOrdinal()
		.range(["#4575b4","#74add1","#abd9e9","#f46d43", "#d73027"]) //Diverging-- blue to red, from colorbrewer2.org//
		.domain(keys);

	// Gets deomgraphic category to plot
	update(d3.select("#category1").property("value"), 0)

	// Creates the chart
	function update(input, speed) {

		// Gets the data filtered by the chosen category
		var data = datum.filter(f => f.Category == input)

		// Calcs total of values
		data.forEach(function(d) {
			d.total = d3.sum(keys, k => +d[k])
			return d
		})
		// Sets y domain based on total
		y.domain([0, d3.max(data, d => (d3.sum(keys, k => +d[k])-5))]).nice();

		svg.selectAll(".y-axis").transition().duration(speed)
			.call(d3.axisLeft(y).ticks(null, "s"))
			.selectAll("text")
			.style("font-size","14px")


		// Sets x domain based on deographic Groups in the chosen category
		x.domain(data.map(d => d.Group));

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.selectAll("text")	
				.style("text-anchor", "start")
				.style("font-size","14px")
				.attr("transform", "rotate(65)")
				.attr("dx", "1em")
				.attr("dy", "-.1em");
				

		// Uses stack() to re-order data so that it can be used to create stacked bar chart
		var group = svg.selectAll("g.layer")
			.data(d3.stack()
				.order(d3.stackOrderReverse)
				.keys(keys)(data), d => d.key)
				
		// Clears and then draws bars
		group.exit().remove()

		group.enter().append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		var bars = svg.selectAll("g.layer").selectAll("rect")
			.data(d => d, e => e.data.Group);

		bars.exit().remove()

		bars.enter().append("rect")
			.attr("width", x.bandwidth())
			.merge(bars)
		.transition().duration(speed)
			.attr("x", d => x(d.data.Group))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]))

		// Clears and then adds text to chart
		var text = svg.selectAll(".text")
			.data(data, d => d.Group);

		text.exit().remove()

		text.enter().append("text")
			.attr("class", "text")
			.attr("text-anchor", "middle")
			.merge(text)
		.transition().duration(speed)
			.attr("x", d => x(d.Group) + x.bandwidth() / 2)
			.attr("y", d => y(d.total) -5)
		
		// Creates y axis label
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", x(0) - 50 )
			.attr("x",0 - (height / 2)+ 20)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("font-size","16px")
			.text("Percent of Respondents"); 	


		// Adds legend
		var legend = svg.selectAll(".legend")
			.data(keys)
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", (d, i) => `translate(${margin.left},${i * 30})`);
	
		legend.append("text")
			.attr("x", width - 10)
			.attr("y", margin.top)
			.attr("text-anchor", "end")
			.attr("dy", "1em")
			.text(d => d);
	
		legend.append("rect")
			.attr("width", 19)
			.attr("height", 19)
			.attr("x", width)
			.attr("y", margin.top)
			.attr("fill", z)
			.attr("stroke", z)
			.attr("value", d => d)
		} // End of plotting function
	
	// Updates values for plotting based on category dropdown selection
	var select = d3.select("#category1")
		.on("change", function() {
			update(this.value, 750)
		})
} // End of code for chart1

//---------------------------------

// Draw Chart 2 -- $2000 Expense
function chart2(datum) {
	
	// Get data for gets 
	var keys = ["certain I could", "probably could", "I don't know", "probably not", "certain I could not"];; 

	// Get the names for the demographic categories
	var category   = [...new Set(datum.map(d => d.Category))]

	// Create dropdown for choosing demographic categories
	var options = d3.select("#category2").selectAll("option")
		.data(category)
		.enter().append("option")
		.text(d => d)

	// Create parameters for chart
	var svg = d3.select("#chart2"),
		margin = {top: 35, left: 55, bottom: 70, right: 70},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)

	var y = d3.scaleLinear()
		.rangeRound([height - margin.bottom, margin.top])

	var xAxis = svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")

	var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

	// Sets up colors
	var z = d3.scaleOrdinal()
		.range(["#4575b4","#74add1","#abd9e9","#f46d43", "#d73027"]) //Diverging-- blue to red, from colorbrewer2.org//
		.domain(keys);

	// Gets deomgraphic category to plot
	update(d3.select("#category2").property("value"), 0)

	// Creates the chart
	function update(input, speed) {

		// Gets the data filtered by the chosen category
		var data = datum.filter(f => f.Category == input)

		// Calcs total of values
		data.forEach(function(d) {
			d.total = d3.sum(keys, k => +d[k])
			return d
		})
		// Sets y domain based on total
		y.domain([0, d3.max(data, d => (d3.sum(keys, k => +d[k])-5))]).nice();

		svg.selectAll(".y-axis").transition().duration(speed)
			.call(d3.axisLeft(y).ticks(null, "s"))
			.selectAll("text")
			.style("font-size","14px")


		// Sets x domain based on deographic Groups in the chosen category
		x.domain(data.map(d => d.Group));

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.selectAll("text")	
				.style("text-anchor", "start")
				.style("font-size","14px")
				.attr("transform", "rotate(65)")
				.attr("dx", "1em")
				.attr("dy", "-.1em");
				

		// Uses stack() to re-order data so that it can be used to create stacked bar chart
		var group = svg.selectAll("g.layer")
			.data(d3.stack()
				.order(d3.stackOrderReverse)
				.keys(keys)(data), d => d.key)
				
		// Clears and then draws bars
		group.exit().remove()

		group.enter().append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		var bars = svg.selectAll("g.layer").selectAll("rect")
			.data(d => d, e => e.data.Group);

		bars.exit().remove()

		bars.enter().append("rect")
			.attr("width", x.bandwidth())
			.merge(bars)
		.transition().duration(speed)
			.attr("x", d => x(d.data.Group))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]))

		// Clears and then adds text to chart
		var text = svg.selectAll(".text")
			.data(data, d => d.Group);

		text.exit().remove()

		text.enter().append("text")
			.attr("class", "text")
			.attr("text-anchor", "middle")
			.merge(text)
		.transition().duration(speed)
			.attr("x", d => x(d.Group) + x.bandwidth() / 2)
			.attr("y", d => y(d.total) -5)
		
		// Creates y axis label
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", x(0) - 50 )
			.attr("x",0 - (height / 2)+ 20)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("font-size","16px")
			.text("Percent of Respondents"); 	

		// Adds legend
		var legend = svg.selectAll(".legend")
			.data(keys)
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", (d, i) => `translate(${margin.left},${i * 30})`);
	
		legend.append("text")
			.attr("x", width - 10)
			.attr("y", margin.top)
			.attr("text-anchor", "end")
			.attr("dy", "1em")
			.text(d => d);
	
		legend.append("rect")
			.attr("width", 19)
			.attr("height", 19)
			.attr("x", width)
			.attr("y", margin.top)
			.attr("fill", z)
			.attr("stroke", z)
			.attr("value", d => d)
		} // End of plotting function
	
	// Updates values for plotting based on category dropdown selection
	var select = d3.select("#category2")
		.on("change", function() {
			update(this.value, 750)
		})
} // End of code for chart2

//-------------------------------------

// // Draw Chart 3 -- Rejected for credit
// function chart3(datum) {
	
// 	// Get data for gets 
// 	var keys = ["no","yes"]; 

// 	// Get the names for the demographic categories
// 	var category   = [...new Set(datum.map(d => d.Category))]

// 	// Create dropdown for choosing demographic categories
// 	var options = d3.select("#category3").selectAll("option")
// 		.data(category)
// 		.enter().append("option")
// 		.text(d => d)

// 	// Create parameters for chart
// 	var svg = d3.select("#chart3"),
// 		margin = {top: 35, left: 55, bottom: 70, right: 50},
// 		width = +svg.attr("width") - margin.left - margin.right,
// 		height = +svg.attr("height") - margin.top - margin.bottom;

// 	var x = d3.scaleBand()
// 		.range([margin.left, width - margin.right])
// 		.padding(0.1)

// 	var y = d3.scaleLinear()
// 		.rangeRound([height - margin.bottom, margin.top])

// 	var xAxis = svg.append("g")
// 		.attr("transform", `translate(0,${height - margin.bottom})`)
// 		.attr("class", "x-axis")

// 	var yAxis = svg.append("g")
// 		.attr("transform", `translate(${margin.left},0)`)
// 		.attr("class", "y-axis")

// 	// Sets up colors
// 	var z = d3.scaleOrdinal()
// 		.range(["#4575b4", "#d73027"]) //Diverging-- blue to red, from colorbrewer2.org//
// 		.domain(keys);

// 	// Gets deomgraphic category to plot
// 	update(d3.select("#category3").property("value"), 0)

// 	// Creates the chart
// 	function update(input, speed) {

// 		// Gets the data filtered by the chosen category
// 		var data = datum.filter(f => f.Category == input)

// 		// Calcs total of values
// 		data.forEach(function(d) {
// 			d.total = d3.sum(keys, k => +d[k])
// 			return d
// 		})
// 		// Sets y domain based on total
// 		y.domain([0, d3.max(data, d => (d3.sum(keys, k => +d[k])-5))]).nice();

// 		svg.selectAll(".y-axis").transition().duration(speed)
// 			.call(d3.axisLeft(y).ticks(null, "s"))
// 			.selectAll("text")
// 			.style("font-size","14px")


// 		// Sets x domain based on deographic Groups in the chosen category
// 		x.domain(data.map(d => d.Group));

// 		svg.selectAll(".x-axis").transition().duration(speed)
// 			.call(d3.axisBottom(x).tickSizeOuter(0))
// 			.selectAll("text")	
// 				.style("text-anchor", "start")
// 				.style("font-size","14px")
// 				.attr("transform", "rotate(65)")
// 				.attr("dx", "1em")
// 				.attr("dy", "-.1em");
				

// 		// Uses stack() to re-order data so that it can be used to create stacked bar chart
// 		var group = svg.selectAll("g.layer")
// 			.data(d3.stack()
// 				.order(d3.stackOrderReverse)
// 				.keys(keys)(data), d => d.key)
				
// 		// Clears and then draws bars
// 		group.exit().remove()

// 		group.enter().append("g")
// 			.classed("layer", true)
// 			.attr("fill", d => z(d.key));

// 		var bars = svg.selectAll("g.layer").selectAll("rect")
// 			.data(d => d, e => e.data.Group);

// 		bars.exit().remove()

// 		bars.enter().append("rect")
// 			.attr("width", x.bandwidth())
// 			.merge(bars)
// 		.transition().duration(speed)
// 			.attr("x", d => x(d.data.Group))
// 			.attr("y", d => y(d[1]))
// 			.attr("height", d => y(d[0]) - y(d[1]))

// 		// Clears and then adds text to chart
// 		var text = svg.selectAll(".text")
// 			.data(data, d => d.Group);

// 		text.exit().remove()

// 		text.enter().append("text")
// 			.attr("class", "text")
// 			.attr("text-anchor", "middle")
// 			.merge(text)
// 		.transition().duration(speed)
// 			.attr("x", d => x(d.Group) + x.bandwidth() / 2)
// 			.attr("y", d => y(d.total) -5)
		
// 		// Creates y axis label
// 		svg.append("text")
// 			.attr("transform", "rotate(-90)")
// 			.attr("y", x(0) - 50 )
// 			.attr("x",0 - (height / 2)+ 20)
// 			.attr("dy", "1em")
// 			.style("text-anchor", "middle")
// 			.style("font-size","16px")
// 			.text("Percent of Respondents"); 	


// 		// Adds legend
// 		var legend = svg.selectAll(".legend")
// 			.data(keys)
// 			.enter().append("g")
// 			.attr("class", "legend")
// 			.attr("transform", (d, i) => `translate(${margin.left},${i * 30})`);
	
// 		legend.append("text")
// 			.attr("x", width - 10)
// 			.attr("y", margin.top)
// 			.attr("text-anchor", "end")
// 			.attr("dy", "1em")
// 			.text(d => d);
	
// 		legend.append("rect")
// 			.attr("width", 19)
// 			.attr("height", 19)
// 			.attr("x", width)
// 			.attr("y", margin.top)
// 			.attr("fill", z)
// 			.attr("stroke", z)
// 			.attr("value", d => d)
// 		} // End of plotting function
	
// 	// Updates values for plotting based on category dropdown selection
// 	var select = d3.select("#category3")
// 		.on("change", function() {
// 			update(this.value, 750)
// 		})
// } // End of code for chart3

//---------------------------------------

// Draw Chart 4 -- Payday loans
function chart4(datum) {

	// Get data for gets 
	var keys = ["No","Yes"]; 

	// Get the names for the demographic categories
	var category   = [...new Set(datum.map(d => d.Category))]

	// Create dropdown for choosing demographic categories
	var options = d3.select("#category4").selectAll("option")
		.data(category)
		.enter().append("option")
		.text(d => d)

	// Create parameters for chart
	var svg = d3.select("#chart4"),
		margin = {top: 35, left: 55, bottom: 70, right: 50},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)

	var y = d3.scaleLinear()
		.rangeRound([height - margin.bottom, margin.top])

	var xAxis = svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")

	var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

	// Sets up colors
	var z = d3.scaleOrdinal()
		.range(["#4575b4", "#d73027"]) //Diverging-- blue to red, from colorbrewer2.org//
		.domain(keys);

	// Gets deomgraphic category to plot
	update(d3.select("#category4").property("value"), 0)

	// Creates the chart
	function update(input, speed) {

		// Gets the data filtered by the chosen category
		var data = datum.filter(f => f.Category == input)

		// Calcs total of values
		data.forEach(function(d) {
			d.total = d3.sum(keys, k => +d[k])
			return d
		})
		// Sets y domain based on total
		y.domain([0, d3.max(data, d => (d3.sum(keys, k => +d[k])-5))]).nice();

		svg.selectAll(".y-axis").transition().duration(speed)
			.call(d3.axisLeft(y).ticks(null, "s"))
			.selectAll("text")
			.style("font-size","14px")


		// Sets x domain based on deographic Groups in the chosen category
		x.domain(data.map(d => d.Group));

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.selectAll("text")	
				.style("text-anchor", "start")
				.style("font-size","14px")
				.attr("transform", "rotate(65)")
				.attr("dx", "1em")
				.attr("dy", "-.1em");
				

		// Uses stack() to re-order data so that it can be used to create stacked bar chart
		var group = svg.selectAll("g.layer")
			.data(d3.stack()
				.order(d3.stackOrderReverse)
				.keys(keys)(data), d => d.key)
				
		// Clears and then draws bars
		group.exit().remove()

		group.enter().append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		var bars = svg.selectAll("g.layer").selectAll("rect")
			.data(d => d, e => e.data.Group);

		bars.exit().remove()

		bars.enter().append("rect")
			.attr("width", x.bandwidth())
			.merge(bars)
		.transition().duration(speed)
			.attr("x", d => x(d.data.Group))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]))

		// Clears and then adds text to chart
		var text = svg.selectAll(".text")
			.data(data, d => d.Group);

		text.exit().remove()

		text.enter().append("text")
			.attr("class", "text")
			.attr("text-anchor", "middle")
			.merge(text)
		.transition().duration(speed)
			.attr("x", d => x(d.Group) + x.bandwidth() / 2)
			.attr("y", d => y(d.total) -5)
		
		// Creates y axis label
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", x(0) - 50 )
			.attr("x",0 - (height / 2)+ 20)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("font-size","16px")
			.text("Percent of Respondents"); 	


		// Adds legend
		var legend = svg.selectAll(".legend")
			.data(keys)
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", (d, i) => `translate(${margin.left},${i * 30})`);
	
		legend.append("text")
			.attr("x", width - 10)
			.attr("y", margin.top)
			.attr("text-anchor", "end")
			.attr("dy", "1em")
			.text(d => d);
	
		legend.append("rect")
			.attr("width", 19)
			.attr("height", 19)
			.attr("x", width)
			.attr("y", margin.top)
			.attr("fill", z)
			.attr("stroke", z)
			.attr("value", d => d)
		} // End of plotting function
	
	// Updates values for plotting based on category dropdown selection
	var select = d3.select("#category4")
		.on("change", function() {
			update(this.value, 750)
		})
} // End of code for chart4

//-----------------------------------------

// Draw Chart 5 -- Housing distress
function chart5(datum) {

	// Get data for plot 
	var keys = ["Never","Sometimes","Often"]

	// Get the names for the demographic categories
	var category   = [...new Set(datum.map(d => d.Category))]

	// Create dropdown for choosing demographic categories
	var options = d3.select("#category5").selectAll("option")
		.data(category)
		.enter().append("option")
		.text(d => d)

	// Create parameters for chart
	var svg = d3.select("#chart5"),
		margin = {top: 35, left: 55, bottom: 70, right: 70},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)

	var y = d3.scaleLinear()
		.rangeRound([height - margin.bottom, margin.top])

	var xAxis = svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")

	var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

	// Sets up colors
	var z = d3.scaleOrdinal()
		.range(["#4575b4","#f46d43", "#d73027"]) //Diverging-- blue to red, from colorbrewer2.org//
		.domain(keys);

	// Gets deomgraphic category to plot
	update(d3.select("#category5").property("value"), 0)

	// Creates the chart
	function update(input, speed) {

		// Gets the data filtered by the chosen category
		var data = datum.filter(f => f.Category == input)

		// Calcs total of values
		data.forEach(function(d) {
			d.total = d3.sum(keys, k => +d[k])
			return d
		})
		// Sets y domain based on total
		y.domain([0, d3.max(data, d => (d3.sum(keys, k => +d[k])-5))]).nice();

		svg.selectAll(".y-axis").transition().duration(speed)
			.call(d3.axisLeft(y).ticks(null, "s"))
			.selectAll("text")
			.style("font-size","14px")


		// Sets x domain based on deographic Groups in the chosen category
		x.domain(data.map(d => d.Group));

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.selectAll("text")	
				.style("text-anchor", "start")
				.style("font-size","14px")
				.attr("transform", "rotate(65)")
				.attr("dx", "1em")
				.attr("dy", "-.1em");
				

		// Uses stack() to re-order data so that it can be used to create stacked bar chart
		var group = svg.selectAll("g.layer")
			.data(d3.stack()
				.order(d3.stackOrderReverse)
				.keys(keys)(data), d => d.key)
				
		// Clears and then draws bars
		group.exit().remove()

		group.enter().append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		var bars = svg.selectAll("g.layer").selectAll("rect")
			.data(d => d, e => e.data.Group);

		bars.exit().remove()

		bars.enter().append("rect")
			.attr("width", x.bandwidth())
			.merge(bars)
		.transition().duration(speed)
			.attr("x", d => x(d.data.Group))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]))

		// Clears and then adds text to chart
		var text = svg.selectAll(".text")
			.data(data, d => d.Group);

		text.exit().remove()

		text.enter().append("text")
			.attr("class", "text")
			.attr("text-anchor", "middle")
			.merge(text)
		.transition().duration(speed)
			.attr("x", d => x(d.Group) + x.bandwidth() / 2)
			.attr("y", d => y(d.total) -5)
		
		// Creates y axis label
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", x(0) - 50 )
			.attr("x",0 - (height / 2)+ 20)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("font-size","16px")
			.text("Percent of Respondents"); 	

		// Adds legend
		var legend = svg.selectAll(".legend")
			.data(keys)
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", (d, i) => `translate(${margin.left},${i * 30})`);
	
		legend.append("text")
			.attr("x", width - 10)
			.attr("y", margin.top)
			.attr("text-anchor", "end")
			.attr("dy", "1em")
			.text(d => d);
	
		legend.append("rect")
			.attr("width", 19)
			.attr("height", 19)
			.attr("x", width)
			.attr("y", margin.top)
			.attr("fill", z)
			.attr("stroke", z)
			.attr("value", d => d)
		} // End of plotting function
	
	// Updates values for plotting based on category dropdown selection
	var select = d3.select("#category5")
		.on("change", function() {
			update(this.value, 750)
		})
} // End of code for chart5



