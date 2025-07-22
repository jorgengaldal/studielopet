import { useEffect, useRef, useState } from "react";
import { fetchCourses } from "../utils/hkdirApi";
import { getUniqueObjectByPredicate } from "../utils/object";
import { KeyboardHint } from "./KeyboardHint";
import { constrainNumber } from "../utils/number";
import { type Course } from "../types";

function getSanitizedCourseName(course: Course) {
  return course.courseCode.slice(0, -2);
}

const LIST_LENGTH = 10;

interface Props {
  className?: string;
}

export const SearchBar = ({ className }: Props) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [shownCourses, setShownCourses] = useState<Course[]>([]);
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);

  useEffect(() => {
    fetchCourses().then((courses) => {
      const allCourses = getUniqueObjectByPredicate(
        courses,
        (course) => course.courseCode
      );

      setCourses(allCourses);
      setShownCourses(allCourses.slice(0, LIST_LENGTH));
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key);
      const focused: boolean = document.activeElement == inputRef.current;
      if (event.ctrlKey && event.key == "k" && !focused) {
        event.preventDefault();
        inputRef.current?.focus();
      } else if (event.key == "Escape" && focused) {
        inputRef.current?.blur();
      } else if (event.key == "ArrowUp" && focused) {
        setSelectedSearchIndex(
          (prev) => (prev + shownCourses.length - 1) % shownCourses.length
        );
      } else if (event.key == "ArrowDown" && focused) {
        setSelectedSearchIndex((prev) => (prev + 1) % shownCourses.length);
      } else if (event.key == "Enter" && focused) {
        document.location.assign(
          `/course/${getSanitizedCourseName(shownCourses[selectedSearchIndex])}`
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shownCourses, selectedSearchIndex, inputRef]);

  const handleTyping = (e: any) => {
    const searchWord = e.target.value;

    setShowList(searchWord.length > 0);

    const nextShownCourse = courses
      .filter((course) => {
        return (
          course.courseCode
            .toLowerCase()
            .startsWith(searchWord.toLowerCase()) ||
          course.courseName.toLowerCase().startsWith(searchWord.toLowerCase())
        );
      })
      .slice(0, LIST_LENGTH);

    setSelectedSearchIndex((prev) =>
      constrainNumber(prev, 0, nextShownCourse.length - 1)
    );

    setShownCourses(nextShownCourse);

    console.log(selectedSearchIndex);
  };

  return (
    <div
      style={{ viewTransitionName: "searchbar" }}
      className={
        "flex flex-col justify-center divide-y gap-1 divide-accent " +
        (className ?? "")
      }
    >
      <div className="relative w-full">
        <div className="absolute inset-y-3 px-2">
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
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
            setTimeout(() => setShowList(false), 100);
          }}
        />
      </div>

      {showList && (
        <div className="relative w-full h-0">
          <div className="w-full absolute z-10 bg-dark flex flex-col divide-y shadow-lg shadow-black p-2 ">
            {shownCourses.length ? (
              shownCourses.map((object, index) => {
                const isPreSelected = selectedSearchIndex == index;

                return (
                  <a
                    className={`flex flex-row ${isPreSelected ? "text-accentMuted" : ""}`}
                    key={index}
                    href={"/course/" + getSanitizedCourseName(object)}
                  >
                    {object.courseName} ({getSanitizedCourseName(object)})
                    {isPreSelected && <KeyboardHint keys={["⏎"]} />}
                  </a>
                );
              })
            ) : (
              <p>
                <i>Ingen fag stemmer med søket</i>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
