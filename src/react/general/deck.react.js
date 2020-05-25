import React, { useMemo } from 'react';
import Card from './card.react';
import { observer } from 'mobx-react-lite';

const Deck = props => {
  const deck = props.deck;
  const count = deck.cards.length;
  console.log(`Deck Count: ${count}`);
  const style = useMemo(() => ({
    borderBottomWidth: `${Math.min(count / 2, 20)}px`,
  }));
  return (
    <div className='deck' style={style}>
      <Card />
      {props.children}
    </div>
  );
};

export default observer(Deck);
