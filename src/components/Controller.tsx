import React from "react";
import type { Controller as ControllerType } from "@/components/Tetris";

type Props = {
  controller: ControllerType;
};

export default function Controller({ controller }: Props): JSX.Element {
  return (
    <div className="grid grid-rows-3 mt-6 mx-auto boder rounded-full border-solid p-3 border-gray-400 w-36 h-36">
      <div className="flex items-center justify-center">
        <button
          className="border-2 border-solid border-gray-400 w-9 h-9"
          onClick={controller.flipClockwise}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="border-2 border-solid border-gray-400 w-9 h-9"
          onClick={controller.moveLeft}
        />
        <button
          className="border-2 border-solid border-gray-400 w-9 h-9"
          onClick={controller.moveRight}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="border-2 border-solid border-gray-400 w-9 h-9"
          onClick={controller.moveDown}
        />
      </div>
    </div>
  );
}
