import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RefOrStatic } from "@/widgets";

export function ReferenceField({
  label,
  variable,
  setVariable,
}: {
  label: string;
  variable: RefOrStatic<string>;
  setVariable: (value: RefOrStatic<string>) => void;
}) {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (variable.type === "ref") {
      setVariable({ type: "ref", key: newValue });
    } else {
      setVariable({ type: "static", value: newValue });
    }
  };

  return (
    <>
      <Label htmlFor="evolution" className="text-right">
        {label}
      </Label>
      <div className="flex items-center col-span-3 gap-2">
        <Input
          id={label}
          className="flex-grow"
          value={variable.type === "ref" ? variable.key : variable.value}
          onChange={handleValueChange}
        />

        <div className="flex flex-col items-end gap-1">
          <Label>{variable.type === "ref" ? "Reference" : "Static"}</Label>
          <Switch
            checked={variable.type === "ref"}
            onCheckedChange={(value) => {
              const newValue =
                variable.type === "ref" ? variable.key : variable.value;
              if (value) {
                setVariable({ type: "ref", key: newValue });
              } else {
                setVariable({ type: "static", value: newValue });
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
