import React, { useState } from "react";

import { createStage, checkCollision, STAGE_HEIGHT, STAGE_WIDTH } from "../gameHelpers";

//styled components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

//custom hooks
import { useInterval } from "../hooks/useInterval"
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { useGameStatus } from "../hooks/useGameStatus";

// components 
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import Next from "./nextTetromino";
import Hold from "./hold";


const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate, nextPlayer, holdPlayer, holding] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);




    console.log('re-render');

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }


    const startGame = () => {
        console.log("click start button!");
        setStage(createStage(STAGE_HEIGHT, STAGE_WIDTH));
        resetPlayer();
        setDropTime(1000);
        setGameOver(false);
        setLevel(0);
        setScore(0);
        setRows(0);

    }
    const superDrop = () => {
        // immediatly drop
        let posGap = 0;
        while (!checkCollision(player, stage, { x: 0, y: posGap })) {
            posGap += 1;
        }

        updatePlayerPos({ x: 0, y: posGap - 1, collided: false });
        updatePlayerPos({ x: 0, y: 0, collided: true });
    }
    const drop = () => {
        // increase level when player has cleared  10 rows
        if (rows > (level + 1) * 5) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200)
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            //game over
            if (player.pos.y < 1) {
                console.log("GAME OVER!");
                setGameOver(true);
                setDropTime(null);

            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }
    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                console.log("interval on");
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        console.log("interval off");
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) { //left arrow in keyboard
                movePlayer(-1);
            } else if (keyCode === 39) { // right arrow
                movePlayer(1);
            } else if (keyCode === 40) { // down arrow
                dropPlayer();
            } else if (keyCode === 38) { // up arrow
                playerRotate(stage, 1);
            } else if (keyCode === 32) { // super drop
                //playerRotate(stage, 1);
                superDrop();
            } else if (keyCode === 17) { //hold 
                holding();
            }
        }

    }

    useInterval(() => {
        drop();

    }, dropTime)

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp} autoFocus>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <div>
                            <Display gameOver={gameOver} text="Game Over" />
                            <Display gameOver={gameOver} text={`Score : ${score}`} />
                        </div>
                    ) : (
                        <div>
                            <Next next={nextPlayer} nextStage={createStage(4, 4)} />
                            <Hold hold={holdPlayer} holdStage={createStage(4, 4)} />
                            <Display text={`Score : ${score}`} />
                            <Display text={`Rows : ${rows}`} />
                            <Display text={`Level : ${level}`} />
                        </div>
                    )}
                    <StartButton Callback={startGame} />

                </aside>

            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;

