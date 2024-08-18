import WidgetEditor from "./components/WidgetEditor";
import DataEditor from "./components/DataEditor";
import SizeEditor from "./components/SizeEditor";
import { useContext, useEffect } from "react";
import { BoardContext, BoardContextData } from "../BoardContext";

export default function Playground({ board }: { board: React.ReactNode }) {
  const { setData, setSize, setWidgets } =
    useContext<BoardContextData>(BoardContext);
  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    const savedWidgets = localStorage.getItem("widgets");
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }

    const savedSize = localStorage.getItem("size");
    if (savedSize) {
      setSize(parseInt(savedSize, 10));
    }
  }, [setData, setWidgets, setSize]);

  return (
    <div className="flex h-screen">
      <div className="grid flex-1 h-full gap-4 p-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex flex-col items-start h-full gap-8 md:flex">
          <h1 className="text-2xl font-bold">Playground</h1>
          <SizeEditor />
          <DataEditor />
          <WidgetEditor />
        </div>
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <div className="mx-auto border-dashed border-1 w-fit">{board}</div>
        </div>
      </div>
    </div>
  );
}
