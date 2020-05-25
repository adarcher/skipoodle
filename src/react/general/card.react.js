import React from 'react';
import { observer } from 'mobx-react-lite';

const CardActions = props => {
  const player = props.player;
  const card = props.card;
  const board = props.board;

  const Discard = e => {
    card.Move(player[e.target.value]);
  };

  const Play = e => {
    card.Move(board[e.target.value]);
  };
  return (
    <div className='card-actions'>
      <div>
        <div>
          <div>Play</div>
          <div>
            <button onClick={Play} value='a'>
              a
            </button>
            <button onClick={Play} value='b'>
              b
            </button>
            <button onClick={Play} value='c'>
              c
            </button>
            <button onClick={Play} value='d'>
              d
            </button>
          </div>
        </div>
        {player ? (
          <div>
            <div>Discard</div>
            <div>
              <button onClick={Discard} value='a'>
                a
              </button>
              <button onClick={Discard} value='b'>
                b
              </button>
              <button onClick={Discard} value='c'>
                c
              </button>
              <button onClick={Discard} value='d'>
                d
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Card = props => {
  const card = props.card;
  const face = card ? card.face : 'top';
  const board = props.board;
  const owned = board ? true : false;
  const player = props.player;

  const classes = () => {
    return `card face-${face} ${owned ? 'card-playable' : ''}`;
  };
  return (
    <div className={classes()}>
      {owned ? (
        <CardActions board={board} player={player} card={card} />
      ) : (
        <></>
      )}
      {props.children}
    </div>
  );
};

export default observer(Card);
