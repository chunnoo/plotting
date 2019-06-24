class BarPlot {
  constructor(svgElement, dimensions, minValues, maxValues, barRadius="5px") {
    this.svgElement = svgElement;
    this.dimensions = dimensions;
    this.minValues = minValues;
    this.maxValues = maxValues;
    this.barRadius = barRadius;

    this.bars = [];

    let svgns = "http://www.w3.org/2000/svg";
    let plot = document.getElementById(this.svgElement);

    for (let i = 0; i < this.dimensions; i++) {
      let bar = document.createElementNS(svgns, "rect");
      bar.setAttributeNS(null, "id", "bar" + i);
      bar.setAttributeNS(null, "x", (5 + 3*i*90/(this.dimensions*3 - 1)) + "%");
      bar.setAttributeNS(null, "y", "100%");
      bar.setAttributeNS(null, "width", 2*90/(this.dimensions*3 - 1) + "%");
      bar.setAttributeNS(null, "height", "0%");
      bar.setAttributeNS(null, "rx", this.barRadius);
      bar.setAttributeNS(null, "ry", this.barRadius);
      bar.setAttributeNS(null, "fill", "#2855bf");

      plot.appendChild(bar);
      this.bars.push(bar);
    }
  }

  setData(data) {
    for (let i = 0; i < this.dimensions; i++) {
      setTimeout(() => {
        this.bars[i].setAttribute("y", (100 - ((data[i] - this.minValues[i])/(this.maxValues[i] - this.minValues[i]))*100) + "%");
        this.bars[i].setAttribute("height",((data[i] - this.minValues[i])/(this.maxValues[i] - this.minValues[i]))*100 + "%");
      });
    }
  }
}

export default BarPlot;