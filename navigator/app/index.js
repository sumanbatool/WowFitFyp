import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabMenu} from './TabMenu';
import ExerciseScreen from '../../components/screens/exerciseLists';
import WorkoutCalendar from '../../components/screens/calendarscreen';
import NewWorkout from '../../components/screens/NewWorkout';
import EditWorkout from '../../components/screens/EditWorkout';
import AppMeal from '../../components/dietplan/AppMeal'
import MealList from '../../components/dietplan/MealList';
import Meal from '../../components/dietplan/Meal'
import Recipe from '../../components/dietplan/Recipe';
import Subscribe from '../../components/screens/Subscription.js';
import Settings from '../../components/screens/Settings';
import Pricing from '../../components/screens/Pricing';
import EditExercise from '../../components/screens/EditExercises';

const ApplicationStack = createStackNavigator();
function AppNavigationStack() {
  return (
    <ApplicationStack.Navigator
      initialRouteName="Schedule"
      screenOptions={{headerShown: false}}>
      <ApplicationStack.Screen name="main" component={TabMenu} />
      <ApplicationStack.Screen name="Schedule" component={WorkoutCalendar} />
      <ApplicationStack.Screen name="NewWorkout" component={NewWorkout} />
      <ApplicationStack.Screen name="exercises" component={ExerciseScreen} />
      <ApplicationStack.Screen name="EditWorkout" component={EditWorkout} />
      <ApplicationStack.Screen name="EditExercises" component={EditExercise} />
      <ApplicationStack.Screen name="Subscribe" component={Subscribe} />
      <ApplicationStack.Screen name="Pricing" component={Pricing} />
      <ApplicationStack.Screen name="AppMeal" component={AppMeal} />
      <ApplicationStack.Screen name="MealList" component={MealList} />
      <ApplicationStack.Screen name="Meal" component={Meal} />
      <ApplicationStack.Screen name="Recipe" component={Recipe} />
    </ApplicationStack.Navigator>
  );
}

export default AppNavigationStack;
