import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const About = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Hey there! 👋</Text>
            <Text style={styles.text}>
                Welcome to <Text style={styles.highlight}>NITD-Attend</Text>, your friendly neighborhood attendance manager! I'm <Text style={styles.highlight}>Ayush Aryan Singh (221210026)</Text>, a Computer Science and Engineering student from the batch of 2026 at NIT Delhi. Let me tell you why I whipped up this little app!
            </Text>
            <Text style={styles.text}>
                You know how there are tons of attendance apps out there with fancy bells and whistles? Well, they're great, but there's one thing that always bugged me: manually adding every single course. Talk about a snooze fest! 😴 So, I thought, "Why not make an app where you just pick your degree, branch, and semester, and boom! All your courses are right there?" And that's how NITD-Attend was born! Plus, you can tweak subject names or add more if you need. It's got all the basics covered, without any fuss.
            </Text>
            <Text style={styles.subheader}>Now, let's chat about the cool tech behind the scenes:</Text>
            <Text style={styles.text}>
                <Text style={styles.highlight}>React Native:</Text> It's like the Swiss Army knife of app development. Write code once, and it works on both Android and iOS. Sweet, right? 🍭
            </Text>
            <Text style={styles.text}>
                <Text style={styles.highlight}>Expo:</Text> Think of it as your app's personal butler. It takes care of all the nitty-gritty setup stuff, so you can focus on making your app awesome! 🎩
            </Text>
            <Text style={styles.text}>
                <Text style={styles.highlight}>Drizzle ORM:</Text> This nifty tool helps us talk to our database in TypeScript. It's like having a translator who makes sure we're all speaking the same language! 🗣️
            </Text>
            <Text style={styles.text}>
                <Text style={styles.highlight}>SQLite DB:</Text> Our trusty local database. It's like a tiny notebook that lives in your app, so you can access your data even without the internet. No Wi-Fi? No problem! 📝
            </Text>
            <Text style={styles.text}>
                <Text style={styles.highlight}>TanStack Query:</Text> This data-fetching wizard makes grabbing and caching data a breeze. It's like having a super-organized librarian for your app's data! 📚✨
            </Text>
            <Text style={styles.text}>
                <Text style={styles.highlight}>TypeScript:</Text> It's like JavaScript with superpowers. Catches errors before they happen and makes your code cleaner. It's your code's personal trainer! 💪
            </Text>
            <Text style={styles.text}>
                Now, I won't lie – NITD-Attend isn't winning any beauty pageants. But hey, it's clean, simple, and gets the job done! Who needs flashy when you've got functionality, right? 😉
            </Text>
            <Text style={styles.text}>
                The coolest part? This app is open-source on GitHub! 🎉 That means all my NIT Delhi peeps can jump in, add your magic, and make it even better. Together, we can turn this from just an attendance tracker to something epic for our college community. So, whatcha waiting for? Let's code and conquer! 💻🚀
            </Text>
            <View style={{ borderTopWidth: 2, borderTopColor: '#414141', paddingVertical:20, paddingHorizontal:20, gap:17, marginBottom:20}}>
                <TouchableOpacity style={{flexWrap:'wrap', flexDirection:'row', gap:20, alignItems:'center', backgroundColor:'#414141', padding:8, borderRadius:20, justifyContent:'center'}}  onPress={() => Linking.openURL('https://github.com/AyushGlitch/nitd-attend')}>
                <AntDesign name="github" size={30} color="white" />
                <Text style={{ fontSize: 17, fontWeight:'500', marginBottom: 10, color:'white' }}>GitHub</Text>
                </TouchableOpacity>
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021520',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
        lineHeight: 24,
        textAlign:'justify'
    },
    highlight: {
        fontWeight: '700',
        color: '#00FF00', // Highlight color
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 20,
        marginTop: 20,
    },
    link: {
        fontSize: 16,
        color: '#00FF00', // Link color
        marginBottom: 10,
    },
});

export default About;
