import React from "react";
import Popup from "./Popup";
import Score from "./Score";
import Tetris from "./Tetris";

const GamePanel = (): JSX.Element => (
  <div>
    <Tetris>
      {({
        Gameboard,
        HeldPiece,
        PieceQueue,
        points,
        linesCleared,
        state,
        controller,
      }) => (
        <div>
          <div style={{ opacity: state === "PLAYING" ? 1 : 0.5 }}>
            <Score points={points} linesCleared={linesCleared}></Score>

            <div className="flex flex-1 gap-2">
              <div className="self-start">
                <HeldPiece />
              </div>

              <Gameboard />

              <div className="self-start">
                <PieceQueue />
              </div>
            </div>

            {/* <Controller controller={controller} /> */}
          </div>
          {state === "PAUSED" && (
            <Popup
              title="Paused"
              buttonText="Resume"
              buttonAction={controller.resume}
            ></Popup>
          )}

          {state === "LOST" && (
            <Popup
              title="Game Over"
              buttonText="Start"
              buttonAction={controller.restart}
            ></Popup>
          )}
        </div>
      )}
    </Tetris>
  </div>
);

export default GamePanel;
