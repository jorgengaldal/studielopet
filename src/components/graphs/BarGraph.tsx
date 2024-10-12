import { wholeNumberRange } from "../../utils/number";
import type { BarGraphData } from "../../types";
import BarGroup from "./BarGroup.astro";
import Link from "../Link.astro";

export function BarGraph({ data, seriesConfig }: BarGraphData) {


  let maxValueBeforeCorrection = Math.max(
    ...data.map((dataPoints) =>
      Math.max(...dataPoints.bars.map((bar) => bar.value))
    )
  );

  const MAX_VALUE_DIVISABILITY_THRESHOLD = 5;

  // Correction to make sure we at least have a somewhat pretty number of guidelines
  while (maxValueBeforeCorrection % MAX_VALUE_DIVISABILITY_THRESHOLD)
    maxValueBeforeCorrection++;
  const maxValue = maxValueBeforeCorrection;

  const Y_AXIS_GUIDELINES_TARGET = 10;

  const ANONYMIZE_THRESHOLD = 3

  return <div className="flex flex-col static w-full h-full">
    <div
      className="flex flex-row justify-around gap-1 bg-white w-full aspect-video text-black pt-5 px-8 pb-10"
    >
      <div className="flex flex-col gap-5 h-full w-full">
        <div className="flex flex-row gap-3 justify-end">
          {
            seriesConfig?.map(({ label, color }) => {
              return (
                <span
                  className="rounded-full px-2 text-white"
                  style={`background-color: ${color}`}
                >
                  {label}
                </span>
              );
            })
          }
        </div>
        <div
          className="relative flex flex-row justify-around gap-6 w-auto h-full border-l-2 border-b-2 border-black bg-white aspect-video text-black px-5 ml-8 my-2"
        >
          <div
            className="absolute flex flex-col justify-between h-[104%] self-center -left-8"
          >
            {
              wholeNumberRange(maxValue, Y_AXIS_GUIDELINES_TARGET)
                .reverse()
                .map((num) => {
                  return <p className="text-sm font-bold text-end">{num}</p>;
                })
            }
          </div>
          <!-- Horizontal lines -->
          <div className="absolute h-full w-full flex flex-col justify-between">
            {
              wholeNumberRange(maxValue, Y_AXIS_GUIDELINES_TARGET).map((num) => {
                return <div className="bg-slate-300 w-full h-px" />;
              })
            }
          </div>
          {
            data
              .toSorted((a, b) => a.label.localeCompare(b.label)) // Sorts based on label
              .map(({ label, bars }, index) => {
                return (
                  <div className="relative h-full w-full flex flex-col justify-end items-center">
                    <div
                      className="w-full"
                      style={
                        "height: " +
                        ((Math.max(...bars.map((bar) => bar.value)) > ANONYMIZE_THRESHOLD
                          ? Math.max(...bars.map((bar) => bar.value))
                          : ANONYMIZE_THRESHOLD) / maxValue) *
                        100 +
                        "%;"
                      }
                    >
                      <BarGroup bars={bars} seriesConfig={seriesConfig} />
                    </div>
                    <p className="absolute -bottom-8">{label}</p>
                  </div>
                );
              })
          }
        </div>
      </div>
    </div>
    <p className="text-sm self-end"><i>Verdier under 3 er anonymisert av hensyn til personvern (GDPR)</i></p>
    <p className="text-sm self-end"><i>Datakilde: <Link to="https://dbh.hkdir.no/" newWindow>DBH</Link></i></p>
  </div>

}