import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";
import { Piece } from "./Piece.js";
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
      console.log(from, ' ', location);
     
      // chess.move({from, to: location});
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


  // bg-[b7c0d8]"" : "bg-[e8edf9]"

  return (
    <div className="h-160 w-160 border-b-50 m-5">
      {board.map((row, i) => {
        return (
          <div className="h-20 w-full flex justify-center" key={i}>
            {row.map((square, j) => {
              return (
                <div
                  onClick={() => handleClick(i, j)}
                  className={`cursor-pointer hover:border-cyan-500 hover:border-4 flex justify-center items-center text-center text-2xl w-20 h-20 ${
                    "text-" + square?.color
                  } ${(i + j) % 2 === 0 ? "bg-[#b7c0d8]" : "bg-[#e8edf9]"}`}
                  key={j}
                >
                  {square ? (
                    <Piece rank = {square.type} color={square.color}/>
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
