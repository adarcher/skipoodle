import CardObj from './card';
import ContainerObj from './container';

export default class DeckObj extends ContainerObj {
  constructor(deck = []) {
    super();
    this.cards = deck.map(c => new CardObj({ face: c, container: this }));
  }

  Deal(count) {
    const top = this.cards.slice(this.cards.length - count);
    const remaining = this.cards.slice(0, this.cards.length - count - 1);
    this.cards = remaining;
    console.log(
      `Dealing(${count}):`,
      top.map(c => c.face)
    );
    top.forEach(c => (c.container = false));
    return top;
  }
}
