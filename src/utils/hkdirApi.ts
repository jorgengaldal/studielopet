import type { Course, GradeEntry } from "../types";
import { getColorByStudyProgrammeCode } from "./utils";

const API_BASE =
  "https://dbh-data.dataporten-api.no/Tabeller/hentJSONTabellData";

export const fetchGradeEntries = async (
  studyProgrammeCodes?: string[],
  courseCode?: string,
  numberOfLastYears?: number
): Promise<GradeEntry[]> => {
  return (
    await fetch(API_BASE, {
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
        sortBy: ["Årstall", "Studieprogramkode"],
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
              filter: "all",
              values: ["*"],
              exclude: [""],
            },
          },
          {
            variabel: "Studieprogramkode",
            selection: {
              filter: "item",
              values: studyProgrammeCodes ?? ["BIT", "MTDT"],
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
              values: [courseCode ?? "TDT4120-1"],
              exclude: [""],
            },
          },
          {
            variabel: "Årstall",
            selection: {
              filter: numberOfLastYears ? "top" : "all",
              values: [String(numberOfLastYears ?? "*")],
              exclude: [""],
            },
          },
        ],
      }),
    }).then((response) => {
      if (response.status == 204) {
        // 204 No Content
        return []
      }
      else {
        return response.json()
      }
    })
  ).reverse()
  .map((entry: any) => ({
    year: entry["Årstall"],
    semester: entry["Semesternavn"],
    semesterCode: entry["Semester"],
    studyProgrammeCode: entry["Studieprogramkode"],
    studyProgrammeName: entry["Studieprogramnavn"],
    courseCode: entry["Emnekode"],
    grade: entry["Karakter"],
    totalCandidates: Number(entry["Antall kandidater totalt"]),
    women: Number(entry["Antall kandidater kvinner"]),
    men: Number(entry["Antall kandidater menn"]),
  }));
};

export const fetchCourses = async (
  numberOfLastYears?: number
): Promise<Course[]> => {
  return (
    await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tabell_id: 208,
        api_versjon: 1,
        statuslinje: "N",
        begrensning: "10000",
        kodetekst: "J",
        desimal_separator: ".",
        variabler: [
          "Institusjonskode",
          "Avdelingskode",
          "Årstall",
          "Semester",
          "Emnekode",
          "Emnenavn",
          "Status"
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
            variabel: "Årstall",
            selection: {
              filter: "all",
              values: ["*"],
              exclude: [""],
            },
          },
        ],
      }),
    }).then((response) => response.json())
  ).map((entry: any) => ({
    courseCode: entry["Emnekode"],
    courseName: entry["Emnenavn"],
    year: entry["Årstall"],
    semester: entry["Semesternavn"],
  }))
  .filter((entry: Course) => entry.courseCode != "ITX/V04-1");
  // TODO: Fix better (with substitusjon of / symbol?)
};

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
      .map((bar) => ({
        value: bar.value,
        color: getColorByStudyProgrammeCode(bar.studyProgrammeCode),
      })),
  }));
}
