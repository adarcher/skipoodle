export default class CardObj {
  constructor({ face, container } = card) {
    this.face = face;
    this.container = container;
  }

  Move(container) {
    if (container != this.container) {
      const previous_container = this.container;
      if (container.Add(this)) {
        if (previous_container) previous_container.Remove(this);
      }
    } else {
      console.log('Cannot move from same container');
    }
  }
}
