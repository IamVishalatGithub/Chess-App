import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAME_OVER, INIT_GAME } from "./Messages";
// import { Player } from "./Player";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private history: string[];
  private startTime: Date;
  private moveCount: number;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.history = [];
    this.startTime = new Date();
    this.moveCount = 1;

    player2.send(
      JSON.stringify({
        type: INIT_GAME,
        color: "Black",
      })
    );
    player1.send(
      JSON.stringify({
        type: INIT_GAME,
        color: "White",
      })
    );
  }

  makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    const move_number = this.moveCount;
    // Check if move is done by right player
    if (move_number % 2 && socket === this.player2) return;
    if (move_number % 2 === 0 && socket == this.player1) return;

    // Check if move is valid and move
    try {
      this.board.move(move);
    } catch (e) {
      console.log("Invalid Move");
      return;
    }
    this.player1.send(
      JSON.stringify({
        type: "move",
        payload: move,
      })
    );
    this.player2.send(
      JSON.stringify({
        type: "move",
        payload: move,
      })
    );
    // this.history.push(move.from + " " + move.to);
    // console.log(this.history);
    this.moveCount++;

    if (this.board.isGameOver()) {
      let winner: string;
      if (this.board.turn() === "w") winner = "White";
      else winner = "Black";
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: winner,
        })
      );
    }
  }
}
