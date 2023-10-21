// import React, { useEffect } from 'react';
// import AuthNavigationStack from './authentication/index (1)';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import { Linking } from 'react-native';
// import AppNavigationStack from './app';
// const AppStack = createStackNavigator();
// export const navigationRef = React.createRef();

// // Authentication navigation container for Auth screen like ( login, signup, forget password, reset password screens)
// function AppContainer() {
//   return (
//     <NavigationContainer linking={linking}>
//       <AppStack.Navigator
//         initialRouteName="Authentication"
//         //  initialRouteName='Application'
//         screenOptions={{headerShown: false}}>
//         <AppStack.Screen name="Authentication" component={AuthNavigationStack} />
//         <AppStack.Screen name="Application" component={AppNavigationStack} />
//       </AppStack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppContainer;
import AuthNavigationStack from './authentication/index (1)';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigationStack from './app';
const AppStack = createStackNavigator();
// Authentication navigation container for Auth screen like ( login, signup, forget password, reset password screens)
function AppContainer() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Authentication"
        // initialRouteName='Application'
        screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Authentication" component={AuthNavigationStack} />
        <AppStack.Screen name="Application" component={AppNavigationStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
