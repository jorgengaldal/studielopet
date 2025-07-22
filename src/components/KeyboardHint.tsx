import { Children } from "react";

export const KeyboardHint = ({ keys }: { keys: string[] }) => {
  return (
    <span className="inline-flex flex-row bold text-zinc-200 gap-1 ml-auto">
      {keys.map((key) => {
        return (
          <span
            key={key}
            className="border border-subtle rounded-md text-sm bold text-zinc-300 p-1.5"
          >
            {key}
          </span>
        );
      })}
    </span>
  );
};
