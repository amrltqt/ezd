import "./index.css";
import Board from "./Board";
import Playground from "./playground/Playground";
import { BoardContext } from "./BoardContext";
import { useState } from "react";
import { AnyWidget } from "./widgets";
import { Dataset } from "./core";

declare global {
  interface Window {
    data: { [key: string]: Dataset | string | number };
    widgets: object[];
    size: number;
  }
}

const playground = import.meta.env.VITE_PLAYGROUND_PANEL === "true" || false;

function App() {
  const [data, setData] = useState(window.data || {});
  const [widgets, setWidgets] = useState(window.widgets || []);
  const [size, setSize] = useState(window.size || 500);
  console.log(playground, import.meta.env);
  return (
    <BoardContext.Provider
      value={{
        data,
        widgets: widgets as AnyWidget[],
        setData,
        setWidgets,
        size,
        setSize,
      }}
    >
      {playground && (
        <Playground
          board={
            <Board widgets={widgets as AnyWidget[]} data={data} size={size} />
          }
        />
      )}
      {!playground && (
        <Board widgets={widgets as AnyWidget[]} data={data} size={size} />
      )}
    </BoardContext.Provider>
  );
}

export default App;
