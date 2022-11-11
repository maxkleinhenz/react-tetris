import { useState } from "react";
import reactLogo from "./assets/react.svg";
import styled from "styled-components";
import "./App.css";
import GamePanel from "./components/GamePanel";
import Tetris from "./components/Tetris";

const Container = styled.div`
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 300;
  width: 100%;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const VerticallyCenterChildren = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <VerticallyCenterChildren>
        {/* <div>
          <h1>Tetris</h1>
          <Tetris
            keyboardControls={{
              // Default values shown here. These will be used if no
              // `keyboardControls` prop is provided.
              down: "MOVE_DOWN",
              left: "MOVE_LEFT",
              right: "MOVE_RIGHT",
              space: "HARD_DROP",
              z: "FLIP_COUNTERCLOCKWISE",
              x: "FLIP_CLOCKWISE",
              up: "FLIP_CLOCKWISE",
              p: "TOGGLE_PAUSE",
              c: "HOLD",
              shift: "HOLD",
            }}
          >
            {({
              HeldPiece,
              Gameboard,
              PieceQueue,
              points,
              linesCleared,
              state,
              controller,
            }) => (
              <div>
                <HeldPiece />
                <div>
                  <p>Points: {points}</p>
                  <p>Lines Cleared: {linesCleared}</p>
                </div>
                <Gameboard />
                <PieceQueue />
                {state === "LOST" && (
                  <div>
                    <h2>Game Over</h2>
                    <button onClick={controller.restart}>New game</button>
                  </div>
                )}
              </div>
            )}
          </Tetris>
        </div> */}
        <GamePanel />
      </VerticallyCenterChildren>
    </Container>
  );
}

export default App;
