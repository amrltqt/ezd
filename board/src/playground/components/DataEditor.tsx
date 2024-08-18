import { useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextData } from "../../BoardContext";

export default function DataEditor() {
  const context = useContext<BoardContextData>(BoardContext);

  const [data, setData] = useState("");

  useEffect(() => {
    setData(JSON.stringify(context.data, null, 2));
  }, [context.data]);

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

  return (
    <div className="w-full">
      <label htmlFor="data">Data</label>
      <textarea
        id="data"
        className="w-full p-2 font-mono border h-1/2"
        placeholder="Data"
        value={data}
        onChange={handleDataChange}
      />
    </div>
  );
}
