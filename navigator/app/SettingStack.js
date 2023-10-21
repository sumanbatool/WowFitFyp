

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppMeal from '../../components/dietplan/AppMeal';
import MealList from '../../components/dietplan/MealList';
import Meal from '../../components/dietplan/Meal'
import Recipe from '../../components/dietplan/Recipe';
import Settings from '../../components/screens/Settings';
import Subscribe from '../../components/screens/Subscription';
import Pricing from '../../components/screens/Pricing';
const SettingStack = createStackNavigator();
function SettingNavigationStack() {
  return (
    <SettingStack.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <SettingStack.Screen name="Settings" component={Settings} />
      <SettingStack.Screen name="AppMeal" component={AppMeal} />
      <SettingStack.Screen name="MealList" component={MealList} />
      <SettingStack.Screen name="Meal" component={Meal} />
      <SettingStack.Screen name="Recipe" component={Recipe} />
      <SettingStack.Screen name="Subscribe" component={Subscribe} />
      <SettingStack.Screen name="Pricing" component={Pricing} />


   

    </SettingStack.Navigator>
  );
}

export default SettingNavigationStack;
