import { BoardContext, BoardContextData } from "@/BoardContext";
import { AnyWidget, WIDGET_INFO, WidgetType } from "@/widgets";
import { Container, ContainerDirection } from "@/widgets/Container";
import React, { useContext, useState } from "react";
import WidgetEditor from "./components/WidgetEditor";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FlipHorizontal2Icon,
  FlipVertical2Icon,
  LucideProps,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";

import { TreeActions } from "./components/TreeActions";

function TreeNodeRepr({
  definition,
}: {
  definition: {
    id: string;
    name: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  };
}) {
  return (
    <div className="inline-flex items-center space-x-2">
      <definition.icon className="w-4 h-4" />
      <span>{definition.name}</span>
    </div>
  );
}

function ContainerTreeNode({
  container,
  level,
}: {
  container: Container;
  level: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const padding = 8 + level * 16;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="flex items-center p-1 py-2 pr-2 space-x-1 border cursor-pointer hover:bg-zinc-100"
            onClick={handleToggle}
            style={{
              paddingLeft: padding,
            }}
          >
            <div className="inline-flex items-center space-x-2">
              {container.direction === ContainerDirection.Horizontal ? (
                <FlipHorizontal2Icon className="w-4 h-4" />
              ) : (
                <FlipVertical2Icon className="w-4 h-4" />
              )}
              <span>Container</span>
            </div>
            <div className="flex-grow"></div>
            {container.widgets.length > 0 ? (
              isExpanded ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )
            ) : null}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Name: {container.name}</ContextMenuItem>
          <ContextMenuItem className="inline-flex items-center w-full space-x-2 hover:bg-destructive hover:text-destructive-foreground">
            <PlusIcon className="w-4 h-4" />
            <span>Add Widget</span>
          </ContextMenuItem>{" "}
          <ContextMenuItem className="inline-flex items-center w-full space-x-2 hover:bg-destructive hover:text-destructive-foreground">
            <Trash2Icon className="w-4 h-4" />
            <span>Remove</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="">
        {isExpanded &&
          container.widgets.map((child) => (
            <TreeNode key={child.name} node={child} level={level + 1} />
          ))}
      </div>
    </div>
  );
}

function TreeNode({ node, level = 0 }: { node: AnyWidget; level: number }) {
  if (node.type.toLowerCase() === WidgetType.Container) {
    return <ContainerTreeNode container={node as Container} level={level} />;
  }

  const padding = 8 + level * 16;
  const widgetDefinition = WIDGET_INFO.find((w) => w.id === node.type);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="flex p-1 py-2 border cursor-pointer hover:bg-zinc-100"
          style={{
            paddingLeft: padding,
          }}
        >
          <div className="flex-grow">
            {widgetDefinition && <TreeNodeRepr definition={widgetDefinition} />}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Name: {node.name}</ContextMenuItem>

        <ContextMenuItem className="inline-flex items-center w-full space-x-2 hover:bg-destructive hover:text-destructive-foreground">
          <Trash2Icon className="w-4 h-4" />
          <span>Remove</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function TreeEditor() {
  const { widgets } = useContext<BoardContextData>(BoardContext);
  const [jsonMode] = useState(false);

  if (jsonMode) {
    return <WidgetEditor />;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between py-1 space-x-2">
        <h2>Widget Tree</h2>
        <TreeActions />
      </div>
      <div className="flex flex-col">
        {widgets.map((widget) => (
          <TreeNode key={widget.name} node={widget} level={0} />
        ))}
      </div>
    </div>
  );
}
