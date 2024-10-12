import type { GradeEntry } from "../../src/types";
import { getGradeScale } from "../../src/utils/hkdirApi";

test("getGradeScale returns correct scale for partial scale [A, B, F]", () => {
    const entries: GradeEntry[]  = [
        {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "A",
    },
        {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "B",
    },
        {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "F",
    },
]
    expect(getGradeScale(entries)).toStrictEqual(["A", "B", "C", "D", "E", "F"],)
})

test("getGradeScale returns correct scale for partial scale [G]", () => {
    const entries: GradeEntry[]  = [
        {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "G",
    },
]
    expect(getGradeScale(entries)).toStrictEqual(["G", "H"],)
})

test("getGradeScale returns correct scale for full scale [G, H]", () => {
    const entries: GradeEntry[]  = [
        {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "G",
    },
    {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "H",
    },
]
    expect(getGradeScale(entries)).toStrictEqual(["G", "H"],)
})

test("getGradeScale fallbacks to itself for custom scale", () => {
    const entries: GradeEntry[]  = [
        {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "L",
    },
    {
        year: 2004,
        semester: "Høst",
        studyProgrammeCode: "BIT",
        studyProgrammeName: "Bachelor i informatikk",
        courseCode: "TDT4120",
        men: 24,
        women: 24,
        totalCandidates: 48,
        grade: "K",
    },
]
    expect(getGradeScale(entries)).toStrictEqual(["L", "K"],)
})

