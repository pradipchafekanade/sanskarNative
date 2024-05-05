// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity,Animated } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
// import imgPlaceHolder from './assets/profile.png';
// import { useProfileImage } from './ProfileImageContext';

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// function Profile({route}) {
//   // const { setProfileImage } = useProfileImage();

//   const {userid}=route.params
//   console.log("userid",userid);
//   const [course,setcourse]=useState([])
//   const [registercourse, setregistercourses] = useState([]);
//   const [activity, setactivity] = useState([]);
//   const navigation = useNavigation();

// const loadData=()=>{
//   axios.post(apiUrl+'api/courses.php').then((res)=>{
//     setcourse(res.data.data.length)
//   }).catch((err)=>{
//     console.log(err);
//   })
// }

// const reistredcourses=()=>{
//   axios.post(apiUrl + `api/usercourses.php?userid=${userid}`).then((res)=>{
//     setregistercourses(res.data.usercourses.length)
//   }).catch((err)=>{
//     console.log(err);
//   })
// }

// const activities=()=>{
//   axios.post(apiUrl + `api/usercompleteactivity.php?userid=${userid}`).then((res)=>{
//     setactivity(res.data.length)
//   }).catch((err)=>{
//     console.log(err);
//   })
// }

// console.log("activity",activity);

// let pending =course-registercourse
// console.log("register",pending);



//   const handleLogout = async () => {
//     try {
//       const keys = await AsyncStorage.getAllKeys();
//       await AsyncStorage.multiRemove(keys);
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error clearing app data.');
//     }
//   };

//   const { profileImage, setProfileImage } = useProfileImage();

//   const imagePick = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
  
//       if (!result.canceled) {
//         if (result.assets && result.assets.length > 0) {
//           const selectedAsset = result.assets[0];
//           // Update local state
//           setProfile(selectedAsset.uri);
//           // Update global state
//           setProfileImage(selectedAsset.uri); // Update context
//           // Save to AsyncStorage
//           await AsyncStorage.setItem('profileImage', selectedAsset.uri);
//         } else {
//           console.error('No assets selected.');
//         }
//       }
//     } catch (error) {
//       console.error('Error picking image:', error);
//     }
//   };

//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const loadProfileImage = async () => {
//       try {
//         const savedProfileImage = await AsyncStorage.getItem('profileImage');
//         if (savedProfileImage) {
//           setProfile(savedProfileImage);
//         }
//       } catch (error) {
//         console.error('Error loading profile image:', error);
//       }
//     };

//     loadProfileImage();
//   }, []);

//   useEffect(()=>{
//     reistredcourses()
//     loadData()
//     activities()
//   },[])

//   return (
//     <View style={styles.container}>
//     <View style={styles.profileHeader}>
//         <Text style={styles.title}>Welcome</Text>
   
//         <TouchableOpacity onPress={imagePick} style={styles.editButton}>
//           <Icon name="edit" size={30} color="#666" style={{ fontWeight: 'bold' }} />
//         </TouchableOpacity>
//         <View style={styles.profileImageContainer}>
//           <Image source={profile ? { uri: profile } : imgPlaceHolder} style={styles.profileImage} />
//         </View>
//       </View>
//       <View style={styles.cardContainer}>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Total Courses</Text>
//           <Text style={styles.cardValue}>{course}</Text>
//           {/* <TouchableOpacity style={styles.editButton}>
//     <Icon name="edit" size={20} color="#666" />
//   </TouchableOpacity> */}
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Registred Courses</Text>
//           <Text style={styles.cardValue}>{registercourse}</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Pending Courses</Text>
//           <Text style={styles.cardValue}>{pending}</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Activity</Text>
//           <Text style={styles.cardValue}>{activity}</Text>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.printButton} onPress={() => navigation.navigate('Certificate',{userid})}>
//         <Text style={styles.printButtonText}>Print Certificate</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   profileImageContainer: {
//     position: 'relative',
//     backgroundColor: '#C7B8F5',
//     borderRadius: 75,
//     overflow: 'hidden',
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//   },
//   editButton: {
//     position: 'absolute',
//     top: 5, // Adjust as needed
//     right: 5, // Adjust as needed
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 5,
//     borderRadius: 10,
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   // card: {
//   //   backgroundColor: '#F2F2F2',
//   //   padding: 15,
//   //   borderRadius: 10,
//   //   width:'48%',
//   //   marginBottom: 10,
//   // },
//   card: {
//     backgroundColor: '#F2F2F2',
//     padding: 25,
//     borderRadius: 10,
//     width:'48%',
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   editButton: {
//     position: 'absolute',
//     top: 18,
//     right: 15,
//   },
//   // card: {
//   //   backgroundColor: '#F2F2F2',
//   //   padding: 20,
//   //   borderRadius: 10,
//   //   width: '48%',
//   //   marginBottom: 20,
//   //   borderWidth: 2, // Start with a default width
//   //   borderColor: '#E5E5E5',
//   // },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   cardValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   printButton: {
//     backgroundColor: 'green',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom:5
//   },
//   printButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   logoutButton: {
//     backgroundColor: '#FF6347',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Profile;

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import imgPlaceHolder from './assets/profile.png';
import { useProfileImage } from './ProfileImageContext';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

function Profile({ route }) {
  const { userid } = route.params;
  const navigation = useNavigation();

  const [course, setCourse] = useState(0);
  const [registeredCourses, setRegisteredCourses] = useState(0);
  const [activity, setActivity] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.post(apiUrl + 'api/courses.php');
        setCourse(res.data.data.length);
      } catch (err) {
        console.log(err);
      }
    };

    const loadRegisteredCourses = async () => {
      try {
        const res = await axios.post(apiUrl + `api/usercourses.php?userid=${userid}`);
        setRegisteredCourses(res.data.usercourses.length);
      } catch (err) {
        console.log(err);
      }
    };

    const loadActivities = async () => {
      try {
        const res = await axios.post(apiUrl + `api/usercompleteactivity.php?userid=${userid}`);
        setActivity(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
    loadRegisteredCourses();
    loadActivities();
  }, [userid]);

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     console.error('Error clearing app data:', error);
  //   }
  // };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('profileImage');
      navigation.navigate('OnboardingScreen');
    } catch (error) {
      console.error('Error clearing profile image from AsyncStorage:', error);
    }
  };

  const { profileImage, setProfileImage } = useProfileImage();

  // const imagePick = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  
  //     if (!result.canceled) {
  //       if (result.assets && result.assets.length > 0) {
  //         const selectedAsset = result.assets[0];
  //         // Update local state
  //         setProfile(selectedAsset.uri);
  //         // Update global state
  //         setProfileImage(selectedAsset.uri); // Update context
  //         // Save to AsyncStorage
  //         await AsyncStorage.setItem(`profileImage_${userid}`, selectedAsset.uri);
  //       } else {
  //         console.error('No assets selected.');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error picking image:', error);
  //   }
  // };

  const imagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          const selectedAsset = result.assets[0];
          // Update local state
          setProfile(selectedAsset.uri);
          // Update global state
          setProfileImage(selectedAsset.uri); // Update context
          // Save to AsyncStorage
          await AsyncStorage.setItem(`profileImage_${userid}`, selectedAsset.uri);
        } else {
          console.error('No assets selected.');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };  

  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedProfileImage = await AsyncStorage.getItem(`profileImage_${userid}`);
        if (savedProfileImage) {
          setProfile(savedProfileImage);
          setProfileImage(savedProfileImage);
        }
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    };

    loadProfileImage();
  }, [userid]);

  const pendingCourses = course - registeredCourses;

  return (
    <ImageBackground
    source={require('./assets/img5.jpg')}
    style={{height:770,width:392}}
  >
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.title}>Welcome</Text>
        <TouchableOpacity onPress={imagePick} style={styles.editButton}>
          <Icon name="edit" size={30} color="#666" style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image source={profile ? { uri: profile } : imgPlaceHolder} style={styles.profileImage} />
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Courses</Text>
          <Text style={styles.cardValue}>{course}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registered Courses</Text>
          <Text style={styles.cardValue}>{registeredCourses}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pending Courses</Text>
          <Text style={styles.cardValue}>{pendingCourses}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity</Text>
          <Text style={styles.cardValue}>{activity}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.printButton} onPress={() => navigation.navigate('Certificate', { userid })}>
        <Text style={styles.printButtonText}>Print Certificate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 20,
  },
  cardgame:{
    fontSize:35,
    textAlign:'center'
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:-10
  },
  profileImageContainer: {
    position: 'relative',
    backgroundColor: '#C7B8F5',
    borderRadius: 75,
    overflow: 'hidden',
  },
  profileImage: {
    width: 150,
    height: 150,
  },
  editButton: {
    position: 'absolute',
    top: 30, // Adjust as needed
    right: 70, // Adjust as needed
    padding: 5,
    borderRadius: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#F2F2F2',
    padding: 25,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  printButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  printButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
