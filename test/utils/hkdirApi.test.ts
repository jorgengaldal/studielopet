import {test, expect} from "@jest/globals"

import { getGradeScale, type GraphDataIntermediate } from "../../src/utils/hkdirApi";

test("getGradeScale returns correct scale for partial scale [A, B, F]", () => {
    const entries: GraphDataIntermediate  = {
        "A": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
        "B": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
        "F": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
    }
    expect(getGradeScale(entries)).toStrictEqual(["A", "B", "C", "D", "E", "F"],)
})

test("getGradeScale returns correct scale for partial scale [G]", () => {
    const entries: GraphDataIntermediate  = {
        "G": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
    }
    expect(getGradeScale(entries)).toStrictEqual(["G", "H"],)
})

test("getGradeScale returns correct scale for full scale [G, H]", () => {
    const entries: GraphDataIntermediate  = {
        "G": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
        "H": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
    }
    expect(getGradeScale(entries)).toStrictEqual(["G", "H"],)
})

test("getGradeScale fallbacks to itself for custom scale", () => {
    const entries: GraphDataIntermediate  = {
        "A": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
        "B": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
        "G": [{
            studyProgrammeCode: "BIT",
            value: 20
        }],
    }
    expect(getGradeScale(entries)).toStrictEqual(["A", "B", "G"],)
})

