import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const table2 = document.getElementById('table2');

// Insert a <div> above the table and assign an ID
var newDiv = document.createElement("div");
table2.parentNode.insertBefore(newDiv, table2);
newDiv.id = "graph2";


let data = [];
let yearsProprety; 

yearsProprety = Array.from(table2.rows[0].cells).map(cell => cell.textContent);

document.querySelectorAll('#table2 tbody tr').forEach((col) => {
    let countryProprety
    col.querySelectorAll('td').forEach((row, j) => {
      if (j==0) {
        countryProprety = row.textContent
        if(countryProprety.indexOf("(") > 0)
          countryProprety = countryProprety.slice(0, countryProprety.indexOf("("))
      } else {
        let dataPoint = {}
        dataPoint.country = countryProprety
        dataPoint.year = yearsProprety[j+1]
        dataPoint.prisonners = parseInt(row.textContent)
        data.push(dataPoint)
      }
    })
})

console.log(data)
console.table(data)

// Declare the chart dimensions and margins.
const width = 928;
const height = 600;
const marginTop = 10;
const marginRight = 10;
const marginBottom = 100;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x0 = d3.scaleBand()
    .domain(new Set(data.map(d => d.country)))
    .range([marginLeft, width - marginRight])
    .paddingInner(0.3);

//const années = new Set (data.map(d => d.year));

const x1 = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, x0.bandwidth()])
    .paddingInner(0.1);

// Declare a color scale for different years.
const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.year))
    .range(d3.schemeCategory10);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.prisonners)])
    .range([height - marginBottom, marginTop]);

// A function to format the value in the tooltip.
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

// Create the SVG container.
const svg = d3.select("#graph2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Create the groups for each country.
const countryGroups = svg.selectAll(".countryGroup")
    .data(data)
    .enter().append("g")
    .attr("class", "countryGroup")
    .attr("transform", d => `translate(${x0(d.country)}, 0)`);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x0))
    .selectAll("text") // Sélectionnez tous les éléments texte de l'axe des
    .style("text-anchor", "start") // Ancrage du texte à la fin
    .attr("dx", "1em") // Ajustement horizontal
    .attr("dy", ".5em") // Ajustement vertical
    .attr("transform", "rotate(45)"); // Rotation de l'étiquette




// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));



// Add the bars for each year inside each country group.
countryGroups.selectAll("rect")
    .data(d => [d]) // Wrap the data in an array for d3.join
    .enter().append("rect")
    .attr("x", d => x1(d.year))
    .attr("y", d => y(d.prisonners))
    .attr("width", x1.bandwidth())
    .attr("height", d => height - marginBottom - y(d.prisonners))
    .attr("fill", d => colorScale(d.year)); // Set the fill color based on the year.