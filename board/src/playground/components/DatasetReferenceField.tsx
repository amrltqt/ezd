import { Input } from "@/components/ui/input";
import { RefOrRows } from "@/widgets";
import { useState } from "react";

export function DatasetReferenceField({
  dataset,
  setDataset,
}: {
  dataset: RefOrRows;
  setDataset: (dataset: RefOrRows) => void;
}) {
  const [localValue, setLocalValue] = useState<string>(
    dataset.type === "ref" ? dataset.key : JSON.stringify(dataset.rows)
  );

  const handleRefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    setDataset({ type: "ref", key: e.target.value });
  };

  if (dataset.type === "ref") {
    return (
      <div className="flex items-center col-span-3 gap-2">
        <Input value={localValue} onChange={handleRefChange} />
      </div>
    );
  } else if (dataset.type === "rows") {
    return (
      <div className="flex items-center col-span-3 gap-2">
        <p>Rows: {dataset.rows.length}</p>
        <p>Unsupported editiong yet, use a ref</p>
      </div>
    );
  } else {
    return (
      <div className="flex items-center col-span-3 gap-2">
        <p>Unsupported editiong yet, use a ref</p>
      </div>
    );
  }
}
