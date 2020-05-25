import GameBoardObj from './game_board';
import PlayerObj from './player';

const STARTING_CARDS = [0, 20, 30, 30, 20, 20];

export default class GameObj {
  constructor(name) {
    this.name = name;
    this.players = [
      new PlayerObj({ name: this.name }),
      new PlayerObj({ name: 'Abby' }),
      new PlayerObj({ name: 'Joe' }),
      new PlayerObj({ name: 'Albacore' }),
    ];
    this.board = new GameBoardObj();
    this.Deal();
  }

  Deal() {
    const player_count = this.players.length;
    const starting_cards = STARTING_CARDS[player_count];
    this.board.Init();
    this.players.forEach(p => {
      p.Init(this.board.deck.Deal(starting_cards));
      p.Draw(this.board.deck);
    });
  }

  Self() {
    return this.players.find(p => p.name == this.name);
  }

  Opponents() {
    return this.players.slice(1);
  }

  //
  Save() {
    return {
      players: this.players.map(p => p.Save()),
      board: this.board.Save(),
    };
  }

  Load(json) {
    if (json.players != undefined) {
      this.players.forEach(p => p.FindLoad(json.players));
    }
    if (json.board != undefined) {
      this.board.Load(json.board);
    }
  }
}
