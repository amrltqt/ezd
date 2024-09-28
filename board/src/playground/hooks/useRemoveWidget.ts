import { useContext, useCallback } from "react";
import { BoardContext } from "@/BoardContext";
import { Widget } from "@/core";
import { WidgetType } from "@/widgets";
import { Container } from "@/widgets/Container";

export function useRemoveWidget() {
  const { widgets, setWidgets } = useContext(BoardContext);

  const removeWidget = useCallback(
    (widgetName: string) => {
      const removeWidgetRecursively = (widgets: Widget[]): Widget[] => {
        return widgets.reduce((acc: Widget[], widget: Widget) => {
          if (widget.name === widgetName) {
            return acc; // Skip this widget (remove it)
          }
          if (widget.type === WidgetType.Container) {
            const container = widget as Container;

            return [
              ...acc,
              {
                ...widget,
                widgets: removeWidgetRecursively(container.widgets),
              },
            ];
          }
          return [...acc, widget];
        }, []);
      };

      const updatedWidgets = removeWidgetRecursively(widgets);
      console.log(updatedWidgets);
      setWidgets(updatedWidgets);
    },
    [widgets, setWidgets]
  );

  return removeWidget;
}
