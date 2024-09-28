import {
  DndProvider,
  getBackendOptions,
  MultiBackend,
  Tree,
} from "@minoru/react-dnd-treeview";
import { NodeModelWidget } from "../hooks/useConvertedTree";
import { CustomDragPreview } from "./CustomDragPreview";
import { Placeholder } from "./Placeholder";
import { TreeNode } from "./TreeNode";

interface WidgetTreeProps {
  widgetList: NodeModelWidget[];
  handleDrop: (tree: NodeModelWidget[]) => void;
}

export const WidgetTree = ({ widgetList, handleDrop }: WidgetTreeProps) => {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={widgetList}
        rootId={0}
        onDrop={handleDrop}
        initialOpen={true}
        dragPreviewRender={(monitorProps) => (
          <CustomDragPreview monitorProps={monitorProps} />
        )}
        classes={{
          root: "border",
          draggingSource: "styles.draggingSource",
          placeholder: "",
        }}
        sort={false}
        insertDroppableFirst={false}
        canDrop={(_, { dragSource, dropTargetId }) => {
          if (dragSource?.parent === dropTargetId) {
            return true;
          }
        }}
        dropTargetOffset={10}
        placeholderRender={(node, { depth }) => (
          <Placeholder node={node} depth={depth} />
        )}
        render={(node, { depth, isOpen, onToggle }) => (
          <TreeNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        )}
      />
    </DndProvider>
  );
};
