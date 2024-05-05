import React from 'react';
import { View, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube';

const VideoPlayer = ({ videoId }) => {
  return (
    <View style={styles.container}>
      <YouTube
        apiKey="YOUR_YOUTUBE_API_KEY"
        videoId={videoId}
        style={styles.youtube}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  youtube: {
    alignSelf: 'stretch',
    height: 300,
  },
});

export default VideoPlayer;
