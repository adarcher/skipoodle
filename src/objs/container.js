import CardObj from './card';
import { observable } from 'mobx';

export default class ContainerObj {
  @observable cards = [];

  constructor(cards = []) {
    this.cards = cards;
  }

  get length() {
    return this.cards.length;
  }

  Add(card) {
    this.cards.push(card);
    card.container = this;
    return true;
  }

  MultiAdd(cards) {
    cards.forEach(c => this.Add(c));
  }

  Remove(card) {
    const index = this.cards.findIndex(c => c === card);
    if (index >= 0) {
      this.cards.splice(index, 1);
      if (card.container == this) card.container = false;
    }
  }

  MultiRemove(cards) {
    cards.forEach(c => this.Remove(c));
  }

  Clear() {
    this.cards = [];
  }

  //
  Save() {
    return this.cards.map(c => c.face);
  }

  Load(json) {
    this.cards = json.map(j => new CardObj({ face: j, container: this }));
  }
}
