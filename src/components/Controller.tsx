import React from "react";
import type { Controller as ControllerType } from "@/components/Tetris";
import {
  PauseIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

type Props = {
  controller: ControllerType;
};

export default function Controller({ controller }: Props): JSX.Element {
  return (
    <div className="flex flex-1 justify-center items-center gap-10 mx-auto mt-5">
      <div className="grid grid-rows-3 boder rounded-full border-solid p-3 border-gray-400 w-36 h-36">
        <div className="flex items-center justify-center">
          <button
            className="border-2 border-solid border-gray-400 w-9 h-9"
            title="Flip piece clockwise"
            onClick={controller.flipClockwise}
          >
            <ArrowPathIcon className="text-gray-600 w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="border-2 border-solid border-gray-400 w-9 h-9"
            title="Move piece left"
            onClick={controller.moveLeft}
          >
            <ArrowLeftIcon className="text-gray-600 w-5 h-5" />
          </button>
          <button
            className="border-2 border-solid border-gray-400 w-9 h-9"
            title="Move piece right"
            onClick={controller.moveRight}
          >
            <ArrowRightIcon className="text-gray-600 w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="border-2 border-solid border-gray-400 w-9 h-9"
            title="Move piece down"
            onClick={controller.moveDown}
          >
            <ArrowDownIcon className="text-gray-600 w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          className="border-2 border-solid border-gray-400 p-2 rounded-full"
          title="Pause"
        >
          <PauseIcon
            className="text-gray-600 w-8 h-7 p-1"
            onClick={controller.pause}
          />
        </button>
        <button
          className="border-2 border-solid border-gray-400 p-2 rounded-full"
          title="Drop piece"
        >
          <ArrowDownTrayIcon
            className="text-gray-600 w-8 h-7 p-1"
            onClick={controller.hardDrop}
          />
        </button>
      </div>
    </div>
  );
}
