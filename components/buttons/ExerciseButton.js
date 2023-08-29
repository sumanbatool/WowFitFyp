import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react'

const ExerciseButton = ({title, onPress, disabled, isValid}) => (
    <TouchableOpacity
      style={[
        styleSignUpButton.button,
        isValid ? styleSignUpButton.validButton : null,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          styleSignUpButton.Text,
          isValid ? styleSignUpButton.validText : null,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  const styleSignUpButton = StyleSheet.create({
    button: {
   
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#116D6E',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 16,
      borderColor: '#1B5DEC',
        borderRadius: 48,
        marginBottom:10,
        // marginTop:30,
      },
      Text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
      },
      validButton: {
        backgroundColor: '#1B5DEC',
      },
      validText: {
        color: '#fff',
      },
  });
export default ExerciseButton;

