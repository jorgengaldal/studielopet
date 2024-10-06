export interface GradeEntry {
  year: number;
  semester: string;
  studyProgrammeCode: string;
  studyProgrammeName: string;
  classCode: string;
  grade: string;
  totalCandidates: number;
  women: number;
  men: number;
}

export interface Class {
    classCode: string;
    className: string;
    year: string;
    semester: string;
}

export type BarGraphData = 
{
    data: {
        label: string;
        bars: { value: number; color?: string }[];
    }[];
    seriesConfig?: {
        label?: string,
        color?: string,
    }[]
}
