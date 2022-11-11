import "./App.css";
import GamePanel from "./components/GamePanel";

function App() {
  return (
    <div className="w-full">
      <div className="flex-1 items-center justify-center flex-col">
        <GamePanel />
      </div>
    </div>
  );
}

export default App;
