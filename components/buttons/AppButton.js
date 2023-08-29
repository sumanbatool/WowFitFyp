import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.08,
    backgroundColor: 'white',
    borderRadius: screenHeight * 0.04,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: screenHeight * 0.05,
  },
  appButtonText: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 5,
  },
});

export default AppButton;
