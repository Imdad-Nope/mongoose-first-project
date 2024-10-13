import { Tschedules } from "./offeredCourse.interface";

export const hasTimeConflict = (
    assignedSchedule: Tschedules[],
    newSchedules: Tschedules
)=>{
    for(const schedule of assignedSchedule){
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndtime = new Date(`1970-01-01T${schedule.endTime}`);

    const newStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${schedule.endTime}`);

    if(newStartTime <existingEndtime && newEndTime > existingStartTime ){
        return true;
    }
    }
}