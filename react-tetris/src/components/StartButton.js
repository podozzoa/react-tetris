import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButton = ({ Callback }) => (
    <StyledStartButton onMouseDown={Callback}> Start Game</StyledStartButton>
)

export default StartButton;



