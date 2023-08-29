import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.CustomButtonContainer}>
      <Text style={styles.CustomButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    // ...
    CustomButtonContainer: {
        position: 'absolute',
        height: 50,
        left: 24,
        right: 24,
        bottom: 42,
        backgroundColor: '#8B5AC3',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 48,
        paddingHorizontal: 16,
        top:590,
    },
    CustomButtonText: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      alignSelf: "center",
      paddingTop:11,
    }
  });

  export default CustomButton;