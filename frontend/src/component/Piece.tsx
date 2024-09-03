import React from 'react'
import King from './pieces/King';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Queen from './pieces/Queen';
import Pawn from './pieces/Pawn';
import { Bishop } from './pieces/Bishop';

// "#34364c";
// "#f4f7fa";


export const Piece = ({rank, color}:{rank:string, color:string}) => {

    if(color === "b") color = "#34364c";
    else color = "#f4f7fa";

 switch(rank){
        case "k":
            return (<King fillcolor={color} />);
            break;
        case "q":
            return (<Queen fillcolor={color} />)
            break;
        case "n":
            return (<Knight fillcolor={color} />)
            break;
        case "p":
            return (<Pawn fillcolor={color} />)
            break;
        case "r":
            return (<Rook fillcolor={color} />)
            break;
        default:
            return (<Bishop fillcolor={color} />)


    }

};
