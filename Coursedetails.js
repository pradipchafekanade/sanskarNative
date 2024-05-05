import React, { useState,useEffect ,useRef} from 'react'

import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    Button,
    ScrollView
  } from 'react-native';
  import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
  import {Dimensions} from 'react-native';
  import { Video } from 'expo-av';
// import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window');
let sessions_data = [
    'Session 01',
    'Session 02',
    'Session 03',
    'Session 04',
    'Session 05',
    'Session 06',
  ];

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;


function Coursedetails({route}) {

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

    // const [Detail, SetDetail] = useState(route.params.exercise);
    const [detail,SetDetail] = useState()
    const [courseData,Setcoursedata] = useState([])
    const {courseId}=route.params
    console.log("courseid",courseId);
    const video = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    function loadeData(){
      axios.post(apiUrl+`api/activities.php?courseid=${courseId}`).then((res)=>{
        // console.log(res.data);
        SetDetail(res.data.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    function coursedata(){
      axios.post(apiUrl+`api/courses.php?id=${courseId}`).then((res)=>{
        // console.log(res.data);
        Setcoursedata(res.data.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    console.log("coursedata",courseData);
    useEffect(()=>{
      coursedata()
      loadeData()
    },[])

    const navigation = useNavigation();

    const days = (id) => {
      console.log('id',id);
      navigation.navigate('Days', { id: id },{courseId});

    };
  const SessionItem = ({session, index}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          width: 0.5 * SIZES.width - 40,
          borderRadius: 10,
          marginBottom: 10,
          marginHorizontal: 5,
          height: 70,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          shadowColor: '#9e9898',
          elevation: 5,
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: COLORS.purple,
            backgroundColor: index == 0 ? COLORS.purple : COLORS.white,
            marginRight: 15,
            borderRadius: 20,
          }}>
          <FontAwesome5Icons
            name="play"
            style={{color: index == 0 ? COLORS.white : COLORS.purple}}
          />
        </View>
        <Text>{session}</Text>
      </View>
    );
  };
  return (
    <ScrollView>
       <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <StatusBar
        backgroundColor={'#C7B8F5'}
        barStyle={'dark-content'}
        animated={true}
      />
      <View
        style={{
          width: '100%',
          height: 0.4 * SIZES.height,
          padding: 30,
          backgroundColor: '#C7B8F5',
          position: 'relative',
        }}>
        <Image
          source={require('./assets/BgPurple.png')}
          style={{
            position: 'absolute',
            top: 60,
            left: -50,
          }}
        />
        <Text style={{fontSize: 30, lineHeight: 45}}>  {courseData.length > 0 && courseData[0].name}</Text>
        <Text style={{fontSize: 17, width: '85%',marginTop:15}}>{courseData.length > 0 && courseData[0].information}</Text>

        <Image
        //  source={{uri: courseData.length > 0 && apiUrl + 'coursespics/' + courseData[0].imagepath + '.png'}}
          source={require('./assets/Exercise3.png')}
          style={{
            position: 'absolute',
            bottom: 40,
            right: -130,
            width: 350,
            height: 350,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{marginTop: -30, marginHorizontal: 30}}>
        <Text style={{marginVertical: 25, fontSize: 20}}>{courseData.length > 0 && courseData[0].name}</Text>
        {detail ? (
  detail.map((item, index) => (
    <TouchableOpacity
      onPress={() => days(item.id)}
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 15,
        paddingLeft:3,
        shadowColor: '#9e9898',
        elevation: 5,
        marginBottom: 7,
        width:360
      }}
    >
      <Image
         source={require('./assets/Exercise3.png')}
        style={{ width: 80, height: 60, resizeMode: 'center' }}
      />
      <View>

        <Text>Day No {item.dayno}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  ))
) : (
  <Text>Loading data...</Text>
)}
      

      </View>

    </SafeAreaView>
    </ScrollView>
  )
}

export default Coursedetails