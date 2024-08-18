import React from "react";

import { useContext, useEffect, useState } from "react";
import { boardValidator } from "../../widgets";
import { BoardContext, BoardContextData } from "../../BoardContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function WidgetEditor() {
  const context = useContext<BoardContextData>(BoardContext);

  const [widgets, setWidgets] = useState("");

  useEffect(() => {
    setWidgets(JSON.stringify(context.widgets, null, 2));
  }, [context.widgets]);

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
      console.error(e);
    }
  }

  return (
    <div className="w-full h-full" key="widget-editor">
      <Label htmlFor="widgets">Widgets</Label>
      <Textarea
        id="widgets"
        className="w-full h-full p-2 font-mono border"
        placeholder="Widgets"
        value={widgets}
        onChange={handleWidgetsChange}
      />
    </div>
  );
}