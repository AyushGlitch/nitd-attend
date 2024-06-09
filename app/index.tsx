import Loader from "@/components/Loader";
import SubjectAttendanceCard from "@/components/SubjectAttendanceCard";
import { Text, View } from "@/components/Themed";
import { getUserAttendanceQuery, getUserTTQuery } from "@/db/api/queries";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable} from "react-native";


interface CourseData {
  courseId: string,
  totalClasses: number,
  attendedClasses: number
}

interface tempDataProp {
  [key: string]: CourseData;
}


interface UserTimeTableData {
  degreeId: string;
  branchId: string;
  semester: number;
  courseId: string;
}

interface UserAttendanceData {
  courseId: string;
  date: string;
  absOrPre: boolean;
}


export default function Index() {
  const [processedData, setProcessedData] = useState<tempDataProp>({})

  const fetchUserTTQuery = getUserTTQuery()
  const fetchUserAttendanceQuery = getUserAttendanceQuery()
  if (fetchUserTTQuery.isFetching || fetchUserAttendanceQuery.isFetching) {
    return (
      <Loader />
    )
  }


  function processData(fetchedUserAttendance: any[]) {
    if (fetchedUserAttendance.length === 0) {
        console.log("No data to process")
        return
    }

    let tempData: tempDataProp= {}

    fetchedUserAttendance.forEach( (data) => {
        const tempCourseId= data.courseId
        if (!tempData[tempCourseId]) {
            tempData[tempCourseId] = {
                courseId: tempCourseId,
                totalClasses: 0,
                attendedClasses: 0
            }
        }
        if (data.absOrPre) {
            tempData[tempCourseId].attendedClasses++
        }
        tempData[tempCourseId].totalClasses++
    } )

    setProcessedData(tempData)
    tempData= {}
    console.log("Processed Data")
}


  processData(fetchUserAttendanceQuery.data!)


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fetchUserTTQuery.data && fetchUserTTQuery.data.length > 0 ? (
        fetchUserTTQuery.data.map((data) => {
          const courseDataProp = processedData[data.courseId!] ? processedData[data.courseId!] : { courseId: data.courseId, totalClasses: 0, attendedClasses: 0 };
          console.log("Course Data Prop: ", courseDataProp);

          return (
            <SubjectAttendanceCard
              courseId={data.courseId!}
              //@ts-ignore
              courseData={courseDataProp!} 
              key={data.courseId}
            />
          );
        })
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 60, padding: 20 }}>
          <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 36 }}>
            No Course in Attendance List
          </Text>
          <Text style={{ textAlign: "center", fontWeight: "400", fontSize: 20 }}>
            Add courses to your attendance list, as per your Degree, Branch, and Semester, from our predefined timetable.
          </Text>

          <Pressable>
            <Button title='Click Here !!' onPress={() => router.push('/subjects')} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
