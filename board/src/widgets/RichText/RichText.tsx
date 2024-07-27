import { RichText } from ".";
import ReactMarkdown from "react-markdown";
import { resolveString } from "../../hooks";

const regex = /\$[a-zA-Z_][a-zA-Z0-9_]*/g;

export function RichTextWidget({ text, data }: RichText) {
  const results = text.match(regex);

  if (results) {
    results.forEach((result) => {
      const variableName = result.substring(1);
      const variable = resolveString(
        {
          key: variableName,
          type: "ref",
        },
        data
      );
      text = text.replace(result, variable.toString());
    });
  }
  return (
    <div className="h-full p-2 overflow-hidden border">
      <ReactMarkdown className="prose">{text}</ReactMarkdown>
    </div>
  );
}
