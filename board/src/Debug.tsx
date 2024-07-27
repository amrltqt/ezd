import { useContext, useState } from "react";
import { BoardContext } from "./BoardContext";

import { boardValidator } from "./widgets";

export default function Debug({ board }: { board: React.ReactNode }) {
  const context = useContext(BoardContext);

  const savedData = localStorage.getItem("data");
  const savedWidgets = localStorage.getItem("widgets");

  const [data, setData] = useState(
    savedData || JSON.stringify(context.data, null, 2)
  );
  const [widgets, setWidgets] = useState(
    savedWidgets || JSON.stringify(context.widgets, null, 2)
  );

  function handleDataChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setData(e.target.value);

    try {
      const data = JSON.parse(e.target.value);
      context.setData(data);
      localStorage.setItem("data", JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(e);
    }
  }

  function handleWidgetsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setWidgets(e.target.value);

    try {
      const widgets = JSON.parse(e.target.value);
      const validation = boardValidator.validate(widgets);
      if (validation.error) {
        console.error(validation.error.details);
        return;
      } else {
        console.log(validation.value);
        context.setWidgets(validation.value);
        localStorage.setItem(
          "widgets",
          JSON.stringify(validation.value, null, 2)
        );
      }
    } catch (e) {
      // do nothing
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/2">
        <div className="mx-auto border-dashed border-1 w-fit">{board}</div>
      </div>
      <div className="flex flex-col w-1/2 h-full">
        <div className="flex-1">
          <label htmlFor="data">Data</label>
          <textarea
            id="data"
            className="w-full p-2 font-mono border h-1/2"
            placeholder="Data"
            value={data}
            onChange={handleDataChange}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="widgets">Widgets</label>
          <textarea
            id="widgets"
            className="w-full p-2 font-mono border h-1/2"
            placeholder="Widgets"
            value={widgets}
            onChange={handleWidgetsChange}
          />
        </div>
      </div>
    </div>
  );
}
