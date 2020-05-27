import React from 'react';
import GameObj from '../objs/game';
import GameBoard from './game_board.react';
import Player from './player/player.react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';

const ColorChoice = props => {
  const active = props.current == props.color;
  const p = {
    value: props.color,
    onClick: props.On,
    className: `color-choice ${props.color}`,
  };
  return <button {...p} disabled={active} />;
};

const ConnectionButtons = props => {
  const name = props.name;

  const disabled = name == '';

  const Connect = props.Connect;

  const Host = () => {
    const peer = new Peer('Skipoodle_Host', {
      host: 'dmpeer.herokuapp.com',
      path: '/myapp',
      secure: true,
    });
    Connect(peer);
  };

  const Join = () => {
    const peer = new Peer(undefined, {
      host: 'dmpeer.herokuapp.com',
      path: '/myapp',
      secure: true,
    });
    peer.connect('Skipoodle_Host');
    Connect(peer);
  };

  return (
    <>
      <button onClick={Host} disabled={disabled}>
        Host Game
      </button>
      <button onClick={Join} disabled={disabled}>
        Join Game
      </button>
      <br />
    </>
  );
};

@observer
export default class Skipoodle extends React.PureComponent {
  @observable color = localStorage.color || 'blue';

  OnColor = e => {
    this.color = e.target.value;
    localStorage.color = this.color;
  };

  @observable name = localStorage.name || '';

  @action
  OnName = e => {
    const name = e.target.value;
    this.game.Self(this.name).name = name;
    this.name = name;
    localStorage.name = name;
  };

  @observable peer = false;

  OnPeer = peer => {
    this.peer = peer;
  };

  game = new GameObj(this.name);

  Deal = () => {
    if (this.game.players.length > 1) {
      this.game.Deal();
    }
  };

  get player() {
    return this.game.Self(this.name);
  }

  render() {
    return (
      <div className={`App ${this.color}`}>
        <div id='players'>
          {this.game.Opponents().map(p => (
            <Player key={p.name} player={p} />
          ))}
        </div>
        <div className='home-turf'>
          <div className='board'>
            <GameBoard board={this.game.board} player={this.player} />
          </div>
          <div id='player'>
            <Player board={this.game.board} owned={true} player={this.player} />
          </div>
        </div>
        <div id='controls'>
          {!this.peer ? (
            <ConnectionButtons name={this.name} Connect={this.OnPeer} />
          ) : (
            <></>
          )}
          <input
            placeholder='Your Name'
            value={this.name}
            onChange={this.OnName}
          />
          <button onClick={this.Deal}>New Game</button>
          <div id='color'>
            <ColorChoice current={this.color} color='blue' On={this.OnColor} />
            <ColorChoice current={this.color} color='green' On={this.OnColor} />
            <ColorChoice current={this.color} color='red' On={this.OnColor} />
            <ColorChoice current={this.color} color='grey' On={this.OnColor} />
            <ColorChoice current={this.color} color='pink' On={this.OnColor} />
          </div>
        </div>
      </div>
    );
  }
}
