import { BoardContext, BoardContextData } from "@/BoardContext";
import { Widget } from "@/core";
import { WidgetType } from "@/widgets";
import { Container } from "@/widgets/Container";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { useCallback, useContext } from "react";

export type NodeModelWidget = NodeModel<Widget>;
type ParentId = number | string;

function flattenForTreeView(
  widgets: Widget[],
  parent: ParentId = 0
): NodeModelWidget[] {
  let idCounter = 1; // used for root
  function traverse(widget: Widget, parent: ParentId): NodeModelWidget[] {
    const widgetWithId: NodeModelWidget = {
      parent,
      id: idCounter++,
      text: widget.name,
      droppable: widget.type === WidgetType.Container,
      data: widget,
    };
    let children: NodeModelWidget[] = [];
    if (widget.type === WidgetType.Container) {
      const container = widget as Container;
      children = container.widgets.flatMap((child) =>
        traverse(child, widgetWithId.id)
      );
    }

    return [widgetWithId, ...children];
  }

  return widgets.flatMap((widget) => {
    return traverse(widget, parent);
  });
}

// recreate the full tree from the list of parent
function updateWidgetTree(widgets: NodeModelWidget[]): Widget[] {
  // Group widgets by parent
  const parentMap = widgets.reduce<Map<number | string, NodeModelWidget[]>>(
    (acc, widget) => {
      const parentId = widget.parent;
      if (!acc.has(parentId)) {
        acc.set(parentId, []);
      }
      acc.get(parentId)?.push(widget);
      return acc;
    },
    new Map()
  );
  // recreate the tree from the root
  const root = parentMap.get(0);
  if (!root) {
    return [];
  }

  function traverse(widget: NodeModelWidget): Widget {
    const children = parentMap.get(widget.id);
    if (children) {
      const container: Container = {
        ...(widget.data as Container),
        widgets: children.map(traverse),
      };
      return container;
    } else {
      if (widget.data) {
        return widget.data;
      } else {
        throw new Error("Widget data is missing");
      }
    }
  }

  return root.map(traverse);
}

export function useConvertedTree() {
  const { widgets, setWidgets } = useContext<BoardContextData>(BoardContext);

  const widgetList = flattenForTreeView(widgets);

  const updateWidgets = useCallback(
    (widgets: NodeModelWidget[]) => {
      const newWidgets = updateWidgetTree(widgets);
      setWidgets(newWidgets);
    },
    [setWidgets]
  );

  return { widgetList, updateWidgets };
}
