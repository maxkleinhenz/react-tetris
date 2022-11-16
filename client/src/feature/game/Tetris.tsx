import React from "react";
import Gameboard from "@/feature/game/Gameboard";
import * as Game from "@/feature/game/Game";
import PieceQueue from "@/feature/piece/PieceQueue";
import { KeyboardMap, useKeyboardControls } from "@/hooks/useKeyboardControls";
import { GameContext } from "@/feature/game/GameContext";
import {
  SessionConnectHandler,
  SessionDisconnectHandler,
  SessionMessageHandler,
  useMultiplayer,
} from "../multiplayer/useMultiplayer";

export type RenderFn = (params: {
  Gameboard: React.ComponentType;
  PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
  level: number;
  state: Game.State;
  controller: Controller;
}) => React.ReactElement;

export type Controller = {
  pause: () => void;
  resume: () => void;
  hardDrop: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  flipClockwise: () => void;
  flipCounterclockwise: () => void;
  restart: () => void;
  startMultiplayer: (username: string, room: string) => void;
  sendClearedLines: (lines: number) => void;
};

type Props = {
  keyboardControls?: KeyboardMap;
  children: RenderFn;
};

const defaultKeyboardMap: KeyboardMap = {
  down: "MOVE_DOWN",
  left: "MOVE_LEFT",
  right: "MOVE_RIGHT",
  space: "HARD_DROP",
  z: "FLIP_COUNTERCLOCKWISE",
  x: "FLIP_CLOCKWISE",
  up: "FLIP_CLOCKWISE",
  p: "TOGGLE_PAUSE",
};

// https://harddrop.com/wiki/Tetris_Worlds#Gravity
const tickSeconds = (level: number) =>
  (0.8 - (level - 1) * 0.007) ** (level - 1);

export default function Tetris(props: Props): JSX.Element {
  const onSessionConnected: SessionConnectHandler = (ev) => {
    console.log("on connected");
    dispatch("RESTART");
  };

  const onSessionMessage: SessionMessageHandler = (e) => {
    console.log("on message", e);
  };

  const onSessionClose: SessionDisconnectHandler = (e) => {
    console.log("on close");
  };

  const [game, dispatch] = React.useReducer(Game.update, Game.init());
  const { startMultiplayer, closeMultiplayer, sendMessage } = useMultiplayer(
    onSessionConnected,
    onSessionMessage,
    onSessionClose
  );

  const keyboardMap = props.keyboardControls ?? defaultKeyboardMap;
  useKeyboardControls(keyboardMap, dispatch);

  const level = Game.getLevel(game);
  const linesRef = React.useRef(game.lines);

  React.useEffect(() => {
    let interval: number | undefined;
    if (game.state === "PLAYING") {
      interval = window.setInterval(() => {
        dispatch("TICK");
      }, tickSeconds(level) * 1000);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [game.state, level]);

  const controller = React.useMemo(
    () => ({
      pause: () => dispatch("PAUSE"),
      resume: () => dispatch("RESUME"),
      hardDrop: () => dispatch("HARD_DROP"),
      moveDown: () => dispatch("MOVE_DOWN"),
      moveLeft: () => dispatch("MOVE_LEFT"),
      moveRight: () => dispatch("MOVE_RIGHT"),
      flipClockwise: () => dispatch("FLIP_CLOCKWISE"),
      flipCounterclockwise: () => dispatch("FLIP_COUNTERCLOCKWISE"),
      restart: () => dispatch("RESTART"),
      startMultiplayer: (username: string, room: string) => {
        startMultiplayer(username, room);
      },
      sendClearedLines: (lines: number) => {
        const l = Math.floor(lines / 2);
        if (l > 0) sendMessage({ type: "LINES_CLEARED", line: l });
      },
    }),
    [dispatch, startMultiplayer, sendMessage]
  );

  React.useEffect(() => {
    const linesCleared = game.lines - linesRef.current;
    controller.sendClearedLines(linesCleared);

    linesRef.current = game.lines;
  }, [game.lines, controller.sendClearedLines]);

  return (
    <GameContext.Provider value={game}>
      {props.children({
        Gameboard,
        PieceQueue,
        points: game.points,
        linesCleared: game.lines,
        state: game.state,
        level,
        controller,
      })}
    </GameContext.Provider>
  );
}
