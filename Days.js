import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Button, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import videoFile from './sample.mp4';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import WebView from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe'
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import { useProfileImage } from './ProfileImageContext';

const { width, height } = Dimensions.get('window');
const apiUrl = process.env.EXPO_PUBLIC_API_URL;


const Days = () => {
  const COLORS = {
    accent: '#FF7363',
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

  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comment, setComment] = useState('');
  const [data,setData] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null);

  const bookName = "Your Book Name"; // Add your book name here
  const route = useRoute(); // Use useRoute to access route parameters
  const { id } = route.params;
  console.log('activityid:', id); // Accessing the passed ID parameter

  const navigation = useNavigation();
  const {setActivityCompleted} =useProfileImage()

  const togglePlay = async () => {
    if (video.current) {
      if (isPlaying) {
        await video.current.pauseAsync();
      } else {
        await video.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(()=>{
    axios.get(apiUrl+`api/activities.php?id=${id}`).then((res)=>{
        setData(res.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  let courseid =data.length > 0 ? data[0].courseid : null
  console.log("courseid", courseid);


  const handleCommentSubmit = async () => {
    try {
      const activitydate = new Date().toISOString().slice(0, 10);
  
      const response = await axios.post(apiUrl + `api/completeactivity.php`, 
      {
        userid: loggedInUser,
        courseid: courseid,
        activityid: id,
        activitydate: activitydate,
        status: "complete",
        description: comment
      });
  
      console.log('API Response:', response.data);
      // Navigate to Home screen after successful submission
      navigation.navigate('Coursedetails', { courseId: courseid }); // Pass courseId as a parameter
    setActivityCompleted(false);

    } catch (error) {
      console.error('API Error:', error);
    }
  };
  
  
  
  const checkStoredUser = async () => {
    try {
      const storedUserJSON = await AsyncStorage.getItem('user');
      console.log('Stored User JSON:', storedUserJSON); // Log the retrieved JSON data
      if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        console.log('Parsed User:', storedUser); // Log the parsed user data
        setLoggedInUser(storedUser.id);
      }
    } catch (error) {
      console.error('Error retrieving user:', error); // Log any errors that occur during retrieval
    }
  };
  
  useEffect(() => {
    checkStoredUser();
  }, []);
  
  console.log('userid', loggedInUser);
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 20 }}>
    {/* Main Container */}
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Conditionally render based on atype */}
      {data.map((item) => (
        <View key={item.id}>
          {item.atype === 'Text' && (
            <View style={styles.bookNameContainer}>
              <Text style={styles.bookNameText}>{item.description}</Text>
            </View>
          )}
          {item.atype === 'Video' && (
            <YoutubePlayer
            height={300}
     play={true}
     videoId={item.description}
     />
            
          )}
        </View>
      ))}
     {/* Comment Input */}
     
     {/* <TextInput
          placeholder="Type your comment here..."
          onChangeText={(text) => setComment(text)}
          value={comment}
          multiline
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginTop: 20,
            padding: 10,
            marginVertical: 10,
            marginHorizontal: 10,
            height: 100,
          }}
        /> */}

       
      {/* Your existing comment input and submit button */}
      <TouchableOpacity style={styles.completeButton} onPress={handleCommentSubmit}>
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  bookNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700', // Example color
    paddingVertical: 40,
    marginBottom: 20,
    borderRadius: 10,
    padding:5
  },
  bookNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  completeButton: {
    marginHorizontal:15,
    marginTop:15,
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Days;
