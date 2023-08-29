import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonTabIcon from 'react-native-vector-icons/Ionicons';
import WorkoutCalendar from '../../components/screens/calendarscreen'
import Settings from '../../components/screens/Settings';
import AgendaComponent from '../../components/screens/EditWorkout';

export function TabMenu() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white', // Change this to your desired background color
        },
        tabBarActiveTintColor: '#DF2E38',
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: function ({ focused, color }) {
            // return <SimpleIcon name="settings" size={24} color={color} />;
           return <Icon name="calendar-month-outline" size={24} color={color} />
          },
        }}
        name="mainApp"
        component={WorkoutCalendar}
      />
      <Tab.Screen
        options={{
          tabBarIcon: function ({ focused, color }) {
            return <IonTabIcon name="settings" size={24} color={color} />;
          },
        }}
        name="Settings"
        component={Settings}
      />
 
    </Tab.Navigator>
  );
      }
