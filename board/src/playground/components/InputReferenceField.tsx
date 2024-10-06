import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RefOrStatic } from "@/widgets";
import { useState } from "react";

interface InputReferenceFieldProps {
  value: RefOrStatic<string>;
  setVariable: (value: RefOrStatic<string>) => void;
}

export function InputReferenceField({
  value,
  setVariable,
}: InputReferenceFieldProps) {
  const [localValue, setLocalValue] = useState(
    value.type === "ref" ? value.key : value.value
  );
  const [isRef, setIsRef] = useState(value.type === "ref");

  const handleSwitchChange = (checked: boolean) => {
    setIsRef(checked);
    if (checked) {
      setVariable({ type: "ref", key: localValue });
    } else {
      setVariable({ type: "static", value: localValue });
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (isRef) {
      setVariable({ type: "ref", key: newValue });
    } else {
      setVariable({ type: "static", value: newValue });
    }
  };

  return (
    <div className="flex items-center col-span-3 gap-2">
      <Input
        className="flex-grow"
        value={localValue}
        onChange={handleValueChange}
      />
      <div className="flex items-center gap-2">
        <Switch checked={isRef} onCheckedChange={handleSwitchChange} />
        <span className="text-sm text-gray-500">Ref</span>
      </div>
    </div>
  );
}
