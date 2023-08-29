import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#116D6E',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 20,
    marginLeft:-90,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default RecipeButton;
