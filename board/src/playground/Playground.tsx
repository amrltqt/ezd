import DataEditor from "./components/DataEditor";
import SizeEditor from "./components/SizeEditor";
import { useContext, useEffect } from "react";
import { BoardContext, BoardContextData } from "../BoardContext";
import { TreeEditor } from "./TreeEditor";

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
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
        EZD Playground
      </header>
      <div className="grid flex-1 h-full gap-4 p-2 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        <form className="grid items-start w-full gap-6">
          <fieldset className="grid gap-6 p-4 border rounded-lg">
            <legend className="px-1 -ml-1 text-sm font-medium">Widgets</legend>
            <SizeEditor />
            <TreeEditor />
          </fieldset>
          <fieldset className="grid gap-6 p-4 border rounded-lg">
            <legend className="px-1 -ml-1 text-sm font-medium">
              Variables
            </legend>
            <DataEditor />
          </fieldset>
        </form>
        <div className="relative flex h-full min-h-[50vh] flex-col bg-muted/50 p-2 mt-2 lg:col-span-2 bg-gray-50 rounded-lg border">
          <div className="mx-auto bg-white border border-dashed border-1 w-fit">
            {board}
          </div>
        </div>
      </div>
    </div>
  );
}
