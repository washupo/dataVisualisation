import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const table1 = document.getElementById('table1');


let data = [];
let years; 

years = Array.from(table1.rows[1].cells).map(cell => cell.textContent);

document.querySelectorAll('#table1 tbody tr').forEach((col) => {
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
        dataPoint.Crimes = parseInt(row.textContent)
        data.push(dataPoint)
      }
    })
})

console.table(data)

const graph = Plot.plot({
    width: 800,
    x: {type: "point", label: "Year →" },
    y: {label: "↑ Offences recorded (in thousands)"},
    marks: [
      Plot.ruleY([0]),
      Plot.lineY(data, {x: "Year", y: "Crimes", stroke: "Country", marker: true, tip: "x"})
    ]
  })

  table1.parentNode.insertBefore(graph, table1);