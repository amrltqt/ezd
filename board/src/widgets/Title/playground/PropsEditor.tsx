import { useState } from "react";
import { Title, TitleAlign, titleValidator } from "..";
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

interface TitleEditorProps {
  widget: Title;
  insertWidget: (title: Title) => { type: string; message: string };
  setDialogOpen: (open: boolean) => void;
}

interface TitleEditorError {
  name: string | null;
  main: string | null;
  secondary: string | null;
  align: string | null;
}

export function PropsEditor({
  widget,
  setDialogOpen,
  insertWidget,
}: TitleEditorProps) {
  const [errorForm, setErrorForm] = useState<TitleEditorError>({
    name: null,
    main: null,
    secondary: null,
    align: null,
  });

  const [localName, setLocalName] = useState(widget.name || "");
  const [localMain, setLocalMain] = useState<RefOrStatic<string>>(
    typeof widget.main === "string" || typeof widget.main === "number"
      ? {
          type: "static",
          value: widget.main.toString() ?? "",
        }
      : widget.main
  );
  const [localSecondary, setLocalSecondary] = useState<RefOrStatic<string>>(
    typeof widget.secondary === "string" || typeof widget.secondary === "number"
      ? {
          type: "static",
          value: widget.secondary.toString() ?? "",
        }
      : widget.secondary
  );
  const [localAlign, setLocalAlign] = useState<TitleAlign>(
    widget.align || TitleAlign.Horizontal
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleAlignChange = (align: TitleAlign) => {
    setLocalAlign(align);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { value, error } = titleValidator.validate({
      type: WidgetType.Title,
      name: localName,
      main: localMain.type === "static" ? localMain.value : localMain,
      secondary:
        localSecondary.type === "static"
          ? localSecondary.value
          : localSecondary,
      align: localAlign,
    });
    if (error) {
      setErrorForm({
        name:
          error.details.find((d) => d.context?.key === "name")?.message || null,
        main:
          error.details.find((d) => d.context?.key === "main")?.message || null,
        secondary:
          error.details.find((d) => d.context?.key === "secondary")?.message ||
          null,
        align:
          error.details.find((d) => d.context?.key === "align")?.message ||
          null,
      });
      return;
    }

    setErrorForm({
      name: null,
      main: null,
      secondary: null,
      align: null,
    });

    const { type } = insertWidget(value);
    if (type === "success") {
      setLocalName("");
      setLocalMain({ type: "static", value: "" });
      setLocalSecondary({ type: "static", value: "" });
      setLocalAlign(TitleAlign.Horizontal);
      setDialogOpen(false);
    } else {
      setErrorForm({
        name: "Widget with name already exists",
        main: null,
        secondary: null,
        align: null,
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Create or update your Title</DialogDescription>
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
          <Label htmlFor="main" className="text-right">
            Main
          </Label>
          <InputReferenceField setVariable={setLocalMain} value={localMain} />
          {errorForm.main && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.main}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="secondary" className="text-right">
            Secondary
          </Label>
          <InputReferenceField
            setVariable={setLocalSecondary}
            value={localSecondary}
          />
          {errorForm.secondary && (
            <div className="col-span-3 col-start-2 text-sm text-red-500 ">
              {errorForm.secondary}
            </div>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="align" className="text-right">
            Align
          </Label>
          <Select onValueChange={handleAlignChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={TitleAlign.Horizontal} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TitleAlign).map((align) => (
                <SelectItem key={align} value={align}>
                  {align}
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
