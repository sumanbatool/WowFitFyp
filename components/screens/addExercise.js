import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Button from './button';
import axios from 'axios';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { baseUrl } from '../baseUrl/baseUrl';

const Addexercise = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [categoryErrorMessage, setCategoryErrorMessage] = useState('');

  const categories = [
    { category: 'Leg Muscles', icon: 'https://i.ibb.co/sFmb4vr/Group-6876.png' },
    { category: 'Cardio', icon: 'https://i.ibb.co/0ZKQ7x6/Group-6870.png' },
    { category: 'Wings', icon: 'https://i.ibb.co/vsV1SCc/Group-6875.png' },
    { category: 'Arm Muscles', icon: 'https://i.ibb.co/zfjYx3N/Group-6872.png' },
    { category: 'Pectoral', icon: 'https://i.ibb.co/kmxDBfJ/Group-6874.png' },
    { category: 'Press', icon: 'https://i.ibb.co/86thbfw/Group-6871.png' },
    { category: 'Shoulder Muscles', icon: 'https://i.ibb.co/JFWbkyG/Group-6873.png' },
    { category: 'Hip', icon: 'https://i.ibb.co/1M7VLjJ/Group-6877.png' },
    { category: 'Mind Body', icon: 'https://i.ibb.co/pWqgdnb/Group-6869.png' },
  ];
  const handleExerciseNameChange = (text) => {
    if (exerciseName) {
      hideMessage();
    }
    setExerciseName(text);
  };
  const handleCategorySelect = (category) => {
    if (selectedCategory) {
      hideMessage(); 
    }
    setSelectedCategory(category);
  };
  const saveExercise = async () => {
    if (!exerciseName) {
      /*setNameErrorMessage('Please enter exercise title');
      return;
    } else {
      setNameErrorMessage('');*/
      showMessage({
        message: 'Please enter exercise title',
        type: 'danger',
      });
      return;
    }
    if (!selectedCategory) {
      /*setCategoryErrorMessage('Please select a category');
      return;
    } else {
      setCategoryErrorMessage('');*/
      showMessage({
        message: 'Please select a category',
        type: 'danger',
      });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}add/newExercise`, {
        name: exerciseName,
        category: selectedCategory,
        icon: categories.find((item) => item.category === selectedCategory).icon,
      });
      if (response.status === 201) {
        showMessage({
          message: 'Exercise created successfully',
          type: 'success',
          duration: 3000,
          backgroundColor: "#5D8AA8",  
        });
      } else {
       showMessage({
          message: 'Failed to create exercise',
          type: 'danger',
          duration: 3000,
          description: error.message,
        });
      }
    } catch (error) {
      showMessage({
        message: 'An error occurred',
        description: error.message,
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const renderExerciseItem = ({ item }) => {
    const isChecked = selectedCategory === item.category;

    return (
      <Pressable onPress={() => handleCategorySelect(item.category)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.icon }} style={styles.icon} />
          <Text style={styles.title}>{item.category}</Text>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              color="#6082B6"
              uncheckedColor="#6082B6"
              value={item.category}
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => setSelectedCategory(item.category)}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type Exercise title"
        style={styles.searchInput}
        value={exerciseName}
        onChangeText={handleExerciseNameChange}
      />
      {nameErrorMessage ? (
        <View style={styles.flashMessage}>
          <Text style={styles.flashMessageText}>{nameErrorMessage}</Text>
        </View>
      ) : null}
      <Text style={styles.choose}>Choose Category of Exercise</Text>
      <FlatList
        data={categories}
        contentContainerStyle={styles.flatlistContent}
        renderItem={renderExerciseItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Button title="Save" onPress={saveExercise} />
      <FlashMessage></FlashMessage>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 17,
    backgroundColor:'#F0F0F0'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCC',
  },
  itemContainer: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color:'black'
  },
  radioButtonContainer: {
    marginLeft: 'auto',
  },
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  flatlistContent: {
    flexGrow: 1,
  },
  flashMessage: {
    backgroundColor: 'red',
    padding: 9,
    paddingLeft: 9,
    marginBottom: 10,
    borderRadius: 9,
  },
  flashMessageText: {
    color: 'white',
    fontSize: 15,
  },
  choose:
  {
    paddingLeft: 8,
    fontSize:15,
    color:'black',
    marginBottom:15
  }
});

export default Addexercise;
