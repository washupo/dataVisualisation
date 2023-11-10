import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";


const bodyContent = document.getElementById('bodyContent')

const container = document.createElement('div');
container.style.marginBottom = "30px"

const title = document.createElement('h2');
title.textContent = "Crimes per second (In real time)"

bodyContent.parentNode.insertBefore(title, bodyContent)
bodyContent.parentNode.insertBefore(container, bodyContent)

let data = []

function formatTime(time) {
  let hours = time.getHours()
  let minutes = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes()
  let seconds = (time.getSeconds() < 10) ? '0' + time.getSeconds() : time.getSeconds()
  return hours + ':' + minutes + ':' + seconds
}

function renderGraph(data) {
  const graph = Plot.plot({
    width: 800,
    height: 300,
    marginBottom: 75,
    x: {type: "point", tickRotate: 75},
    marks: [
      Plot.ruleY([0]),
      Plot.areaY(data, {x: "Time", y: "Crimes", fill: "steelblue", fillOpacity: 0.1}),
      Plot.lineY(data, {x: "Time", y: "Crimes", tip: "x", stroke: "steelblue"})
    ]
  })

  container.innerHTML=''
  container.appendChild(graph)
}

function getData(x, length) {
  fetch(`https://canvasjs.com/services/data/datapoints.php?xtart=${x}&ystart=${x}&length=${length}`, {method: 'GET'})
    .then(response => response.json())
    .then(result => {

      result.forEach((el, index) => {
        let dataPoint = {}
        dataPoint.Time = formatTime(new Date(Date.now() - ((result.length - index)*1000)))
        dataPoint.Crimes = Math.abs(el[1])
        data.push(dataPoint)
      });

      data = data.slice(-60)

      renderGraph(data)
      
      setTimeout(() => getData(x+1, 1), 1000);
    })
}

getData(1, 60)