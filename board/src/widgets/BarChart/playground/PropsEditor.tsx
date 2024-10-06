import { useState } from "react";
import { BarChart, YAxis } from "..";
import { RefOrRows, WidgetType } from "@/widgets";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatasetReferenceField } from "@/playground/components/DatasetReferenceField";

interface BarChartEditorProps {
  widget: BarChart;
  insertWidget: (container: BarChart) => { type: string; message: string };
  setDialogOpen: (open: boolean) => void;
}

interface BarChartEditorError {
  name: string | null;
  title: string | null;
  dataset: string | null;
  xaxis: string | null;
  yaxis: string | null;
}

export function PropsEditor({
  widget,
  setDialogOpen,
  insertWidget,
}: BarChartEditorProps) {
  const [errorForm, setErrorForm] = useState<BarChartEditorError>({
    name: null,
    title: null,
    dataset: null,
    xaxis: null,
    yaxis: null,
  });

  const [localName, setLocalName] = useState(widget.name || "");
  const [localTitle, setLocalTitle] = useState(widget.title || "");
  const [localDataset, setLocalDataset] = useState<RefOrRows>(
    widget.dataset.type === "ref"
      ? {
          type: "ref",
          key: widget.dataset.key,
        }
      : {
          type: "rows",
          rows: [],
        }
  );
  const [localXAxis, setLocalXAxis] = useState(widget.xaxis || "");
  const [localYAxis, setLocalYAxis] = useState<YAxis[]>(widget.yaxis || []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  const handleXAxisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalXAxis(e.target.value);
  };

  const handleYAxisChange = (
    index: number,
    field: keyof YAxis,
    value: string
  ) => {
    const updatedYAxis = [...localYAxis];
    updatedYAxis[index] = { ...updatedYAxis[index], [field]: value };
    setLocalYAxis(updatedYAxis);
  };

  const addYAxis = () => {
    setLocalYAxis([...localYAxis, { name: "", color: "" }]);
  };

  const removeYAxis = (index: number) => {
    const updatedYAxis = localYAxis.filter((_, i) => i !== index);
    setLocalYAxis(updatedYAxis);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation logic here (using barChartValidator)

    const newBarChart: BarChart = {
      type: WidgetType.BarChart,
      name: localName,
      title: localTitle,
      dataset: localDataset,
      xaxis: localXAxis,
      yaxis: localYAxis,
      data: {},
    };

    const { type } = insertWidget(newBarChart);
    if (type === "success") {
      setDialogOpen(false);
    } else {
      setErrorForm({
        ...errorForm,
        name: "Widget with name already exists",
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <DialogHeader>
        <DialogTitle>Bar Chart</DialogTitle>
        <DialogDescription>Create or update your Bar Chart</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={localName}
            onChange={handleNameChange}
            className="col-span-3"
          />
          {errorForm.name && (
            <div className="col-span-3 col-start-2 text-sm text-red-500">
              {errorForm.name}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={localTitle}
            onChange={handleTitleChange}
            className="col-span-3"
          />
          {errorForm.title && (
            <div className="col-span-3 col-start-2 text-sm text-red-500">
              {errorForm.title}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="dataset" className="text-right">
            Dataset
          </Label>
          <DatasetReferenceField
            dataset={localDataset}
            setDataset={setLocalDataset}
          />
          {errorForm.dataset && (
            <div className="col-span-3 col-start-2 text-sm text-red-500">
              {errorForm.dataset}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="xaxis" className="text-right">
            X Axis
          </Label>
          <Input
            id="xaxis"
            value={localXAxis}
            onChange={handleXAxisChange}
            className="col-span-3"
          />
          {errorForm.xaxis && (
            <div className="col-span-3 col-start-2 text-sm text-red-500">
              {errorForm.xaxis}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label className="text-right">Y Axis</Label>
          <div className="col-span-3">
            {localYAxis.map((axis, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  value={axis.name}
                  onChange={(e) =>
                    handleYAxisChange(index, "name", e.target.value)
                  }
                  placeholder="Name"
                />
                <Input
                  value={axis.color}
                  onChange={(e) =>
                    handleYAxisChange(index, "color", e.target.value)
                  }
                  placeholder="Color"
                />
                <Button
                  type="button"
                  onClick={() => removeYAxis(index)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addYAxis} variant="secondary">
              Add Y Axis
            </Button>
          </div>
          {errorForm.yaxis && (
            <div className="col-span-3 col-start-2 text-sm text-red-500">
              {errorForm.yaxis}
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
