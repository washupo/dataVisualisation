import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const table2 = document.getElementById('table2');


let data = [];
let years; 

years = Array.from(table2.rows[0].cells).map(cell => cell.textContent);

document.querySelectorAll('#table2 tbody tr').forEach((col) => {
    let country
    col.querySelectorAll('td').forEach((row, j) => {
      if (j==0) {
        country = row.textContent
        if(country.indexOf("(") > 0)
          country = country.slice(0, country.indexOf("("))
      } else {
        let dataPoint = {}
        dataPoint.Country = country
        dataPoint.Year = years[j+1]
        dataPoint.Prisonners = parseInt(row.textContent)
        data.push(dataPoint)
      }
    })
})

console.table(data)

const graph2 = Plot.plot({
    width: 900,
    color: {scheme: "tableau10", legend: true },
    facet: { data: data, x: "Country"},
    y: { grid: true, label: "↑ Prison population" },
    x: { axis:null, domain: years,  paddingOuter: 0.2},
    marks: [
        Plot.ruleX(data, {
            x: "Year",
            y: "Prisonners",
            stroke: "Year",
            strokeWidth: 3,
        }),
       
        Plot.dot(data, {
            x: "Year",
            y: "Prisonners",
            fill: "Year",
            r: 5,
            sort: { fx: "y", reduce: "sum", reverse: true }
          }),
          Plot.ruleY([0])
    ]
      });

        table2.parentNode.insertBefore(graph2, table2);