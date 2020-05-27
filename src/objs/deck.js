import CardObj from './card';
import ContainerObj from './container';

export default class DeckObj extends ContainerObj {
  constructor(deck = []) {
    super();
    this.cards = deck.map(c => new CardObj({ face: c, container: this }));
  }

  Deal(count) {
    const top = this.cards.slice(this.cards.length - count);
    const remaining = this.cards.slice(0, this.cards.length - count);
    this.cards = remaining;
    console.log(
      `Dealing(${count}):`,
      top.map(c => c.face)
    );
    top.forEach(c => (c.container = false));
    return top;
  }

  Shuffle() {
    const count = this.cards.length;
    this.cards.forEach((c, i) => {
      const r = Math.floor(Math.random() * count);
      const temp = this.cards[r].face;
      this.cards[r].face = c.face;
      c.face = temp;
    });
  }

  AddDeck(deck, ontop = false) {
    deck.cards.forEach(c => (c.container = this));
    if (ontop) {
      this.cards = [...this.cards, ...deck.cards];
    } else {
      this.cards = [...deck.cards, ...this.cards];
    }

    deck.cards = [];
  }
}
