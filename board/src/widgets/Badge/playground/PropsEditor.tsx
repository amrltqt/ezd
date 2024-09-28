import { useState } from "react";
import { Badge, BadgeColor, badgeValidator } from "..";
import { WidgetType } from "@/widgets";
import { Button } from "@/components/ui/button";
import { ReferenceField } from "@/playground/components/ReferenceField";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BadgeEditorProps {
  name: string;
  label: {
    type: "static" | "reference";
    value: string;
  };
  color: string;
  insertWidget: (container: Badge) => { type: string; message: string };
  setDialogOpen: (open: boolean) => void;
}

interface BadgeEditorError {
  name: string | null;
  label: string | null;
  color: string | null;
}

export function PropsEditor({
  name,
  label,
  color,
  setDialogOpen,
  insertWidget,
}: BadgeEditorProps) {
  const [errorForm, setErrorForm] = useState<BadgeEditorError>({
    name: null,
    label: null,
    color: null,
  });

  const [localName, setLocalName] = useState(name || "");
  const [localLabel, setLocalLabel] = useState<{
    type: "static" | "reference";
    value: string;
  }>(
    label || {
      type: "static",
      value: "",
    }
  );
  const [localColor, setLocalColor] = useState(color || BadgeColor.Gray);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleColorChange = (color: BadgeColor) => {
    setLocalColor(color as BadgeColor);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { value, error } = badgeValidator.validate({
      type: WidgetType.Badge,
      name: localName,
      label: localLabel,
      color: localColor,
    });

    if (error) {
      setErrorForm({
        label:
          error.details.find((d) => d.context?.key === "label")?.message ||
          null,
        color:
          error.details.find((d) => d.context?.key === "color")?.message ||
          null,
        name:
          error.details.find((d) => d.context?.key === "name")?.message || null,
      });
      return;
    }

    setErrorForm({
      name: null,
      label: null,
      color: null,
    });

    const { type } = insertWidget(value);
    if (type === "success") {
      setLocalName("");
      setLocalLabel({ type: "static", value: "" });
      setLocalColor(BadgeColor.Gray);
      setDialogOpen(false);
    } else {
      setErrorForm({
        label: null,
        name: "Widget with name already exists",
        color: null,
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <DialogHeader>
        <DialogTitle>Badge</DialogTitle>
        <DialogDescription>Create or update your Badge</DialogDescription>
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
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.name}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <ReferenceField
            label="Label"
            setVariable={setLocalLabel}
            variable={localLabel}
          />
          {errorForm.label && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.label}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="label" className="text-right">
            Color
          </Label>
          <Select onValueChange={handleColorChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={BadgeColor.Gray} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(BadgeColor).map((dir) => (
                <SelectItem key={dir} value={dir}>
                  {dir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorForm.color && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.color}
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
