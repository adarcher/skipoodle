import ContainerObj from './container';

export default class StackObj extends ContainerObj {
  constructor(cards, ordered = false) {
    super(cards);
    this.ordered = ordered;
  }

  Add(card) {
    const current = this.cards.length;
    if (card.face === 'w' || card.face == current + 1) {
      return super.Add(card);
    } else {
      console.log(`Cannot place ${card.face} ontop of ${current}`);
      return false;
    }
  }

  MultiAdd(cards) {
    console.log('Trying to add multiple cards at once while not allowed');
  }

  Remove(card) {
    console.log('Trying to remove a card while not allowed');
  }

  MultiRemove(cards) {
    console.log('Trying to remove multiple cards at once while not allowed');
  }

  Reset(container) {
    container.MultiAdd(this.cards);
    this.cards = [];
  }
}
