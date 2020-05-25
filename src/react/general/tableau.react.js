import React from 'react';
import Card from './card.react';
import { observer } from 'mobx-react-lite';

const Tableau = props => {
  const cards = props.cards;
  const board = props.board;

  const start = Math.max(0, cards.length - 5);
  const visible_cards = cards.cards.slice(start);

  const name = props.name || '';

  const Cascade = deck => {
    if (deck.length > 0) {
      return (
        <Card board={deck.length == 1 ? board : false} card={deck[0]}>
          {Cascade(deck.slice(1))}
        </Card>
      );
    } else {
      return <>{props.children}</>;
    }
  };
  return (
    <div className='tableau-container'>
      <div className='tableau-name'>{`${name} (${cards.length})`}</div>
      <div className='tableau'>{Cascade(visible_cards)}</div>
    </div>
  );
};

export default observer(Tableau);
