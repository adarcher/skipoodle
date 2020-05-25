export default class CardObj {
  constructor({ face, container } = card) {
    this.face = face;
    this.container = container;
  }

  Move(container) {
    const previous_container = this.container;
    if (container.Add(this)) {
      if (previous_container) previous_container.Remove(this);
    }
  }
}
