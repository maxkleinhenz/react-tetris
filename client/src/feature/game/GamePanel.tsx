import React from "react";
import Controller from "@/feature/controller/Controller";
import Score from "./Score";
import Tetris from "./Tetris";
import Modal from "@/components/Modal";
import StartGameModal from "./StartGameModal";

const GamePanel = (): JSX.Element => {
  return (
    <div className="flex place-items-center h-screen">
      <div className="mx-auto">
        <Tetris>
          {({
            Gameboard,
            PieceQueue,
            points,
            linesCleared,
            state,
            controller,
          }) => (
            <div>
              <div style={{ opacity: state === "PLAYING" ? 1 : 0.5 }}>
                <Score points={points} linesCleared={linesCleared}></Score>

                <div className="flex gap-2">
                  <Gameboard />

                  <div className="self-start">
                    <PieceQueue />
                  </div>
                </div>

                <Controller controller={controller} />
              </div>
              {state === "STOPPED" && (
                <StartGameModal controller={controller} />
              )}
              {state === "PAUSED" && (
                <Modal
                  title="Paused"
                  buttons={[
                    {
                      text: "Resume",
                      action: controller.resume,
                    },
                  ]}
                ></Modal>
              )}

              {state === "LOST" && (
                <Modal
                  title="Game Over"
                  buttons={[
                    {
                      text: "Start",
                      action: controller.restart,
                    },
                  ]}
                ></Modal>
              )}
            </div>
          )}
        </Tetris>
      </div>
    </div>
  );
};

export default GamePanel;
