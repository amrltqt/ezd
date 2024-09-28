import React from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { TreeNodeRepr } from "./TreeNodeRepr";
import { NodeModelWidget } from "../hooks/useConvertedTree";
import { useDragOver } from "@minoru/react-dnd-treeview";

interface TreeNodeProps {
  node: NodeModelWidget;
  depth: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  depth,
  isOpen,
  onToggle,
}) => {
  const dragOverProps = useDragOver(node.id, isOpen, onToggle);

  return (
    <div
      className="flex items-center justify-between p-2 border"
      style={{ paddingLeft: 8 + depth * 16 }}
      {...dragOverProps}
    >
      <div className="flex-grow">
        <TreeNodeRepr type={node.data?.type || "container"} />
      </div>
      {node.text}
      {node.droppable && (
        <span onClick={onToggle} className="cursor-pointer">
          {isOpen ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </span>
      )}
    </div>
  );
};
