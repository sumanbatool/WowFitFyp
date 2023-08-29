import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import MealList from './MealList';
import axios from 'axios';
import { API_KEY,BASE_URL } from './api';
// import RecipeButton from '../buttons/RecipeButton';

function MealApp() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState('');

  function getMealData() {
    axios
      .get(
        `${BASE_URL}mealplanner/generate?apiKey=${API_KEY}&timeFrame=day&targetCalories=${calories}`
      )
      .then(response => {
        setMealData(response.data);
       
      })
      .catch((error) => {
        console.log('error',error);
      });
  }

  function handleChange(text) {
    setCalories(text);
  }

  return (
    
    <View style={{  alignItems: 'center' ,backgroundColor:'#FEFCF3',flex:1 }}>
      <Text style={{marginTop:50,fontSize:17,color:"black",}}>Provide the calories for the whole day meal plan.</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ borderWidth: 1, padding: 10,marginBottom:15,marginTop:15,borderRadius:15,marginRight:15,fontSize:15,color:'black', }}
          placeholder="Calories (e.g. 2000)"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          onChangeText={handleChange}
          value={calories}
        />
        <TouchableOpacity onPress={getMealData} style={{backgroundColor:"#116D6E",borderWidth: 1, padding: 10,marginBottom:15,marginTop:15,borderRadius:15,marginRight:15,fontSize:15,}}>
          <Text style={{color:'white',fontWeight:'bold',}}>Get Daily Meal Plan</Text>
        </TouchableOpacity>
        {/* <Button title="Get Daily Meal Plan" onPress={getMealData} /> */}
      </View>
      {mealData && <MealList mealData={mealData} />}
    </View>
  );
}

export default MealApp;
