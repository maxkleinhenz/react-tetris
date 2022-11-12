import React from "react";
import type { Controller as ControllerType } from "@/feature/game/Tetris";
import {
  PauseIcon,
  ChevronDoubleDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import ControllerButton from "./ControllerButton";
import ControllerActionButton from "./ControllerActionButton";

type Props = {
  controller: ControllerType;
};

export default function Controller({ controller }: Props): JSX.Element {
  return (
    <div className="flex flex-1 justify-center items-center gap-10 mx-auto mt-5">
      <div className="grid grid-rows-3 boder rounded-full border-solid p-3 border-gray-400 w-40 h-40">
        <div className="flex items-center justify-center">
          <ControllerButton
            title="lip piece clockwise"
            action={controller.flipClockwise}
          >
            <ArrowUturnRightIcon />
          </ControllerButton>
        </div>
        <div className="flex items-center justify-between">
          <ControllerButton
            title="Move piece left"
            action={controller.moveLeft}
          >
            <ChevronLeftIcon />
          </ControllerButton>
          <ControllerButton
            title="Move piece right"
            action={controller.moveRight}
          >
            <ChevronRightIcon />
          </ControllerButton>
        </div>
        <div className="flex items-center justify-center">
          <ControllerButton
            title="Move piece down"
            action={controller.moveDown}
          >
            <ChevronDownIcon />
          </ControllerButton>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ControllerActionButton title="Pause" action={controller.pause}>
          <PauseIcon />
        </ControllerActionButton>
        <ControllerActionButton title="Drop piece" action={controller.hardDrop}>
          <ChevronDoubleDownIcon />
        </ControllerActionButton>
      </div>
    </div>
  );
}
