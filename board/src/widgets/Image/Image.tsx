import { Image } from ".";
import { resolveString } from "../../hooks";

export function ImageWidget({ url, data }: Image) {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-hidden">
      <img src={resolveString(url, data).toString()} />
    </div>
  );
}
