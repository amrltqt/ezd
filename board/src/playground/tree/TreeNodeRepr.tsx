import { Widget } from "@/core";
import { WIDGET_INFO_BY_ID } from "@/widgets";

interface TreeNodeReprProps {
  widget: Widget;
}

export function TreeNodeRepr({ widget }: TreeNodeReprProps) {
  const definition = WIDGET_INFO_BY_ID[widget.type];
  if (!definition) {
    return null;
  }

  return (
    <div className="inline-flex items-center space-x-2">
      <definition.icon className="w-4 h-4" />
      <span>{widget.name}</span>
    </div>
  );
}
