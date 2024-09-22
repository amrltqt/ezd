import { BoardContext } from "@/BoardContext";
import { AnyWidget } from "@/widgets";
import { useCallback, useContext } from "react";

export default function useInsertWidget() {
  const { widgets, setWidgets } = useContext(BoardContext);
  const insertWidget = useCallback(
    (widget: AnyWidget) => {
      // Check if name of the widget is already present
      const existingWidget = widgets.find(
        (w) =>
          w.name.toLocaleLowerCase().trim() ===
          widget.name.toLocaleLowerCase().trim()
      );
      if (existingWidget) {
        return {
          type: "error",
          message: "Widget with name already exists",
        };
      }
      setWidgets([...widgets, widget]);

      return {
        type: "success",
        message: "Widget added successfully",
      };
    },
    [widgets, setWidgets]
  );
  return insertWidget;
}
