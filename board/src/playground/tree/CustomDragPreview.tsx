import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";

import { TreeNodeRepr } from "./TreeNodeRepr";
import { Widget } from "@/core";

type Props = {
  monitorProps: DragLayerMonitorProps<Widget>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div className="flex items-center gap-2 p-2 bg-white border rounded border-primary w-fit">
      <TreeNodeRepr type={item.data?.type || "container"} />
      <div className="">{item.data?.name}</div>
    </div>
  );
};
