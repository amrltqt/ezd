import { WIDGET_INFO_BY_ID } from "@/widgets";

interface TreeNodeReprProps {
  type: string;
}

export function TreeNodeRepr({ type }: TreeNodeReprProps) {
  const definition = WIDGET_INFO_BY_ID[type];
  return (
    <div className="inline-flex items-center space-x-2">
      <definition.icon className="w-4 h-4" />
      <span>{definition.name}</span>
    </div>
  );
}
