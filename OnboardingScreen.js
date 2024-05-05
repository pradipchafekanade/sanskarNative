import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from './AsyncStorage';


const{width,heigth} = Dimensions.get('window')

function OnboardingScreen() {
  const navigation = useNavigation()

  // const handleDone=()=>{
  //   navigation.navigate('Home')
  //   console.log('done');
  //   setItem('onboarded','1')
  //   console.log(setItem);
  // }

  const handleDone = async () => {
    try {
        await setItem('onboarded','1')
      console.log('Value set in AsyncStorage');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error setting onboarding status', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      containerStyles={{paddingHorizontal:15}}
      titleStyles={{ fontSize: 55, fontWeight: 'bold' }}
      subTitleStyles={{ fontSize: 30 }}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <View>
               <LottieView style={styles.lottie} source={require('./assets/first.json')} autoPlay loop />
              </View>
            ),
            title: 'Learn Up',
            subtitle: 'Find best courses for you',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View>
                   <LottieView style={styles.lottie} source={require('./assets/second.json')} autoPlay loop />

              </View>
            ),
            title: 'Morals',
            subtitle: 'Learn from stories',
          },
          {
            backgroundColor: '#e4fdf4',
            image: (
              <View>              
                 <Lottie style={styles.lottie} source={require('./assets/third.json')} autoPlay loop delay={1000} />
              </View>
            ),
            title: '.........Lets Go.........',
            subtitle: '',
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white '
  },
  lottie:{
    height:width*0.9,
    width:width
  },
})

export default OnboardingScreen