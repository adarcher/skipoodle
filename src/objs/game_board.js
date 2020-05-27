import ContainerObj from './container';
import DeckObj from './deck';
import StackObj from './stack';
import CardObj from './card';

export default class GameBoardObj {
  constructor() {
    this.a = new StackObj();
    this.b = new StackObj();
    this.c = new StackObj();
    this.d = new StackObj();
    this.deck = new DeckObj();
    this.discard = new DeckObj();
    this.a.name = 'a';
    this.b.name = 'b';
    this.c.name = 'c';
    this.d.name = 'd';
  }

  Init() {
    this.discard.Clear();
    this.deck.Clear();
    this.a.Clear();
    this.b.Clear();
    this.c.Clear();
    this.d.Clear();

    this.deck.MultiAdd(this.CreateDeck().map(c => new CardObj({ face: c })));
    this.deck.Shuffle();
  }

  CreateDeck() {
    const partial = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const wilds = new Array(18).fill('w');
    const all = [
      partial,
      partial,
      partial,
      partial,
      partial,
      partial,
      partial,
      partial,
      partial,
      partial,
      partial,
      partial,
      wilds,
    ].flat();

    return all;
  }

  //
  Save() {
    return {
      a: this.a.Save(),
      b: this.b.Save(),
      c: this.c.Save(),
      d: this.d.Save(),
      deck: this.deck.Save(),
      discard: this.discard.Save(),
    };
  }

  Load(json) {
    if (json.a != undefined) {
      this.a.Load(json.a);
    }
    if (json.b != undefined) {
      this.b.Load(json.b);
    }
    if (json.c != undefined) {
      this.c.Load(json.c);
    }
    if (json.d != undefined) {
      this.d.Load(json.d);
    }
    if (json.deck != undefined) {
      this.deck.Load(json.deck);
    }
    if (json.discard != undefined) {
      this.discard.Load(json.discard);
    }
  }
}
