import { useCallback, useEffect, useRef, useState } from "react";

export type Multiplayer = {
  socket: WebSocket | undefined;
  username: string | undefined;
  room: string | undefined;
};

export type SessionConnectHandler = (ev: Event) => any;
export type SessionMessageHandler = (ev: MessageEvent<any>) => any;
export type SessionDisconnectHandler = (ev: Event) => any;

export type Message = {
  type: "LINES_CLEARED";
  line: number;
};

export const useMultiplayer = (
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHandler,
  onClose: SessionDisconnectHandler
) => {
  const [session, setSession] = useState<Multiplayer>({
    socket: undefined,
    username: undefined,
    room: undefined,
  });

  const updateOpenHandler = () => {
    if (!session?.socket) return;
    session.socket.addEventListener("open", onOpen);
    return () => {
      session?.socket?.removeEventListener("open", onOpen);
    };
  };

  const updateMessageHandler = () => {
    if (!session?.socket) return;
    session.socket.addEventListener("message", onMessage);
    return () => {
      session?.socket?.removeEventListener("message", onMessage);
    };
  };

  const updateCloseHandler = () => {
    if (!session?.socket) return;
    session.socket.addEventListener("close", onClose);
    return () => {
      session?.socket?.removeEventListener("close", onClose);
    };
  };

  useEffect(updateOpenHandler, [session, onOpen]);
  useEffect(updateMessageHandler, [session, onMessage]);
  useEffect(updateCloseHandler, [session, onClose]);

  const startMultiplayer = useCallback((username: string, room: string) => {
    console.log("startMultiplayer", username, room);
    const socket = new WebSocket(
      `ws://localhost:9100/join?user=${username}&room=${room}`
    );
    setSession({ socket: socket, username: username, room: room });
  }, []);

  const closeMultiplayer = useCallback(() => {
    if (session?.socket && session.socket.readyState === session.socket.OPEN)
      session.socket.close(1001);
  }, [session]);

  const sendMessage = useCallback(
    (message: Message) => {
      const s = JSON.stringify(message);
      console.log(`message ${s}`);

      session?.socket?.send(s);
    },
    [session]
  );

  return { startMultiplayer, closeMultiplayer, sendMessage };
};
