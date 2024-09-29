import type { BarGraphData, GradeEntry } from "../types";
import { allEquals } from "./object";
import { getColorByStudyProgrammeCode } from "./utils";

const API_BASE =
  "https://dbh-data.dataporten-api.no/Tabeller/hentCSVTabellData";

const fetchEntries = async () => {
  return await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tabell_id: 308,
      api_versjon: 1,
      statuslinje: "N",
      begrensning: "10000",
      kodetekst: "J",
      desimal_separator: ".",
      groupBy: [
        "Institusjonskode",
        "Avdelingskode",
        "Årstall",
        "Semester",
        "Studentkategori",
        "Studieprogramkode",
        "Emnekode",
        "Karakter",
      ],
      sortBy: ["Institusjonskode", "Avdelingskode"],
      filter: [
        {
          variabel: "Institusjonskode",
          selection: {
            filter: "item",
            values: ["1150"],
            exclude: [""],
          },
        },
        {
          variabel: "Avdelingskode",
          selection: {
            filter: "item",
            values: ["273824"],
            exclude: [""],
          },
        },
        {
          variabel: "Studieprogramkode",
          selection: {
            filter: "item",
            values: ["BIT", "MTDT"],
            exclude: [""],
          },
        },
        {
          variabel: "Studentkategori",
          selection: {
            filter: "item",
            values: ["S"],
            exclude: [""],
          },
        },
        {
          variabel: "Emnekode",
          selection: {
            filter: "item",
            values: [
              "TDT4120-1",
              "TDT4160-1",
              "TDT4109-1",
              "TDT4100-1",
              "IT1901-1",
              "EXPH0300-1",
              "TDT4145-1",
              "TPD4114-1",
              "IT2901-1",
            ],
            exclude: [""],
          },
        },
        {
          variabel: "Årstall",
          selection: {
            filter: "top",
            values: ["1"],
            exclude: [""],
          },
        },
      ],
    }),
  }).then((response) => response.text());
};

export const getGradeEntries = async (): Promise<GradeEntry[]> => {
  const gradeEntries: GradeEntry[] = (await fetchEntries())
    .split("\n")
    .splice(1) // Remove headings
    .map((line) => {
      const vars = line.replaceAll('"', "").split(";");
      return {
        year: Number(vars[4]),
        semester: vars[6],
        studyProgrammeCode: vars[9],
        studyProgrammeName: vars[10],
        classCode: vars[11],
        grade: vars[12],
        totalCandidates: Number(vars[13]),
        women: Number(vars[14]),
        men: Number(vars[15]),
      };
    })
    .slice(0, -1); // remove last undefined object

  return gradeEntries;
};

/* 
Wanted return value type: 
*/

export function getDataForGraph(entries: GradeEntry[]) {
  const data: {
    [grade: string]: {
      studyProgrammeCode: string;
      value: number;
    }[];
  } = {};
  entries.forEach((entry) => {
    if (!data[entry.grade]) {
      data[entry.grade] = [];
    }


    data[entry.grade].push({
      studyProgrammeCode: entry.studyProgrammeCode,
      value: entry.totalCandidates,
    });
  });

  const barOrdering = [
    ...data[entries[0].grade].map((element) => element.studyProgrammeCode),
  ];

  return Object.entries(data).map(([grade, bars]) => ({
    label: grade,
    bars: bars
      .toSorted(
        (a, b) =>
          barOrdering.indexOf(a.studyProgrammeCode) -
          barOrdering.indexOf(b.studyProgrammeCode)
      )
      .map((bar) => ({ value: bar.value, color: getColorByStudyProgrammeCode(bar.studyProgrammeCode)})),
  }));
}
