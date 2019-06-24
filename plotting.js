import Draggable from "./draggable.js";
import ScatterPlot from "./scatterplot.js";
import BarPlot from "./barplot.js";
import DimensionSelector from "./dimensionselector.js"

function init() {

  let dataDimensions = 4;
  let minValues = [-1, -1, 0, 0];
  let maxValues = [1, 1, 12, 12*12];
  //let minValues = [0, 0, 0, 0];
  //let maxValues = [1, 1, 1, 1];

  let barPlot = new BarPlot("barplot", dataDimensions, minValues, maxValues);

  let plot = new ScatterPlot("scatterplot", dataDimensions, 0, 1, minValues, maxValues, 5, (data) => {barPlot.setData(data)});
  let data = addQuadraticDimention(generateRandomHelixData(64), 2);
  //let data = generateRandomData(64, 4);

  data.forEach((dataPoint) => {plot.addDataPoint(dataPoint)});

  let xDimSelector = new DimensionSelector("xDimSelector", dataDimensions, (dim) => {plot.setAxisDimensions(dim, null)});
  let yDimSelector = new DimensionSelector("yDimSelector", dataDimensions, (dim) => {plot.setAxisDimensions(null, dim)}, 1);

  //let draggable = new Draggable("dragwrapper", (x, y) => {plot.rotate(x, y)});
}

function generateRandomData(num, dimensions) {
  let data = [];
  for (let i = 0; i < num; i++) {
    let dataPoint = [];
    for (let j = 0; j < dimensions; j++) {
      dataPoint.push(Math.random());
    }
    data.push(dataPoint);
  }

  return data;
}

function generateRandomHelixData(num) {
  let data = [];
  for (let i = 0; i < num; i++) {
    let dataPoint = [];
    let t = Math.random()*12;
    dataPoint.push(Math.cos(t));
    dataPoint.push(Math.sin(t));
    dataPoint.push(t);
    data.push(dataPoint);
  }
  return data;
}

function addQuadraticDimention(data, depDim) {
  data.forEach((dataPoint) => {dataPoint.push(Math.pow(dataPoint[depDim], 2))});
  return data;
}

window.onload = init;