import { Text, View } from "./Themed";

interface SubjectAttendanceCardProps {
    courseId: string;
    courseData: {
        courseId: string,
        totalClasses: number,
        attendedClasses: number;
    };
}

export default function SubjectAttendanceCard({courseId, courseData}: SubjectAttendanceCardProps) {
    return (
        <View>
            <Text>{courseId}</Text>
            <Text>{courseData.totalClasses}</Text>
            <Text>{courseData.attendedClasses}</Text>
        </View>
    )
}