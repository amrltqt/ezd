import { useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextData } from "../../BoardContext";

export default function SizeEditor() {
  const context = useContext<BoardContextData>(BoardContext);

  const [size, setSize] = useState(500);

  useEffect(() => {
    setSize(context.size);
  }, [context.size]);

  function handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      return;
    }

    if (value < 1) {
      return;
    }

    setSize(value);
    context.setSize(value);
    localStorage.setItem("size", value.toString());
  }

  return (
    <div className="w-full">
      <label htmlFor="size">Size</label>
      <input
        className="w-full p-2 border"
        type="number"
        value={size}
        onChange={handleSizeChange}
      />
    </div>
  );
}
