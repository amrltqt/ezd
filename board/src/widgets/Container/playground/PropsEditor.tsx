import { useState } from "react";
import { Container, ContainerDirection, containerValidator } from "..";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnyWidget, WidgetType } from "@/widgets";

interface ContainerEditorProps {
  name: string;
  direction: ContainerDirection;
  widgets: AnyWidget[];
  insertWidget: (container: Container) => { type: string; message: string };
  setDialogOpen: (open: boolean) => void;
}

export function PropsEditor({
  name,
  direction,
  widgets = [],
  insertWidget,
  setDialogOpen,
}: ContainerEditorProps) {
  const [localName, setLocalName] = useState(name || "");
  const [localNameError, setLocalNameError] = useState<string>("");

  const [localDirection, setLocalDirection] = useState<ContainerDirection>(
    direction || ContainerDirection.Horizontal
  );
  const [localDirectionError, setLocalDirectionError] = useState<string | null>(
    null
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleDirectionChange = (value: string) => {
    setLocalDirection(value as ContainerDirection);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      type: WidgetType.Container,
      name: localName,
      direction: localDirection,
      widgets,
    });
    const { value, error } = containerValidator.validate({
      type: WidgetType.Container,
      name: localName,
      direction: localDirection,
      widgets,
    });

    if (error) {
      error.details.forEach((detail) => {
        if (detail.context?.key === "name") {
          setLocalNameError(detail.message);
        }
        if (detail.context?.key === "direction") {
          setLocalDirectionError(detail.message);
        }
      });
      return;
    } else {
      setLocalNameError("");
      setLocalDirectionError(null);

      const { type } = insertWidget(value);
      if (type === "success") {
        setLocalName("");
        setLocalDirection(ContainerDirection.Horizontal);
        setDialogOpen(false);
      } else {
        setLocalNameError("Widget with name already exists");
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <DialogHeader>
        <DialogTitle>Container</DialogTitle>
        <DialogDescription>Create or update your Container</DialogDescription>
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
          {localNameError && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {localNameError}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="direction" className="text-right">
            Direction
          </Label>
          <Select onValueChange={handleDirectionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={ContainerDirection.Horizontal} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ContainerDirection).map((dir) => (
                <SelectItem key={dir} value={dir}>
                  {dir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {localDirectionError && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {localDirectionError}
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
