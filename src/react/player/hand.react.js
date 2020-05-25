import React, { useMemo } from 'react';
import Card from '../general/card.react';
import { observer } from 'mobx-react-lite';

const Hand = props => {
  const player = props.player;
  const hand = player.hand;
  const cards = useMemo(() => hand.cards);

  return (
    <div className='hand'>
      {cards.map((c, i) => (
        <Card player={player} board={props.board} key={i} card={c} />
      ))}
    </div>
  );
};

export default observer(Hand);
