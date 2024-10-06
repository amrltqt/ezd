import { useState } from "react";
import { CardDisplayPosition, Card, cardValidator } from "..";
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
import { RefOrStatic, WidgetType } from "@/widgets";
import { InputReferenceField } from "@/playground/components/InputReferenceField";

interface ContainerEditorProps {
  widget: Card;
  insertWidget: (card: Card) => { type: string; message: string };
  setDialogOpen: (open: boolean) => void;
}

export function PropsEditor({
  widget,
  insertWidget,
  setDialogOpen,
}: ContainerEditorProps) {
  const [errorForm, setErrorForm] = useState<{
    [key: string]: string;
  }>({});
  const [localName, setLocalName] = useState(widget.name || "");
  const [localValue, setLocalValue] = useState<RefOrStatic<string>>(
    typeof widget.value === "string" ||
      typeof widget.value === "number" ||
      widget.value === undefined
      ? {
          type: "static",
          value: widget.value.toString() || "",
        }
      : {
          type: "ref",
          key: widget.value.key,
        }
  );
  const [localLabel, setLocalLabel] = useState(widget.label || "");
  const [localAlign, setLocalAlign] = useState(widget.align || "left");
  const [localReference, setLocalReference] = useState<RefOrStatic<string>>(
    typeof widget.reference === "string" ||
      typeof widget.reference === "number" ||
      widget.reference === undefined
      ? {
          type: "static",
          value: widget.reference?.toString() ?? "",
        }
      : {
          type: "ref",
          key: widget.reference?.key ?? "",
        }
  );
  const [localEvolution, setLocalEvolution] = useState<RefOrStatic<string>>(
    typeof widget.evolution === "string" ||
      typeof widget.evolution === "number" ||
      widget.evolution === undefined
      ? {
          type: "static",
          value: widget.evolution?.toString() ?? "",
        }
      : {
          type: "ref",
          key: widget.evolution?.key ?? "",
        }
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLabel(e.target.value);
  };

  const handleAlignChange = (value: string) => {
    setLocalAlign(value as "left" | "right" | "center");
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value, error } = cardValidator.validate({
      type: WidgetType.Card,
      name: localName,
      value: localValue.type === "static" ? localValue.value : localValue,
      label: localLabel,
      align: localAlign,
      reference:
        localReference.type === "static"
          ? localReference.value
          : localReference,
      evolution:
        localEvolution.type === "static"
          ? localEvolution.value
          : localEvolution,
    });

    console.log(value, error);

    if (error) {
      const errors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        if (detail.context?.key === "name") {
          errors.name = detail.message;
        }
        if (detail.context?.key === "value") {
          errors.value = detail.message;
        }
        if (detail.context?.key === "label") {
          errors.label = detail.message;
        }
        if (detail.context?.key === "align") {
          errors.align = detail.message;
        }
        if (detail.context?.key === "reference") {
          errors.reference = detail.message;
        }
        if (detail.context?.key === "evolution") {
          errors.evolution = detail.message;
        }
      });
      setErrorForm(errors);
      return;
    } else {
      setErrorForm({});
      const { type } = insertWidget(value);
      if (type === "success") {
        setLocalName("");
        setLocalValue({ type: "static", value: "" });
        setLocalLabel("");
        setLocalAlign("left");
        setLocalReference({ type: "static", value: "" });
        setLocalEvolution({ type: "static", value: "" });

        setDialogOpen(false);
      } else {
        setErrorForm({ name: "Widget with name already exists" });
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
          <Input
            id="label"
            value={localLabel}
            onChange={handleLabelChange}
            className="col-span-3"
          />
          {errorForm.label && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.label}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="evolution" className="text-right">
            Value
          </Label>
          <InputReferenceField value={localValue} setVariable={setLocalValue} />
          {errorForm.value && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.value}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="direction" className="text-right">
            Alignment
          </Label>
          <Select onValueChange={handleAlignChange}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={CardDisplayPosition.Left} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CardDisplayPosition).map((dir) => (
                <SelectItem key={dir} value={dir}>
                  {dir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorForm.align && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.align}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="reference" className="text-right">
            Reference
          </Label>
          <InputReferenceField
            value={localReference}
            setVariable={setLocalReference}
          />

          {errorForm.reference && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.reference}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="evolution" className="text-right">
            Evolution
          </Label>
          <InputReferenceField
            value={localEvolution}
            setVariable={setLocalEvolution}
          />
          {errorForm.evolution && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.evolution}
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
