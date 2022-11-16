import Modal, { ModalButton } from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { Controller } from "./Tetris";

type Props = {
  controller: Controller;
};

const StartGameModal = (props: Props) => {
  const defaultButtons: ModalButton[] = [
    {
      text: "Start Singleplayer",
      action: props.controller.restart,
    },
    {
      text: "Start Multiplayer",
      action: () => setMultiplayer(true),
    },
  ];

  const [multiplayer, setMultiplayer] = useState(false);
  const [buttons, setButtons] = useState<ModalButton[]>(defaultButtons);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (multiplayer) {
      setButtons([
        {
          text: "Back to Singleplayer",
          action: () => setMultiplayer(false),
        },
        {
          text: "Sart Multiplayer",
          action: () => props.controller.startMultiplayer(username, room),
        },
      ]);
    } else {
      setButtons(defaultButtons);
    }
  }, [multiplayer, username, room]);

  return (
    <Modal title="Start Game" buttons={buttons}>
      <div>
        {!multiplayer && (
          <p>Start a singleplayer or join a multiplayer session</p>
        )}
        {multiplayer && (
          <>
            <h3>Create or join a multiplayer session</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-left">
                  Username
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2  text-left">
                  Room
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </label>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default StartGameModal;
