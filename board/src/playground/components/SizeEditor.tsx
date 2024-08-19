import React from "react";

import { useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextData } from "../../BoardContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="grid gap-3">
      <Label htmlFor="size">Size</Label>
      <Input
        id="size"
        type="number"
        placeholder="Email"
        value={size}
        onChange={handleSizeChange}
      />
    </div>
  );
}
