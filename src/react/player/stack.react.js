import React from 'react';
import Deck from '../general/deck.react';
import Card from '../general/card.react';
import { observer } from 'mobx-react-lite';

const Stack = props => {
  const cards = props.cards;

  return (
    <Deck deck={cards}>
      <Card board={props.board} card={cards.cards[0]} />
    </Deck>
  );
};

export default observer(Stack);
