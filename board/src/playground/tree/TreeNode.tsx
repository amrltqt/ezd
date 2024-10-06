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
import { useRemoveWidget } from "../hooks/useRemoveWidget";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WIDGET_INFO_BY_ID } from "@/widgets";

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

  if (!node.data) return null;

  const selectedForm = WIDGET_INFO_BY_ID[node.data.type];

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div
        className="flex items-center justify-between p-2 border cursor-grab"
        style={{ paddingLeft: 8 + depth * 16 }}
        {...dragOverProps}
      >
        {node.droppable && (
          <div
            onClick={onToggle}
            className="flex items-center flex-grow cursor-pointer "
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
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" onClick={() => setDialogOpen(true)}>
            <PencilIcon className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => removeWidget(node.id)}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>

      <DialogPortal>
        <DialogTitle>Edit widget properties</DialogTitle>
        <DialogDescription>Edit widget properties</DialogDescription>
        <DialogContent>
          {selectedForm && selectedForm.propsEditor && (
            <selectedForm.propsEditor
              {...{
                setDialogOpen,
                widget: node.data,
              }}
            />
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
