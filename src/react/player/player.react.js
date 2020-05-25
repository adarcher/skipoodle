import React from 'react';
import Stack from './stack.react';
import Hand from './hand.react';
import Tableau from '../general/tableau.react';
import { observer } from 'mobx-react-lite';

const Player = props => {
  const player = props.player;
  const name = player.name;
  const pool = player.pool;
  const tab_a = player.a;
  const tab_b = player.b;
  const tab_c = player.c;
  const tab_d = player.d;
  const owned = props.owned;

  const name_a = owned ? 'a' : '';
  const name_b = owned ? 'b' : '';
  const name_c = owned ? 'c' : '';
  const name_d = owned ? 'd' : '';

  return (
    <div className='player'>
      <div>
        <div className='player-name'>{name}</div>
        <div className='tableaus'>
          <Tableau board={props.board} name={name_a} cards={tab_a} />
          <Tableau board={props.board} name={name_b} cards={tab_b} />
          <Tableau board={props.board} name={name_c} cards={tab_c} />
          <Tableau board={props.board} name={name_d} cards={tab_d} />
          <Stack board={props.board} cards={pool} />
        </div>
      </div>
      {owned ? <Hand board={props.board} player={player} /> : <></>}
    </div>
  );
};

export default observer(Player);
