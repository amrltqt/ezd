import React from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { TreeNodeRepr } from "./TreeNodeRepr";
import { NodeModelWidget } from "../hooks/useConvertedTree";
import { useDragOver } from "@minoru/react-dnd-treeview";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useRemoveWidget } from "../hooks/useRemoveWidget";

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
  const removeWidget = useRemoveWidget();

  const dragOverProps = useDragOver(node.id, isOpen, onToggle);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <div className="flex items-center w-full">
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </div>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => removeWidget(node.text)}>
          <TrashIcon className="w-4 h-4 mr-2" />
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
