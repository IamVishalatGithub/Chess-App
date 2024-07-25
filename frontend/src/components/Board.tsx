import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";

function Board({
  board,
  chess,
  setBoard,
  socket,
}: {
  chess: Chess;
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  >;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) {
  const col = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const [from, setFrom] = useState<string | null>(null);

  const handleClick = (i: number, j: number) => {
    i = 8 - i;
    const location: string = col[j] + String(i);
    if (!from) setFrom(location);
    else {
      console.log(from, ' ', location, ' ', typeof(location));
     
      chess.move({from, to: location});
      setBoard(chess.board());
      socket.send(
        JSON.stringify({
          type: 'move',
          payload: {
            move: {
              "from": from,
              "to": location,
            },
          },
        })
      );
      setFrom(null);
    }
  };
  return (
    <div className="h-150 w-150 border-b-50 m-5">
      {board.map((row, i) => {
        return (
          <div className="h-16 w-full flex justify-center" key={i}>
            {row.map((square, j) => {
              return (
                <div
                  onClick={() => handleClick(i, j)}
                  className={`cursor-pointer hover:border-cyan-500 hover:border-4 flex justify-center items-center text-center text-2xl w-16 h-16 ${
                    "text-" + square?.color
                  } ${(i + j) % 2 === 0 ? "bg-gray-600" : "bg-white"}`}
                  key={j}
                >
                  {square ? (
                    <img
                      className="h-10 w-5"
                      src={`/${
                        square?.color === "b"
                          ? square?.type
                          : `${square?.type?.toUpperCase()} copy`
                      }.png`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
