import { useState } from "react";
import { Badge, BadgeColor, badgeValidator } from "..";
import { RefOrStatic, WidgetType } from "@/widgets";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputReferenceField } from "@/playground/components/InputReferenceField";

interface BadgeEditorProps {
  widget: Badge;
  insertWidget: (container: Badge) => { type: string; message: string };
  setDialogOpen: (open: boolean) => void;
}

interface BadgeEditorError {
  name: string | null;
  label: string | null;
  color: string | null;
}

export function PropsEditor({
  widget,
  setDialogOpen,
  insertWidget,
}: BadgeEditorProps) {
  const [errorForm, setErrorForm] = useState<BadgeEditorError>({
    name: null,
    label: null,
    color: null,
  });

  const [localName, setLocalName] = useState(widget.name || "");
  const [localLabel, setLocalLabel] = useState<RefOrStatic<string>>(
    typeof widget.label === "string"
      ? {
          type: "static",
          value: widget.label.toString() ?? "",
        }
      : {
          type: "ref",
          key: widget.label.key,
        }
  );
  const [localColor, setLocalColor] = useState<RefOrStatic<BadgeColor>>(
    typeof widget.color === "string"
      ? {
          type: "static",
          value: (widget.color as BadgeColor) || BadgeColor.Gray,
        }
      : {
          type: "ref",
          key: widget.color.key,
        }
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleColorChange = (color: BadgeColor) => {
    setLocalColor({
      type: "static" as const,
      value: color,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { value, error } = badgeValidator.validate({
      type: WidgetType.Badge,
      name: localName,
      label: localLabel.type === "static" ? localLabel.value : localLabel,
      color: localColor.type === "static" ? localColor.value : localColor,
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
      setLocalColor({
        type: "static" as const,
        value: BadgeColor.Gray,
      });
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
          <Label htmlFor="label" className="text-right">
            Label
          </Label>
          <InputReferenceField setVariable={setLocalLabel} value={localLabel} />
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
