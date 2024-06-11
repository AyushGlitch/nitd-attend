import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, DrawerActions, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';
import { Linking, TouchableOpacity, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Text } from '@/components/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



SplashScreen.preventAutoHideAsync();

type Result = {
  count: number;
}[];


async function seedData(db: ExpoSQLiteDatabase) {
  try {
    // await db.delete(preDefinedTimeTable) //
    const preDefinedData: Result = await db.select({count: count()}).from(preDefinedTimeTable)
  
    if (preDefinedData[0].count == preDefinedTimeTableData.length) {
      // console.log("Updated Data Present")
    }

    else {
      await db.delete(preDefinedTimeTable)
      //@ts-ignore
      const insertRes: preDefinedTimeTableInsertType = await db.insert(preDefinedTimeTable).values(preDefinedTimeTableData)
      if (insertRes) {
        // console.log("Updated Data Seeded")
      }
    }
    // await db.delete(preDefinedTimeTable) //
    const seededData: preDefinedTimeTableSelectType[] = await db.select().from(preDefinedTimeTable)
    // console.log("Data Present of Length", seededData.length)

  } catch (error) {
    // console.log('Error seeding data', error)
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
        // console.log('Migrations ran successfully')
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
  const {top, bottom} = useSafeAreaInsets()

  return (    
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{backgroundColor: '#021520', height: 150, flex:1, justifyContent:'center', alignItems:'center'}}>
          <Image source={require("../assets/images/adaptive-icon.png")} style={{width:'100%', flex:1}} />
        </View>
        
        <View style={{marginVertical:30}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>  

      <View style={{ borderTopWidth: 2, borderTopColor: '#414141', paddingVertical: bottom + 20, paddingLeft:20, gap:17}}>
        <TouchableOpacity style={{flexWrap:'wrap', flexDirection:'row', gap:20, alignItems:'center'}}  onPress={() => Linking.openURL('https://github.com/AyushGlitch/nitd-attend')}>
          <AntDesign name="github" size={30} color="grey" />
          <Text style={{ fontSize: 17, fontWeight:'500', marginBottom: 10 }}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexWrap:'wrap', flexDirection:'row', gap:20, alignItems:'center'}} onPress={() => Linking.openURL('https://www.linkedin.com/in/ayush-aryan-singh-877989204/')}>
          <AntDesign name="linkedin-square" size={30} color="grey" />
          <Text style={{ fontSize: 17, fontWeight:'500', marginBottom: 10 }}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexWrap:'wrap', flexDirection:'row', gap:20, alignItems:'center'}} onPress={() => Linking.openURL('https://x.com/AyushAryanSgh')}>
          <FontAwesome6 name="square-x-twitter" size={30} color="grey" />
          <Text style={{ fontSize: 17, fontWeight:'500', marginBottom: 10 }}>Twitter</Text>
        </TouchableOpacity>
      </View>  
    </View>
  )
} 


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation()
  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const queryClient= new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}