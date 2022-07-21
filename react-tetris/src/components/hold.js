import React from "react";
import Cell from "./Cell";

import { StyledDisplay } from "./styles/StyledDisplay";
import { StyledNext } from "./styles/StyledNext";

const Hold = ({gameOver, hold, holdStage}) => (
    <StyledDisplay gameOver={gameOver}> Hold
        <StyledNext width ={4} height ={4}>
            {holdStage.map((row,y) => row.map((cell,x) => 
            <Cell key={x} type={(y<hold.length && x<hold[0].length) ?
                                (hold[y][x]) : (cell[0])}> </Cell>))}
        </StyledNext>
    </StyledDisplay>
)

export default Hold;