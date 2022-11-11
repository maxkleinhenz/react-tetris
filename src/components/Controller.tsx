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
      <div className="grid grid-rows-3 boder rounded-full border-solid p-3 border-gray-400 w-40 h-40">
        <div className="flex items-center justify-center">
          <button
            className="border-2 border-solid border-gray-400 rounded-full p-3 w-14 h-14"
            title="Flip piece clockwise"
            onClick={controller.flipClockwise}
          >
            <ArrowPathIcon className="text-gray-600" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="border-2 border-solid border-gray-400 rounded-full p-3 w-14 h-14"
            title="Move piece left"
            onClick={controller.moveLeft}
          >
            <ArrowLeftIcon className="text-gray-600" />
          </button>
          <button
            className="border-2 border-solid border-gray-400 rounded-full p-3 w-14 h-14"
            title="Move piece right"
            onClick={controller.moveRight}
          >
            <ArrowRightIcon className="text-gray-600" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="border-2 border-solid border-gray-400 rounded-full p-3 w-14 h-14"
            title="Move piece down"
            onClick={controller.moveDown}
          >
            <ArrowDownIcon className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          className="border-2 border-solid border-gray-400 rounded-full p-3 w-14 h-14"
          title="Pause"
        >
          <PauseIcon className="text-gray-600" onClick={controller.pause} />
        </button>
        <button
          className="border-2 border-solid border-gray-400 rounded-full p-3 w-14 h-14"
          title="Drop piece"
        >
          <ArrowDownTrayIcon
            className="text-gray-600"
            onClick={controller.hardDrop}
          />
        </button>
      </div>
    </div>
  );
}
