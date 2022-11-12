import React from "react";
import { viewMatrix } from "@/feature/game/Game";
import { getClassName } from "@/feature/piece/Piece";
import { GameContext } from "@/feature/game/GameContext";

export default function GameboardView(): JSX.Element {
  const game = React.useContext(GameContext);
  const matrix = viewMatrix(game);

  return (
    <table className="game-board">
      <tbody>
        {matrix.map((row, i) => {
          const blocksInRow = row.map((block, j) => {
            const classString = `game-block ${
              block ? getClassName(block) : "block-empty"
            }`;
            return <td key={j} className={classString} />;
          });

          return <tr key={i}>{blocksInRow}</tr>;
        })}
      </tbody>
    </table>
  );
}
