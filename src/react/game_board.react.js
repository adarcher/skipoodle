import React from 'react';
import Tableau from './general/tableau.react';
import Deck from './general/deck.react';
import { observer } from 'mobx-react-lite';

const StackResetActions = props => {
  const tab = props.tab;
  const Reset = props.Reset;

  return (
    <div className='card-actions'>
      <div>
        <div>
          <div>Reset</div>
          <div>
            <button onClick={Reset} value={tab.name}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameBoard = props => {
  const board = props.board;
  const tab_a = board.a;
  const tab_b = board.b;
  const tab_c = board.c;
  const tab_d = board.d;
  const deck = board.deck;
  const discard = board.discard;

  const player = props.player;

  const Draw = () => {
    if (player) {
      player.Draw(deck);
    }
  };

  const ShuffleIn = () => {
    discard.Shuffle();
    deck.AddDeck(discard);
  };

  const Reset = e => {
    board[e.target.value].Reset(board.discard);
  };

  const ResetButton = tab => {
    console.log(`Tab(${tab}).length = ${tab.length}`);
    if (tab.length == 12) {
      return <StackResetActions tab={tab} Reset={Reset} />;
    } else {
      return <></>;
    }
  };

  const deck_style = {
    fontSize: '1.5vw',
  };

  const BoardDeck = () => {
    if (deck.length > 0) {
      return (
        <Deck deck={deck}>
          <button className='draw-button' onClick={Draw}>
            Draw
          </button>
        </Deck>
      );
    } else {
      return <Tableau name='Deck' cards={deck} style={deck_style} />;
    }
  };
  const DiscardDeck = () => {
    if (discard.length > 0) {
      return (
        <Deck deck={discard}>
          <button className='draw-button' onClick={ShuffleIn}>
            Shuffle In
          </button>
        </Deck>
      );
    } else {
      return <Tableau name='Discard' cards={discard} style={deck_style} />;
    }
  };

  return (
    <div className='tableaus gameboard'>
      <Tableau name='a' cards={tab_a}>
        {ResetButton(tab_a)}
      </Tableau>
      <Tableau name='b' cards={tab_b}>
        {ResetButton(tab_b)}
      </Tableau>
      <Tableau name='c' cards={tab_c}>
        {ResetButton(tab_c)}
      </Tableau>
      <Tableau name='d' cards={tab_d}>
        {ResetButton(tab_d)}
      </Tableau>
      {BoardDeck()}
      {DiscardDeck()}
    </div>
  );
};

export default observer(GameBoard);
