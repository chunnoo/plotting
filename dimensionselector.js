class DimensionSelector {
  constructor(div, dimensions, selectCallback, selected = 0) {
    this.dimensions = dimensions;
    this.selectCallback = selectCallback;
    this.selected = selected;
    this.div = div;
    this.buttons = [];

    this.newSelection = (e) => {
      this.selected = e.target.value;
      this.buttons.forEach((button) => {
        button.disabled = false;
      });
      e.target.disabled = true;
      this.selectCallback(this.selected);
    };

    let divElement = document.getElementById(div);
    for (let i = 0; i < this.dimensions; i++) {
      let button = document.createElement("button");
      button.value = i;
      button.innerHTML = i;
      button.className = "dimensionselectorButton";
      if (this.selected == i) {
        button.disabled = true;
      }
      button.onclick = this.newSelection;

      divElement.appendChild(button);
      this.buttons.push(button);
    }
  }
}

export default DimensionSelector;