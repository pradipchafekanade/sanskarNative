import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleInputChange = (text, field) => {
    if (field === 'name') {
      setName(text);
      setNameError('');
    } else if (field === 'email') {
      setEmail(text);
      setEmailError('');
    } else if (field === 'mobileno') {
      setMobile(text);
      setMobileError('');
    } else if (field === 'password') {
      setPassword(text);
      setPasswordError('');
    }
  }

  const validate = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }
    if (!mobile.trim()) {
      setMobileError('Mobile number is required');
      isValid = false;
    }
    return isValid;
  }

  const submit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(apiUrl + `api/registration.php`, {
          name: name,
          email: email,
          mobile: mobile,
          password: password
        });
        console.log("Response:", response);
        alert('Successfully registered');
        navigation.navigate("Login");
      } catch (error) {
        console.log('API error:', error);
      }
    }
  }

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground style={styles.bluebg} source={require("./assets/blue.jpeg")}>
      <View style={styles.container}>
        <Text style={styles.signupText}>Sign Up</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => handleInputChange(text, 'name')}
          />
          {!!nameError && <Text style={styles.error}>{nameError}</Text>}
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => handleInputChange(text, 'email')}
          />
          {!!emailError && <Text style={styles.error}>{emailError}</Text>}
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => handleInputChange(text, 'password')}
            secureTextEntry={true}
          />
          {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Mobile Number"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => handleInputChange(text, 'mobileno')}
          />
          {!!mobileError && <Text style={styles.error}>{mobileError}</Text>}
        </View>
        <TouchableOpacity style={styles.signupBtn} onPress={submit}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginLink}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100
  },
  signupText: {
    fontSize: 50,
    marginBottom: 20,
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
  signupBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
  },
  signupButtonText: {
    color: "white",
    fontSize: 25
  },
  loginLink: {
    marginTop: 20,
    fontSize: 20
  },
  bluebg: {
    height: 850
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginLeft: 20,
    marginBottom:20
  }
});

export default Signup;
