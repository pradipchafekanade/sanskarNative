import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Coursedetails from "./Coursedetails";
import Days from './Days';
import OnboardingScreen from './OnboardingScreen';
import { useEffect, useState } from 'react';
import { getItem } from './AsyncStorage';
import BottomNavigation from './BottomNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Certificate from './Certificate';
import { ProfileImageProvider } from './ProfileImageContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
const [onboardingshow , setonboardingshow] = useState(null)

const cheackifAlreadyon = async()=>{
  let onboarde = await getItem('onboarded')
  if(onboarde === '1'){
    //hide onboarding
    setonboardingshow(false)
  }
  else{
    //show onboarding
    setonboardingshow(true)
  }
}

useEffect(()=>{
  cheackifAlreadyon()
},[])

if (onboardingshow ==null) {
  return null;
}

if (onboardingshow) {
  return (
    <ProfileImageProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="OnboardingScreen">
    <Stack.Screen name="Login"component={Login} options={{title: "Login", headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{ title: "Signup" }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ title: "OnboardingScreen", headerShown: false, }} />
         <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
         <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Certificate" component={Certificate} options={{ title: "", headerStyle: { backgroundColor: '#C7B8F5'},}} />
         <Stack.Screen name="Coursedetails" component={Coursedetails} options={{ title: "", headerStyle: { backgroundColor: '#C7B8F5'},}} />
          <Stack.Screen name="Days" component={Days} options={{ title: "", headerStyle: {backgroundColor: '#C7B8F5'},}} /> 
    </Stack.Navigator>   
    </NavigationContainer>
    </ProfileImageProvider>
  );
}
else{
  return (
    <ProfileImageProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login"component={Login} options={{title: "Login", headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{ title: "Signup" }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ title: "OnboardingScreen", headerShown: false, }} />
        <Stack.Screen name='Home' component={Home} options={{  headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{ title: "", headerStyle: { backgroundColor: '#C7B8F5'},}} />
        <Stack.Screen name="Certificate" component={Certificate} options={{ title: "", headerStyle: { backgroundColor: '#C7B8F5'},}} />
         <Stack.Screen name="Coursedetails" component={Coursedetails} options={{ title: "", headerStyle: { backgroundColor: '#C7B8F5'},}} />
          <Stack.Screen name="Days" component={Days} options={{ title: "", headerStyle: {backgroundColor: '#C7B8F5'},}} />
    </Stack.Navigator>
    </NavigationContainer>
    </ProfileImageProvider>

  );
}
}


