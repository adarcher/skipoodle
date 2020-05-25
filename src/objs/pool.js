import ContainerObj from './container';

export default class PoolObj extends ContainerObj {
  constructor(cards, ordered = false) {
    super(cards);
    this.ordered = ordered;
  }
}
