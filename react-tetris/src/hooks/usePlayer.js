import { useCallback, useState } from "react";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";

import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () =>{
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const [nextPlayer, setNextPlayer] = useState(randomTetromino().shape);
    const [holdPlayer, setHoldPlayer] = useState(TETROMINOS[0].shape);
    const [holdflag, setHoldflag] = useState(false);

    const holding = () => {
        if(holdflag === true) {
            return;
        }
        if(holdPlayer === TETROMINOS[0].shape){
            setHoldPlayer(player.tetromino);
            setPlayer(prev => ({
                ...prev,
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
                tetromino: nextPlayer,
            }));
            setNextPlayer(randomTetromino().shape);

        } else {
            setHoldPlayer(player.tetromino);
            setPlayer(prev => ({
                ...prev,
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
                tetromino: holdPlayer,
            }))
        }   
        setHoldflag(true);
    } 

    const rotate = (matrix, dir) => {
        //make the rows to become cols (transpose)
        const rotatedTetro = matrix.map((_, index) => 
            matrix.map(col =>col[index]),
        );
        //reverse each row to get a rotated matrix
        if(dir > 0) return  rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({x, y, collided}) =>{
        setPlayer(prev => ({
            ...prev,
            pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: nextPlayer,
            collided: false,
        });
        setNextPlayer(randomTetromino().shape);
        setHoldflag(false);
    }, [nextPlayer]);
    return [player, updatePlayerPos, resetPlayer, playerRotate, nextPlayer, holdPlayer, holding];
}
