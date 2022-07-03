import React, {useState} from "react";

//styled components
import  { StyledTetris, StyledTetrisWrapper} from './styles/StyledTetris';

//custom hooks
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";

// components 
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";


const Tetris =()  =>{
    const [droptime, setDroptime] = useState(null);
    const [gameOver, setGameOver] = useState(null);
    
    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);


    console.log('re-render');
    
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text ="Game Over" />
                    ) : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div>
                    )}
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;