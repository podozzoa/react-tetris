import React, {useState} from "react";

import { createStage } from "../gameHelpers";

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
    
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);


    console.log('re-render');

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0});
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false})
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === 37){ //left arrow in keyboard
                movePlayer(-1);
            } else if(keyCode === 39){ // right arrow
                movePlayer(1);
            } else if(keyCode === 40){ // down arrow
                dropPlayer();
            }
        }
    
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;