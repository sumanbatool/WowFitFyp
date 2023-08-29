import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import Meal from './Meal';
import { ScrollView } from 'react-native-gesture-handler';


export default function MealList({ mealData }) {
  const nutrients = mealData.nutrients;
  const labeltest = mealData.label;
  const valuetest = mealData.value;

  const nutrientsList = [
    { name: 'Calories', value: nutrients.calories.toFixed(0) },
    { name: 'Carbohydrates', value: nutrients.carbohydrates.toFixed(0) },
    { name: 'Fat', value: nutrients.fat.toFixed(0) },
    { name: 'Protein', value: nutrients.protein.toFixed(0) },
  ];

  const renderNutrient = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.value}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
  const renderMeal = ({ item }) => (
    <Meal key={item.id} meal={item} />
  );
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={[styles.container, { height: screenHeight },{ width: screenWidth }]}>
      <ScrollView style={{marginBottom:30}}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrients</Text>
          <FlatList
            data={nutrientsList}
            renderItem={renderNutrient}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meals</Text>
          <FlatList
            data={mealData.meals}
            renderItem={renderMeal}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FEFCF3',
    marginBottom:10,
  },
  section: {
    backgroundColor:'#FEFCF3',
    marginBottom: 70,
    // borderColor:"black",
    padding: 16,
    // borderWidth:2,
    
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black",
    marginLeft:30,
  },
});
