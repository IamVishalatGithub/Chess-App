import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import { useSocket } from "../hooks/socket";
import { Chess } from "chess.js";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  // const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          // setColor(message.color);
          break;

        case MOVE:
          const from = message.payload.from;
          const to = message.payload.to;
          chess.move({ from, to });
          setBoard(chess.board());
          console.log("move made");
          break;

        // case "wait":
        //   setStarted(true);
        //   setColor('waiting ');
        //   break;

        case GAME_OVER:
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting....</div>;
  return (
    <div className="bg-white flex justify-between content-center mx-2">
      <Board board={board} chess={chess} setBoard={setBoard} socket={socket} />
      {!started && (
        <button
          onClick={() => {
            const message = {
              type: "init_game",
            };
            socket.send(JSON.stringify(message));
          }}
          className="bg-black text-white"
        >
          Play
        </button>
      )}

      {/* {started && (
        <div className="bg-black text-white p-4">You are {color}</div>
      )} */}
    </div>
  );
}

export default Game;
