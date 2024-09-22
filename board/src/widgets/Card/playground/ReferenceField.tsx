import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ReferenceField({
  label,
  variable,
  setVariable,
}: {
  label: string;
  variable: { type: "static" | "reference"; value: string };
  setVariable: (value: { type: "static" | "reference"; value: string }) => void;
}) {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariable({ type: variable.type, value: e.target.value });
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
          value={variable.value}
          onChange={handleValueChange}
        />

        <div className="flex flex-col items-end gap-1">
          <Label>
            {variable.type === "reference" ? "Reference" : "Static"}
          </Label>
          <Switch
            checked={variable.type === "reference"}
            onCheckedChange={(value) => {
              setVariable({
                type: value ? "reference" : "static",
                value: variable.value,
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
