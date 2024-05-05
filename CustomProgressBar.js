import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    height: 20,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 20,
  },
  progressText: {
    marginLeft: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomProgressBar;
