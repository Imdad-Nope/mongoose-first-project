import { TacademicSemesterCode, TacademicSemesterName, TacademicSemestersCodeMapper, Tmonths } from "./academicSemester.interface";


export const Months : Tmonths [] =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
export const AcademicSemesterName: TacademicSemesterName [] = [
    'Autumn', 'Summer', 'Fall'
];

export const AcademicSemesterCode: TacademicSemesterCode  [] = [
    '01', '02', '03'
];

export const academicSemestersCodeMapper : TacademicSemestersCodeMapper = {
    "Autumn": "01",
    "Summer": "02",
    "Fall" : "03"
}