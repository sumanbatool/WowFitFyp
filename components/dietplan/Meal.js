import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Linking,Button } from 'react-native';
import { API_KEY, BASE_URL } from './api';
import RecipeButton from '../buttons/RecipeButton';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

const Meal = ({ meal}) => {
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState('');
  const [listData, setListData] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showIngredients,setShowIngredients]=useState([])
  const [instructions,setInstructions]=useState([])

  useEffect(() => {
    fetch(
      `${BASE_URL}recipes/${meal.id}/information?apiKey=${API_KEY}&includeNutrition=false`
    )
      .then(response => response.json())
      .then(data => {
        console.log("Complete Data is : ", data)
        setImageUrl(data.image);
        setShowIngredients(data.extendedIngredients)
        setInstructions(data.instructions)
        setListData([
          { label: 'Preparation time', value: `${meal.readyInMinutes} minutes` },
          { label: 'Number of servings', value: meal.servings.toString() },
        ]);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meal.title}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{`${item.label}: ${item.value}`}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <RecipeButton
      title="Show Recipe"
      onPress={() => {
        navigation.navigate('Recipe', {
          instructions,
          ingredients: showIngredients,
        });
      }}/>

      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
   marginHorizontal: 16,
    maxWidth: 400,
    maxHeight: 470,
    shadowColor: 'black',
    //shadowOffset: { width: 0, height: 4 },
    backgroundColor: 'white',
    // borderWidth: 2,
    marginBottom: 130,
    marginLeft: 30,
    elevation: 2,
    alignItems: 'center',
    paddingBottom:130,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 15,
    color: 'black',
  },
  image: {
    width: 250,
    height: 200,
  },
  listItem: {
    marginTop: 10,
  },
  listItemText: {
    color: 'black',
    fontSize: 18,
  },
});

export default Meal;
