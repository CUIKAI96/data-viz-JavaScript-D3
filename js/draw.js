var data = []; // the variable that holds the data from csv file
var category_colors = {
    "clothing, beauty, & fashion": "#5B7BE9",
    "computers & internet": "#E0D22E",
    "education": "#2CCEF6",
    "food & drink": "#FB7F23",
    "grab bag": "#D63CA3",
    "health & fitness": "#c38014",
    "home & garden": "#E24062",
    "human relations": "#5BB923",
    "law & government": "#555",
    "media & arts": "#B190D0",
    "pets & animals": "#bcc832",
    "religion & philosophy": "#ee7b9c",
    "science & nature": "#f299b3",
    "shopping": "#01d99f",
    "society & culture": "#177d62",
    "sports, hobbies, & recreation": "#a16c2f",
    "technology": "#a2262a",
    "travel & transportation": "#f29a76",
    "work & money": "#88a8b9",
    "writing & language": "#a46067"
}; // JSON object with colors assigned to each category.

$(document).ready(function () {
    loadData();
});


function loadData() {
    //code for Q1 goes here
    d3.csv("data/data.csv", (d) => {
        data = d
        data.forEach((item) => {
            item.n = parseInt(item.n)
        })
        visualizeBarChart(groupDataByYear());
        visualizeSmallMultipleBarChart(groupDataByCategory());
        visualizeOneCategoryChart(groupDataByCategory()[0]);
    })
}

function groupDataByCategory() {
	//code for Q2 goes here
    var groupedData = d3.nest()
        .key((d) => d.category)
        .entries(data);
    return groupedData;
}

function groupDataByYear() {
    //code for Q3.1 goes here
    var groupedData = d3.nest()
        .key((d) => d.year)
        .rollup((v) => d3.sum(v, (d) => d.n))
        .entries(data);
    return groupedData;
}

function groupDataByYearMean() {
    //code for Q3.2 goes here
    var groupedData = d3.nest()
        .key((d) => d.year)
        .rollup((v) => d3.mean(v, (d) => d.n))
        .entries(data);
    return groupedData;
}


function visualizeBarChart(dataitems) {
    // code for Q4 goes here
// set teh dimensions and margins of the graph
    var margin = { top:20, right:20, bottom:30, left:60}
    var width = 940 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(dataitems.map((d) => d.key))
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(dataitems, (d) => d.value)])
        .range([height, 0]);

    var svg = d3.select("#chart1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".bar")
        .data(dataitems)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "#e0d22e")
        .attr("x", (d) => x(d.key))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => height - y(d.value));
    // code for Q5 goes here

    // code for Q6 goes here

    // code for Q7 goes here

    // code for Q8 goes here

    // code for Q9 goes here

    // add the x axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
}

function visualizeSmallMultipleBarChart(dataitems) {

	// code for Q13 goes here

	// code for Q14.1 goes here

	// code for Q14.2 goes here

	// code for Q15 goes here
	
	   // code for Q16 goes here
	   
	   // code for Q17 goes here

	   // code for Q18 goes here

	   // code for Q19 goes here

	   // code for Q20 goes here

	   // code for Q21 goes here
    var margin = { top:0, right:10, bottom:40, left:40}
    var width = 280 - margin.left - margin.right;
    var height = 150 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(dataitems[0].values.map((d) => d.year))
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.n)])
        .range([height, 0]);

    dataitems.forEach((v,i) => {
        var div = d3.select("#chart2").append("div")
            .attr("id", "holder" + v.key)
            .attr("class", "chartholder");

        div.append("h6").html(v.key);

        var svg = div.append("svg")
            .attr("class", "categoryBar")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("+margin.left + "," + margin.top +")");

        svg.selectAll(".bar")
            .data(v.values)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", (d) => category_colors[v.key])
            .attr("x", (d) => x(d.year))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y(d.n))
            .attr("height", (d) => height - y(d.n));

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        svg.append("g")
            .attr("transform", "translate(0, "+ height +")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

    });
}


// CODE FOR SECTION 2 GOES HERE
// see instructions

// set the dimensions and margins of the graph
var c_margin = { top: 20, right: 20, bottom: 30, left: 60 }
var c_width = 940 - c_margin.left - c_margin.right;
var c_height = 500 - c_margin.top - c_margin.bottom;

function visualizeOneCategoryChart(dataitems) {	
	// create and draw chart (DONT CHANGE)
	createOneCategoryChart(dataitems)
	drawOneCategoryChart(dataitems)
}

function createOneCategoryChart(dataitems) {	
    // append an svg and g element to the #chart3 element
    var svg = d3.select("#chart3").append("svg")
        .attr("width", c_width + c_margin.left + c_margin.right)
        .attr("height", c_height + c_margin.top + c_margin.bottom)
        .append("g")
        .attr("transform", "translate(" + c_margin.left + "," + c_margin.top + ")");

}



function drawOneCategoryChart(dataitems) {
    tExit = d3.transition()
        .duration(2000)
	// select the already-created svg group element (DONT CHANGE)
	var svg = d3.select("#chart3 > svg > g")

	// set the title of the chart (the h6 element in the #chart3 element)
	// to the name of this category
    var h6 = d3.select("#chart3 > h6");
    h6.html(dataitems.key);
	
    // create an x axis scale
    var x = d3.scaleBand()
        .domain(dataitems.values.map((d) => d.year))
        .range([0, c_width])
        .padding(0.1);

    // create a y axis scale
    var y = d3.scaleLinear()
        .domain([0,d3.max(data, (d) => d.n)])
        .range([c_height, 0]);

	// create / update the bars
    bars = svg.selectAll(".bar")
        .data(dataitems.values)

        //exit, elements to be removed
    exit = bars.exit()
    if (exit.size() > 0) {
        tUpdate = tExit.transition(t)
        exit.transition(tExit)
            .attr("fill", (d) => category_colors[dataitems.key])
            .attr("height", 0)
            .attr("y", height)
            .remove()
    }
    else {
        tUpdate = tExit
    }

        // update elements to be updated
    update = bars
    if (update.size() > 0) {
        tEnter = tUpdate.transition()
        update.transition(tUpdate)
            .attr("fill", (d) => category_colors[dataitems.key])
            .attr("x", (d) => x(d.year))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y(d.n))
            .attr("height", (d) => c_height - y(d.n))
    }
    else {
        tEnter = tUpdate
    }

        //enter elements to be created
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => c_height)
        .attr("height", (d) => 0)
        .attr("x", (d) => x(d.year))
        .attr("width", x.bandwidth())
        .transition(tEnter)
        .attr("fill", (d) => category_colors[dataitems.key])
        .attr("y", (d) => y(d.n))
        .attr("height", (d) => c_height - y(d.n))

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + c_height + ")")
        .call(d3.axisBottom(x));
    // add the y Axis

    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));
}


