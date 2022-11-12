import React from "react";
import PieceView from "./PieceView";
import { GameContext } from "@/feature/game/GameContext";

export default function PieceQueue(): JSX.Element {
  const { queue } = React.useContext(GameContext);
  return (
    <div>
      {queue.queue.map((piece, i) => (
        <PieceView piece={piece} key={i} />
      ))}
    </div>
  );
}
