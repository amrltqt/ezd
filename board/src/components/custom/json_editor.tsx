import * as React from "react";

import { cn } from "@/lib/utils";

export interface JSONEditorProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const JSONEditor = React.forwardRef<HTMLTextAreaElement, JSONEditorProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono text-xs",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

JSONEditor.displayName = "JSONEditor";

export { JSONEditor };