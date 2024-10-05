import { useEffect, useRef, useState } from "react";
import { fetchClasses } from "../utils/hkdirApi";
import type { Class } from "../types";
import { getUniqueObjectByPredicate } from "../utils/object";
import { KeyboardHint } from "./KeyboardHint";

const LIST_LENGTH = 10

export const SearchBar = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [shownClasses, setShownClasses] = useState<Class[]>([]);
    const [showList, setShowList] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        fetchClasses().then((classes) => {
            const allClasses = getUniqueObjectByPredicate(
                classes,
                (classs) => classs.classCode
            );

            setClasses(allClasses);
            setShownClasses(allClasses.slice(0, LIST_LENGTH));
        });
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            console.log(e.key)
            const focused: boolean = document.activeElement == inputRef.current
            if (e.ctrlKey && e.key == "k") {
                e.preventDefault()
                inputRef.current?.focus()
            } else if (e.key == "Escape" && focused) {
                inputRef.current?.blur()
            }
        })
    })

    const handleTyping = (e: any) => {
        const searchWord = e.target.value;
        setShownClasses(
            classes.filter((classs) => {
                return (
                    classs.classCode.toLowerCase().startsWith(searchWord.toLowerCase()) ||
                    classs.className.toLowerCase().startsWith(searchWord.toLowerCase())
                );
            })
                .slice(0, LIST_LENGTH)
        );
    };

    return (
        <div className="flex flex-col justify-center divide-y gap-1 divide-accent">

            <div className="relative w-full">
                <div className="absolute inset-y-3 px-2">
                    {/* Search icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <div className="absolute inset-y-2  px-2 ml-auto right-0">
                    <KeyboardHint keys={["Ctrl", "K"]} />
                </div>
                <input
                    ref={inputRef}
                    className="transition-all ease-out duration-300 w-full bg-dark outline-none p-2 pl-10 pe-12 rounded-[1.5em] focus:rounded-b-sm focus:rounded-t-xl"
                    type="text"
                    onChange={handleTyping}

                    placeholder="Søk etter et fag"
                    onBlur={(e) => {
                        // Sets timeout to ensure the link is clicked before it disappears
                        setTimeout(() => setShowList(false), 100)
                    }}
                    onFocus={(e) => {
                        setShowList(true);
                    }}
                />


            </div>

            {showList &&
                <div className="relative w-full h-0">
                    <div className="w-full absolute z-10 bg-dark flex flex-col divide-y shadow-lg shadow-black p-2 ">
                        {shownClasses.length ?

                            shownClasses.map((object, index) => {
                                return (
                                    <a
                                        className="block"
                                        key={index}
                                        href={"/" + object.classCode.slice(0, -2)}
                                    >
                                        {object.className} ({object.classCode.slice(0, -2)})
                                    </a>
                                );
                            })
                            : <p><i>Ingen fag stemmer med søket</i></p>}
                    </div>
                </div>}
        </div>
    );
};