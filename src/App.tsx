import { useState } from "react";
import reactLogo from "./assets/react.svg";
import styled from "styled-components";
import "./App.css";
import GamePanel from "./components/GamePanel";
import Tetris from "./components/Tetris";
import styles from "./App.module.css";

const Container = styled.div`
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 300;
  width: 100%;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <div className={styles["vertically-center-children"]}>
        <GamePanel />
      </div>
    </Container>
  );
}

export default App;
