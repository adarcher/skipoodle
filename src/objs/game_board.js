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
  }

  Init() {
    this.deck.MultiAdd(this.CreateDeck().map(c => new CardObj({ face: c })));
    this.a.Clear();
    this.a.name = 'a';
    this.b.Clear();
    this.b.name = 'b';
    this.c.Clear();
    this.c.name = 'c';
    this.d.Clear();
    this.d.name = 'd';
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

    const count = all.length;

    all.forEach((c, i) => {
      const r = Math.floor(Math.random() * count);
      const temp = all[i];
      all[r] = c;
      all[i] = temp;
    });

    console.log(all);

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
  }
}
