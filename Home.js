import React, { useEffect, useState ,useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  Pressable,
  ImageBackground
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import { Dimensions ,StyleSheet} from 'react-native';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';
import CustomProgressBar from './CustomProgressBar';
import { useProfileImage } from './ProfileImageContext';

function Home() {
  const [course, setcourse] = useState();
  const [usercourse, setusercourse] = useState();
  const [CourseActivities,setcourseActivities]=useState([])
  const [userActivities,setuserActivities]=useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const { profileImage, setProfileImage, activityCompleted } = useProfileImage();

  const route = useRoute();
  const { user, userid } = route.params;

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const progress = 10;

  function loadData() {
    axios.post(apiUrl + `api/courses.php`).then((res) => {
      setcourse(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  console.log("new",CourseActivities);

  function courseactivity() {
    if (CourseActivities.length===0) {
      axios.post(apiUrl + `api/activities.php`).then((res) => {
        setcourseActivities(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function useractivity() {
    if (userActivities.length===0) {
    axios.post(apiUrl + `api/usercompleteactivity.php?userid=${userid}`).then((res) => {
      setuserActivities(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  }
  console.log("useractivity",userActivities);
  console.log("coursectivity",CourseActivities);

  function usercourses() {
    axios.post(apiUrl + `api/usercourses.php?userid=${userid}`).then((res) => {
      setusercourse(res.data.usercourses);
    }).catch((err) => {
      console.log(err);
    });
  }

  const register = async (courseId) => {
    try {
      const enrollmentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
      const response = await axios.post(apiUrl + `api/registercourses.php`, {
        userid: userid,
        courseid: courseId,
        enrollmentdate: enrollmentDate,
        completecourse: 0
      });
      setModalVisible(true);
      setRegistrationCompleted(true);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  

  const isCourseRegistered = (courseId) => {
    return usercourse ? usercourse.some((registeredCourse) => registeredCourse.courseid === courseId) : false;
  };

  
  const calculateProgress = (courseId) => {
    // Filter activities for the specified course
    const activitiesForCourse = CourseActivities.filter(activity => activity.courseid === courseId);
  
    // Count completed activities for the course
    const completedActivities = activitiesForCourse.filter(activity => {
      return userActivities.some(userActivity => userActivity.activityid === activity.id && userActivity.status === 'complete');
    }).length;
  
    // Calculate approximate progress
    const totalActivities = activitiesForCourse.length;
    const approximateProgress = Math.round((completedActivities / totalActivities) * 10) * 10; // Rounds to the nearest 10
    
    return approximateProgress;
  };
  
  useEffect(() => {
    console.log("Activity completed:", activityCompleted);
    // if (activityCompleted) {
      loadData();
      usercourses();
      courseactivity();
      useractivity();
      calculateProgress();
    // }
  }, [registrationCompleted]);
  
 

  const navigation = useNavigation();

  const Coursedetails = (courseId) => {
    navigation.navigate('Coursedetails', { courseId });
    console.log(courseId);
  };

  // useEffect(() => {
  //   const loadProfileImage = async () => {
  //     try {
  //       // Clear the profile image for the new user upon login
  //       setProfileImage(null);
        
  //       // Load the profile image for the logged-in user if available
  //       const savedProfileImage = await AsyncStorage.getItem(`profileImage_${userid}`);
  //       if (savedProfileImage) {
  //         setProfileImage(savedProfileImage);
  //       }
  //     } catch (error) {
  //       console.error('Error loading profile image:', error);
  //     }
  //   };
  
  //   loadProfileImage();
  // }, [userid]);  
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedProfileImage = await AsyncStorage.getItem('profileImage');
        if (savedProfileImage) {
          setProfileImage(savedProfileImage);
        } else {
          setProfileImage(null);
        }
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    };
  
    loadProfileImage();
  }, [])
  
  
  const profile =()=>{
    navigation.navigate('Profile',{userid})
  }

  const COLORS = {
    accent: '#136cb1',
    purple: '#817DC0',
    black: '#171717',
    white: '#FFFFFF',
    background: '#252C4A',
  };

  const SIZES = {
    base: 10,
    width,
    height,
  };

  return (
    <ImageBackground
    source={require('./assets/img3.jpg')}
    style={{height:855,width:390}}
  >
    <ScrollView>
      <SafeAreaView style={{ flex: 1, position: 'relative',paddingTop:30 }}>
        <StatusBar
          backgroundColor={COLORS.accent + '30'}
          barStyle="dark-content"
          animated={true}
        />
        <View
          style={{
            width: '100%',
            height: 0.17 * SIZES.height,
            padding: 30,
            backgroundColor: COLORS.accent + '20',
            position: 'relative',
          }}>
          <Image
            source={require('./assets/try.png')}
            style={{
              position: 'absolute',
              width:390,
              height:270
            }}
          />
            <TouchableOpacity onPress={(e) => profile(userid)}>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
<Image
  style={{ height: 50, width: 50, marginLeft: 100, marginTop: 40, borderRadius: 25 }}
  source={profileImage ? { uri: profileImage } : require("./assets/account.png")}
/>
          </View>
          </TouchableOpacity>

          <Text style={{ fontSize: 30, marginTop:-45 }}>
            Welcome {user.name}
          </Text>
        </View>

        {/* Registered courses */}
        <Text style={{  fontSize: 30, fontWeight: 'bold', marginLeft: -150,textAlign:'center' }}>Registered Courses</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, paddingHorizontal: 20 }}>
          {usercourse ? (
            usercourse.map((item, index) => (
              <View
                key={index}
                style={{
                  width: '50%', // Set to 50% to display two items in one line
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Coursedetails(item.courseid);
                  }}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    borderRadius: 10,
                    padding: 15,
                    shadowColor: '#9e9898',
                    elevation: 5,
                  }}
                >
                  <Image
                    source={{uri: apiUrl + 'coursespics/' + item.imagepath + '.png' }}
                    style={{
                      width: '100%',
                      height: 120,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <View>
  {/* Progress bar */}
  {/* <CustomProgressBar progress={calculateProgress(item.courseid)} /> */}

  {/* Complete text */}
  {/* {calculateProgress(item.courseid) === 100 && (
    <Text style={{ marginTop: 5, textAlign: 'center', color: 'green' }}>Complete</Text>
  )} */}
</View>

                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Loading data...</Text>
          )}
        </View>

        {/* Related Courses */}
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: -180, marginTop: 20,textAlign:'center' }}>Related Courses</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, paddingHorizontal: 20 }}>
          {course ? (
            course.map((item, index) => (
              // Check if the course is not registered before displaying it
              !isCourseRegistered(item.id) && (
                <View
                  key={index}
                  style={{
                    width: '50%', // Set to 50% to display two items in one line
                    padding: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Coursedetails(item.id);
                    }}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: '#FFFFFF',
                      width: '100%',
                      borderRadius: 10,
                      padding: 15,
                      shadowColor: '#9e9898',
                      elevation: 5,
                    }}
                  >
                    <Image
                      source={{ uri: apiUrl + 'coursespics/' + item.imagepath + '.png' }}
                      style={{
                        width: '100%',
                        height: 120,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                    <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text style={{ marginTop: 10, textAlign: 'center' }}>
                      <Button onPress={() => register(item.id)} title="Register" color="#caaa94" />
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            ))
          ) : (
            <Text>Loading data...</Text>
          )}
        </View>

        {/* Modal */}
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Registration Successful!</Text>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </View>
  </View>
</Modal>

      </SafeAreaView>
    </ScrollView>
    </ImageBackground>
  );
}

// Define styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#caaa94',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
  },
});


export default Home;

