import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getItem, setItem } from "./AsyncStorage";
// import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
function Login() {
  const [data, setData] = useState();
  const [email,setEmail]= useState();
  const [password,setPassword]= useState();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleSignupPress = () => {
    navigation.navigate('Signup');
    console.log("press");
  };

  const checkStoredUser =async()=>{
    try {
      const storedUserJSON = await getItem('user')
      console.log("getitem",storedUserJSON);
      if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        setLoggedInUser(storedUser);
        navigation.navigate('Home', { user: storedUser, userid: storedUser.id });
      }
    } catch (error) {
    console.log(error);
    }
  }

const submit = async () => {
   try {
    const response = await axios.post(apiUrl + `api/login.php`, {
      email: email,
       password: password,
    });
   console.log("login",response.data);
   if (response.data.status === 'success') {
    const user = { email, name: response.data.name,id: response.data.id };
  
      await setItem('user',JSON.stringify(user))
      console.log("emaillogin",user);
      setLoggedInUser(user);
      navigation.navigate('Home', { user, userid: response.data.id });
    
    } else {
       console.log("Login failed. Invalid credentials.");
   }
   } catch (error) {
    console.log(error);
   }
};

useEffect(()=>{
  checkStoredUser()
},[])

  

  return (
    <ImageBackground style={{height:870}}source={require('./assets/bg.png')}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text>{data}</Text> */}
      <Text style={styles.maintext}>Sanskar</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={submit}>
        <Text style={styles.loginText}>LOGIN</Text>
        {/* <FontAwesome icon={SolidIcons.smile} /> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupPress}>
        <Text style={styles.forgot_button}>Create an account?</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:400,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginTop: 30,
    fontSize:25
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
  },
  maintext:{
    fontSize:70,
    marginBottom:30,
    marginTop:-60
  }
});

export default Login;
