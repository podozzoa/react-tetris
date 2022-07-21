import React from "react";
import Cell from "./Cell";

import { StyledDisplay } from "./styles/StyledDisplay";
import { StyledNext } from "./styles/StyledNext";

const Next = ({gameOver, next, nextStage}) => (
    <StyledDisplay gameOver={gameOver}> Next
        <StyledNext width ={4} height ={4}>
            {nextStage.map((row,y) => row.map((cell,x) => <Cell key={x} type={(y<next.length && x<next[0].length) ? (next[y][x]) : (cell[0])}> </Cell>))}
        </StyledNext>
    </StyledDisplay>
    
)
    

export default Next;

