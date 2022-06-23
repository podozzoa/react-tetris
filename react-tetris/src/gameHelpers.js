export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
 Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill ([0,'clear'])
    ) // 2차원 배열 선언 
