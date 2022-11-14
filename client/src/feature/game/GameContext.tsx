import React from "react";
import { Game, init } from "./Game";
export const GameContext = React.createContext<Game>(init());
