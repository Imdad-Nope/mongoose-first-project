
export type Tmonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TacademicSemesterName = 'Autumn' | 'Summer'| 'Fall';

export type TacademicSemesterCode = '01'|'02'|'03';

export type TacademicSemester = {
    name: TacademicSemesterName,
    year: string,
    code: TacademicSemesterCode,
    startMonth: Tmonths,
    endMonth: Tmonths
};

export type TacademicSemestersCodeMapper ={
  [key: string] : string;
}