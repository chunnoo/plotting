class Draggable {
  constructor(element, dragCallback) {
    this.element = element;
    this.dragCallback = dragCallback;

    this.dragged = false;

    this.startDrag = (e) => {this.dragged = true};
    this.endDrag = (e) => {this.dragged = false};
    this.drag = (e) => {
      if (this.dragged) {
        this.dragCallback(e.movementX, e.movementY);
      }
    };

    let domElement = document.getElementById(this.element);
    domElement.addEventListener("mousedown", this.startDrag);
    domElement.addEventListener("mouseup", this.endDrag);
    domElement.addEventListener("mouseleave", this.endDrag);
    domElement.addEventListener("mousemove", this.drag);
  }
}

export default Draggable;