import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogPortal,
} from "@/components/ui/dialog";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { WIDGET_INFO } from "@/widgets";
import { Popover } from "@radix-ui/react-popover";
import useInsertWidget from "../hooks/useInsertWidget";
import { RefAttributes, useState } from "react";
import { LucideProps } from "lucide-react";

export function TreeActions() {
  const insertWidget = useInsertWidget();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<{
    id: string;
    name: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    propsEditor: null;
  } | null>(null);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Add Widget</Button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={5}
          align="start"
          className="grid grid-cols-2"
        >
          {WIDGET_INFO.map((widget) => (
            <DialogTrigger key={widget.id} asChild>
              <Button
                variant="ghost"
                className="inline-flex justify-start gap-2"
                onClick={() => {
                  setSelectedForm(widget);
                }}
              >
                <widget.icon className="w-5 h-5" />
                <span>{widget.name}</span>
              </Button>
            </DialogTrigger>
          ))}
        </PopoverContent>
      </Popover>
      <DialogPortal>
        <DialogContent>
          {selectedForm && selectedForm.propsEditor && (
            <selectedForm.propsEditor
              {...{
                insertWidget,
                setDialogOpen,
              }}
            />
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
