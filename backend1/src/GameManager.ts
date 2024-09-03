import WebSocket from "ws";
import { Game } from "./Game";
// import { Player } from "./Player";
import { INIT_GAME, MOVE } from "./Messages";

export class GameManager {
  private games: Game[];
  private players: WebSocket[];
  private pendingUser: WebSocket | null;

  constructor() {
    this.games = [];
    this.players = [];
    this.pendingUser = null;
  }

  addPlayer(socket: WebSocket) {
    this.players.push(socket);
    this.addHandler(socket);
  }

  removePlayer(socket: WebSocket) {
    this.players = this.players.filter((player) => player != socket);
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      // init game
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
          socket.send(
            JSON.stringify({
              type: "wait",
            })
          );
        }
      }

      // Handle Move
      if (message.type === MOVE) {
        const curr_game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (curr_game) {
          curr_game.makeMove(socket, message.payload.move);
        }
      }

      // new chat msg
      if (message.type === "chat") {
        const curr_game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (curr_game) {
          curr_game.player1.emit(
            JSON.stringify({
              type: "chat",
              payload: message.payload,
            })
          );

          curr_game.player2.emit(
            JSON.stringify({
              type: "chat",
              payload: message.payload,
            })
          );
        }
      }
    });
  }
}
