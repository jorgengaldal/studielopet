export interface GradeEntry {
  year: number;
  semester: string;
  studyProgrammeCode: string;
  studyProgrammeName: string;
  courseCode: string;
  grade: string;
  totalCandidates: number;
  women: number;
  men: number;
}

export interface Course {
    courseCode: string;
    courseName: string;
    year: number;
    semester: string;
}

export type BarGraphDataData = {
    label: string;
    bars: { value: number; color?: string }[];
}[]

export type BarGraphData = 
{
    data: BarGraphDataData;
    seriesConfig?: {
        label?: string,
        color?: string,
    }[]
}
