import { Children } from "react"

export const KeyboardHint = ({ keys }: { keys: string[] }) => {
    return <div className="flex flex-row bold text-zinc-200 gap-1">
        {keys.map(key => {
            return <div key={key} className="border border-subtle rounded-md text-sm bold text-zinc-300 p-1.5">{key}</div>
        })}
    </div>
}