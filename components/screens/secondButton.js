import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
const Button = ({title}) => (
  <TouchableOpacity
    style={[
      styleSignUpButton.button,
    ]}
    >
    <Text
      style={[
    styleSignUpButton.Text,
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);
const styleSignUpButton = StyleSheet.create({
  button: {
    position: 'absolute',
    height: 50,
    left: 24,
    right: 24,
    bottom: 42,
    backgroundColor: '#1B5DEC',
    borderWidth: 0.5,
    borderColor: '#1B5DEC',
    borderRadius: 48,
    paddingHorizontal: 10,
    paddingVertical: 10,
    top:700,
    boxSizing: 'border-box',
  },
  Text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  }
});

export default Button;
