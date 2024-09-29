export function getColorByStudyProgrammeCode(code: string): string {
    let color: string;
    switch (code) {
        case "BIT":
            color = "#0d5474"
            break;
        case "MTDT":
            color = "#E21617"
            break;
        default:
            color = "#777"
            break;
    }
    
    return color;
}