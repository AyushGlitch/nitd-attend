import { useEffect, useState } from "react"
import { View } from "./Themed"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Notifications from "expo-notifications"
import { ToastAndroid } from "react-native"


async function cancelAllNotifications() {
    // console.log("In Notification Bell cancelAllNotifications")
    await Notifications.cancelAllScheduledNotificationsAsync()
    ToastAndroid.show('Daily Notifications Off...!!!', ToastAndroid.TOP);
}


async function scheduleDailyNotifications() {
    // console.log("In Notification Bell scheduleDailyNotifications")
    await Notifications.cancelAllScheduledNotificationsAsync()

    const times= [
        { hour: 11, minute: 30 },
        { hour: 14, minute: 30 },
        { hour: 17, minute: 30 },
        { hour: 19, minute: 30 },
    ]

    times.forEach( async (time) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Daily Reminder",
                body: "Don't forget to update your daily attendance",
            },
            trigger: {
                hour: time.hour,
                minute: time.minute,
                repeats: true,
                channelId: "daily-reminder",
            }
        })
    } )

    ToastAndroid.show('Daily Notifications On...!!!', ToastAndroid.TOP);
}


export default function NotificationBell() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

    // console.log("In Notification Bell main body")

    useEffect( () => {
        // console.log("In Notification Bell useEffect")

        const getAllScheduledNotifications= async () => {
            const allScheduledNotif= await Notifications.getAllScheduledNotificationsAsync()
            if (allScheduledNotif.length > 0) {
                setNotificationsEnabled(true)
            }
            else {
                setNotificationsEnabled(false)
            }

            // console.log("In Notification Bell useEffect getAllScheduledNotifications")
        }

        getAllScheduledNotifications()

    }, [notificationsEnabled] )


    const handleToggleNotifications= async () => {
        // console.log("In Notification Bell handleToggleNotifications")
        if (notificationsEnabled) {
            await cancelAllNotifications();
        } 
        else {
            await scheduleDailyNotifications();
        }
        setNotificationsEnabled(!notificationsEnabled);
    }

    
    return (
        <View style={{paddingHorizontal:20, marginVertical:'auto'}}>
            {
                notificationsEnabled ? (
                    <TouchableOpacity onPress={handleToggleNotifications}>
                        <Ionicons name="notifications" size={25} color='white' />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleToggleNotifications}>
                        <Ionicons name="notifications-off" size={25} color="white" />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}