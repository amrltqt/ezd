import { useState } from "react";
import WidgetEditor from "./components/WidgetEditor";
import { TreeActions } from "./components/TreeActions";
import { NodeModelWidget, useConvertedTree } from "./hooks/useConvertedTree";
import { WidgetTree } from "./tree/WidgetTree";
import { Switch } from "@/components/ui/switch";

export function TreeEditor() {
  const { widgetList, updateWidgets } = useConvertedTree();

  const handleDrop = (widgets: NodeModelWidget[]) => {
    updateWidgets(widgets);
  };

  const [jsonMode, setJsonMode] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between py-1 space-x-2">
        <h2>Widget Tree</h2>
        <TreeActions />
        <Switch checked={jsonMode} onCheckedChange={setJsonMode} />
      </div>

      {jsonMode && <WidgetEditor />}
      {!jsonMode && (
        <div className="flex flex-col">
          <WidgetTree widgetList={widgetList} handleDrop={handleDrop} />
        </div>
      )}
    </div>
  );
}
