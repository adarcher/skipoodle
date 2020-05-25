import React from 'react';
import GameObj from '../objs/game';
import GameBoard from './game_board.react';
import Player from './player/player.react';
import { observer } from 'mobx-react';

@observer
export default class Skipoodle extends React.PureComponent {
  game = new GameObj('Anddy');

  Deal = () => {
    if (this.game.players.length > 1) {
      this.game.Deal();
    }
  };

  render() {
    return (
      <div className='App'>
        <div id='players'>
          {this.game.Opponents().map(p => (
            <Player key={p.name} player={p} />
          ))}
        </div>
        <div className='board'>
          <GameBoard board={this.game.board} player={this.game.Self()} />
          <button onClick={this.Deal}>New Deal</button>
        </div>
        <div id='player'>
          <Player
            board={this.game.board}
            owned={true}
            player={this.game.Self()}
          />
        </div>
      </div>
    );
  }
}
