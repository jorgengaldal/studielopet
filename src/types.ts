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


export type BarGraphData = 
{
    data: {
        label?: string;
        bars: { value: number; color?: string }[];
    }[];
    seriesConfig?: {
        label?: string,
        color?: string,
    }[]
}
