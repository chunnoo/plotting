class ScatterPlot {
  constructor(svgElement, dimensions, xDim, yDim, minValues, maxValues, radius=5, hoverCallback=null) {
    this.svgElement = svgElement;
    this.dimensions = dimensions;
    this.xDim = xDim;
    this.yDim = yDim;
    this.minValues = minValues;
    this.maxValues = maxValues;
    this.radius = radius;
    this.hoverCallback = hoverCallback;

    this.data = [];
    this.points = [];

    this.pointClick = (e) => {console.log(this.data[e.target.id])};
    this.pointMouseover = (e) => {e.target.setAttributeNS(null, "fill", "#ec655a")};
    if (hoverCallback !== null) {
     this.pointMouseover = (e) => {
       e.target.setAttributeNS(null, "fill", "#ec655a");
       this.hoverCallback(this.data[e.target.id]);
     };
    }
    this.pointMouseout = (e) => {e.target.setAttributeNS(null, "fill", "#2855bf")};
  }

  getX(i) {
    return this.data[i][this.xDim];
  }

  getY(i) {
    return this.data[i][this.yDim];
  }

  addDataPoint(data) {
    let svgns = "http://www.w3.org/2000/svg";
    let plot = document.getElementById(this.svgElement);

    let circle = document.createElementNS(svgns, "circle");
    circle.setAttributeNS(null, "id", this.data.length);
    circle.setAttributeNS(null, "cx", this.stretchToPosition(data[this.xDim], this.xDim));
    circle.setAttributeNS(null, "cy", this.stretchToPosition(data[this.yDim], this.yDim));
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "fill", "#2855bf");
    circle.setAttributeNS(null, "class", "scatterplotPoint");
    circle.addEventListener("click", this.pointClick);
    circle.addEventListener("mouseover", this.pointMouseover);
    circle.addEventListener("mouseout", this.pointMouseout);

    plot.appendChild(circle);

    this.data.push(data);
    this.points.push(circle);
  }

  setAxisDimensions(xDim, yDim) {
    if (xDim !== null) {
      this.xDim = xDim;
    }
    if (yDim !== null) {
      this.yDim = yDim;
    }

    this.points.forEach((circle) => {
      setTimeout(() => {
        circle.setAttribute("cx", this.stretchToPosition(this.data[circle.id][this.xDim], this.xDim));
        circle.setAttribute("cy", this.stretchToPosition(this.data[circle.id][this.yDim], this.yDim));
      }, 0);
    });
  }

  rotate(x, y) {
    document.getElementById(this.svgElement).style.transform += `rotateX(${y}deg)`;
    document.getElementById(this.svgElement).style.transform += `rotateY(${x}deg)`;
  }

  stretchToPosition(value, dim) {
    return ((value - this.minValues[dim])/(this.maxValues[dim] - this.minValues[dim]))*100 + "%";
  }
}

export default ScatterPlot;