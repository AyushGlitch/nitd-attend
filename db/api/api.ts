import { db } from "../drizzle"
import { preDefinedTimeTable, preDefinedTimeTableSelectType, userAttendance, userAttendanceSelectType, userTimeTable, userTimeTableSelectType } from "../schema"


export const getUserTT = async () => {
    const fetchedUserTT: userTimeTableSelectType[] = await db.select().from(userTimeTable)
    return fetchedUserTT
}


export const getUserAttendance = async () => {
    const fetchedUserAttendance: userAttendanceSelectType[] = await db.select().from(userAttendance)
    return fetchedUserAttendance
}


export const getPreDefinedTT = async () => {
    const fetchedPreDefinedTT: preDefinedTimeTableSelectType[] = await db.select().from(preDefinedTimeTable).limit(10)
    return fetchedPreDefinedTT
}