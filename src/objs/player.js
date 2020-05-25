import HandObj from './hand';
import ContainerObj from './container';
import PoolObj from './pool';

export default class PlayerObj {
  constructor({
    name,
    pool = [],
    hand = [],
    a = [],
    b = [],
    c = [],
    d = [],
  } = player) {
    this.name = name;
    this.pool = new PoolObj(pool);
    this.hand = new HandObj(hand);
    this.a = new ContainerObj(a);
    this.b = new ContainerObj(b);
    this.c = new ContainerObj(c);
    this.d = new ContainerObj(d);
  }

  Init(deck) {
    console.log(`Player(${this.name}) recieved starting cards(${deck.length})`);
    this.hand.Clear();
    this.a.Clear();
    this.b.Clear();
    this.c.Clear();
    this.d.Clear();
    this.pool.Clear();
    this.pool.MultiAdd(deck);
  }

  Draw(deck) {
    const needed = 5 - this.hand.length;
    this.hand.MultiAdd(deck.Deal(needed));
  }

  //
  Save() {
    return {
      name: this.name,
      hand: this.hand.Save(),
      pool: this.pool.Save(),
      a: this.a.Save(),
      b: this.b.Save(),
      c: this.c.Save(),
      d: this.d.Save(),
    };
  }

  Load(json) {
    if (json.name == this.name) {
      if (json.hand != undefined) {
        this.hand.Load(json.hand);
      }
      if (json.pool != undefined) {
        this.pool.Load(json.pool);
      }
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
      return true;
    }
    return false;
  }

  FindLoad(json) {
    return json.Some(j => this.Load(j));
  }
}
