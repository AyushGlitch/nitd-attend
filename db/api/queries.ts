import { useQuery } from "@tanstack/react-query"
import { getPreDefinedTT, getUserAttendance, getUserTT } from "./api"


export const getUserTTQuery = () => {
    return useQuery({
        queryKey: ['getUserTT'],
        queryFn: getUserTT
    })
}


export const getUserAttendanceQuery = () => {
    return useQuery({
        queryKey: ['getUserAttendance'],
        queryFn: getUserAttendance
    })
}


export const getPreDefinedTTQuery = () => {
    return useQuery({
        queryKey: ['getPreDefinedTT'],
        queryFn: getPreDefinedTT
    })
}