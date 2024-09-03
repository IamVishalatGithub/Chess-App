import { useEffect, useState } from "react";
import Board from "../component/Board";
import { useSocket } from "../hooks/socket";
import { Chess } from "chess.js";
import Chat from "../component/Chat";
// import AnimatedButton from "../component/Button";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

function Game() {
  const socket = useSocket();
  const chess = new Chess();
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState<string | null>(null);
  const [msg, setMsg] = useState("No new message");

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setColor(message.color);
          console.log("Connected with Opponent");
          setStarted(true);
          break;

        case MOVE:
          // const from = message.payload.from;
          // const to = message.payload.to;
          chess.move(message.payload);
          setBoard(chess.board());
          console.log("move made");
          break;

        case "wait":
          setStarted(true);
          setColor("waiting ");
          break;

        case GAME_OVER:
          setColor(message.payload);
          break;

        case "chat":
          setMsg(message.payload);
      }
    };
  }, [socket]);

  // if (!socket) return <div>Server Down Connecting....</div>;
  return (
    <div className="bg-[#f0f8ff] flex justify-center content-center items-center mx-2">
      <Board board={board} chess={chess} setBoard={setBoard} socket={socket} />

      {!started && (
        <button
          onClick={() => {
            const message = {
              type: "init_game",
            };
            socket.send(JSON.stringify(message));
          }}
          className="bg-black text-white h-10 w-24 rounded-xl hover:bg-white hover:text-black"
        >
          Play
        </button>
      )}

      {started && (
        <div>
          <h1>{color==="waiting" ? "Waiting for Opponent" : "You are "+color}</h1>
          <Chat socket={socket}/>
          <h2>{msg}</h2>
        </div>
      )}
    </div>
  );
}

export default Game;
