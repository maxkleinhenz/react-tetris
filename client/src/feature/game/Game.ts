import {
  Matrix,
  PositionedPiece,
  buildMatrix,
  addPieceToBoard,
  isEmptyPosition,
  flipClockwise,
  flipCounterclockwise,
  moveDown,
  moveLeft,
  moveRight,
  setPiece,
  hardDrop,
} from "./Matrix";
import Constants from "@/app/constants";
import * as PieceQueue from "@/feature/piece/piece-queue";
import { Piece } from "../piece/Piece";

export type State = "STOPPED" | "PAUSED" | "PLAYING" | "LOST";

export type Game = {
  state: State;
  matrix: Matrix;
  piece: PositionedPiece;
  queue: PieceQueue.PieceQueue;
  points: number;
  lines: number;
};

export const getLevel = (game: Game): number => Math.floor(game.lines / 10) + 1;

export type Action =
  | "STOP"
  | "PAUSE"
  | "RESUME"
  | "TOGGLE_PAUSE"
  | "TICK"
  | "HARD_DROP"
  | "MOVE_DOWN"
  | "MOVE_LEFT"
  | "MOVE_RIGHT"
  | "FLIP_CLOCKWISE"
  | "FLIP_COUNTERCLOCKWISE"
  | "RESTART";

export const update = (game: Game, action: Action): Game => {
  switch (action) {
    case "STOP": {
      return game.state === "PLAYING" ? { ...game, state: "STOPPED" } : game;
    }
    case "RESTART": {
      return init("PLAYING");
    }
    case "PAUSE": {
      return game.state === "PLAYING" ? { ...game, state: "PAUSED" } : game;
    }
    case "RESUME": {
      return game.state === "PAUSED" ? { ...game, state: "PLAYING" } : game;
    }
    case "TOGGLE_PAUSE": {
      if (game.state === "PLAYING") return { ...game, state: "PAUSED" };
      if (game.state === "PAUSED") return { ...game, state: "PLAYING" };
      return game;
    }
    case "HARD_DROP": {
      if (game.state !== "PLAYING") return game;
      const piece = hardDrop(game.matrix, game.piece);
      return lockInPiece({ ...game, piece });
    }
    case "TICK":
    case "MOVE_DOWN": {
      if (game.state !== "PLAYING") return game;
      const updated = applyMove(moveDown, game);
      if (game.piece === updated.piece) {
        return lockInPiece(updated);
      } else {
        return updated;
      }
    }
    case "MOVE_LEFT": {
      return applyMove(moveLeft, game);
    }
    case "MOVE_RIGHT": {
      return applyMove(moveRight, game);
    }
    case "FLIP_CLOCKWISE": {
      return applyMove(flipClockwise, game);
    }
    case "FLIP_COUNTERCLOCKWISE": {
      return applyMove(flipCounterclockwise, game);
    }
    default: {
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action: ${exhaustiveCheck}`);
    }
  }
};

const lockInPiece = (game: Game): Game => {
  const [matrix, linesCleared] = setPiece(game.matrix, game.piece);
  const next = PieceQueue.getNext(game.queue);
  const piece = initializePiece(next.piece);
  return {
    ...game,
    state: isEmptyPosition(matrix, piece) ? game.state : "LOST",
    matrix,
    piece,
    queue: next.queue,
    lines: game.lines + linesCleared,
    points: game.points + addScore(linesCleared),
  };
};

const pointsPerLine = 100;
const addScore = (additionalLines: number) => {
  // what's this called?
  if (additionalLines === 4) {
    return pointsPerLine * 10;
  } else {
    return additionalLines * pointsPerLine;
  }
};

const initialPosition = {
  x: Constants.GAME_WIDTH / 2 - Constants.BLOCK_WIDTH / 2,
  y: 0,
};

const initializePiece = (piece: Piece): PositionedPiece => {
  return {
    position: initialPosition,
    piece,
    rotation: 0,
  };
};

const applyMove = (
  move: (matrix: Matrix, piece: PositionedPiece) => PositionedPiece | undefined,
  game: Game
): Game => {
  if (game.state !== "PLAYING") return game;
  const afterFlip = move(game.matrix, game.piece);
  return afterFlip ? { ...game, piece: afterFlip } : game;
};

export const init = (state: State = "STOPPED"): Game => {
  const queue = PieceQueue.create(1);
  const next = PieceQueue.getNext(queue);
  return {
    state: state,
    points: 0,
    lines: 0,
    matrix: buildMatrix(),
    piece: initializePiece(next.piece),
    queue: next.queue,
  };
};

// Good display of merging piece + matrix
export function viewMatrix(game: Game): Matrix {
  let gameboard = game.matrix;

  // set the preview
  gameboard = addPieceToBoard(gameboard, hardDrop(gameboard, game.piece), true);

  // set the actual piece
  return addPieceToBoard(gameboard, game.piece);
}
