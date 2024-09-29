import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const removeWidget = useRemoveWidget();

  const dragOverProps = useDragOver(node.id, isOpen, onToggle);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="flex items-center justify-between p-2 border cursor-grab"
            style={{ paddingLeft: 8 + depth * 16 }}
            {...dragOverProps}
          >
            {node.droppable && (
              <div
                onClick={onToggle}
                className="flex items-center cursor-pointer "
              >
                {node.data && <TreeNodeRepr widget={node.data} />}
                {isOpen ? (
                  <ChevronDownIcon className="w-4 h-4" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4" />
                )}
              </div>
            )}
            {!node.droppable && (
              <div className="flex-grow">
                {node.data && <TreeNodeRepr widget={node.data} />}
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <DialogTrigger asChild>
            <ContextMenuItem>
              <div className="flex items-center w-full">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </div>
            </ContextMenuItem>
          </DialogTrigger>

          <ContextMenuItem onSelect={() => removeWidget(node.text)}>
            <TrashIcon className="w-4 h-4 mr-2" />
            Remove
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DialogPortal>
        <DialogContent>
          <h1>Hello</h1>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
