import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, DrawerActions, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { db } from '@/db/drizzle';
import migrations from '@/db/migrations/migrations'
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { preDefinedTimeTable, preDefinedTimeTableInsertType, preDefinedTimeTableSelectType } from '@/db/schema';
import { count } from 'drizzle-orm';
import { preDefinedTimeTableData } from '@/db/seedData';



SplashScreen.preventAutoHideAsync();

type Result = {
  count: number;
}[];


async function seedData(db: ExpoSQLiteDatabase) {
  try {
    const preDefinedData: Result = await db.select({count: count()}).from(preDefinedTimeTable)
  
    if (preDefinedData[0].count != 0) {
      console.log("Data Present")
    }

    else {
      //@ts-ignore
      const insertRes: preDefinedTimeTableInsertType = await db.insert(preDefinedTimeTable).values(preDefinedTimeTableData)
      if (insertRes) {
        console.log("Data Seeded")
      }
    }
    const seededData: preDefinedTimeTableSelectType[] = await db.select().from(preDefinedTimeTable)
    console.log("Data Present of Length", seededData.length)

  } catch (error) {
    console.log('Error seeding data', error)
  }
}


export default function RootLayout() {
  const [loaded, err] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const {success, error} = useMigrations(db, migrations) 
  // useDrizzleStudio(db)


  useEffect(() => {
    if (error || err) 
      throw error || err;
  }, [error, err]);

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
      if (success) {
        console.log('Migrations ran successfully')
        seedData(db).then( () => { () => SplashScreen.hideAsync() } )
      }
    }
    
  }, [loaded, success]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


function CustomDrawerContent(props: any) {
  return (    
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View style={{backgroundColor: '#021520', height: 150}} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>     
  )
} 


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation()
  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              headerLeft: () => (
                <Ionicons name="menu" size={30} color="white" onPress={onToggle} className='px-5 flex justify-center items-center'
                style= {{
                  paddingHorizontal: 20,
                }}
                />
              ),
              drawerStyle: {
                width: 200
              },
            }}
            drawerContent={CustomDrawerContent}
          >
            <Drawer.Screen 
              name='index'
              options={{
                drawerLabel: 'Home',
                drawerLabelStyle: {fontSize: 17},
                drawerIcon: ({size, color}) => (
                  <Ionicons name='home' size={30} color={color} />
                ),
                title: 'Home',
              }}
            />

            <Drawer.Screen 
              name='subjects'
              options={{
                drawerLabel: 'Subjects',
                drawerLabelStyle: {fontSize: 17},
                title: 'List of Subjects',
                drawerIcon: ({size, color}) => (
                  <Ionicons name='book' size={30} color={color} />
                )
              }}
            />

            <Drawer.Screen 
              name='history'
              options={{
                drawerLabel: 'History',
                drawerLabelStyle: {fontSize: 17},
                title: 'Attendance History',
                drawerIcon: ({ size, color }) => (
                  <Ionicons name="calendar-clear" size={30} color={color} />
                )
              }}
            />

            <Drawer.Screen 
              name='about'
              options={{
                drawerLabel: 'About',
                drawerLabelStyle: {fontSize: 17},
                title: 'About the App',
                drawerIcon: ({size, color}) => (
                  <AntDesign name='exclamationcircle' size={30} color={color} />
                )
              }}
            />

          </Drawer>
        </GestureHandlerRootView>
    </ThemeProvider>
  );
}