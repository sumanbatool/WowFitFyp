// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// // import {TabMenu} from './TabMenu';


// import ResetPassword from '../../components/screens/resetpass';
// import StartingScreen from '../../components/screens/startingscreen';
// import SignUpScreen from '../../components/screens/signup';
// import SigninScreen from '../../components/screens/signin';
// import UpdatePassword from '../../components/screens/updatePassword';

// const AuthenticationStack = createStackNavigator();
// function AuthNavigationStack() {
//   return (
//     <AuthenticationStack.Navigator
//       initialRouteName="Start"
//       screenOptions={{headerShown: false}}>
//       <AuthenticationStack.Screen name="Start" component={StartingScreen} />
//       <AuthenticationStack.Screen name="SignUp" component={SignUpScreen} />
//       <AuthenticationStack.Screen name="Login" component={SigninScreen} />
//       <AuthenticationStack.Screen name="ForgetPassword" component={ResetPassword} />
//       <AuthenticationStack.Screen name="UpdatePassword" component={UpdatePassword} />

//     </AuthenticationStack.Navigator>
//   );
// }

// export default AuthNavigationStack;
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {TabMenu} from './TabMenu';


import ResetPassword from '../../components/screens/resetpass';
import StartingScreen from '../../components/screens/startingscreen';
import SignUpScreen from '../../components/screens/signup';
import SigninScreen from '../../components/screens/signin';
import UpdatePassword from '../../components/screens/updatePassword';

const AuthenticationStack = createStackNavigator();
function AuthNavigationStack() {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="Start"
      screenOptions={{headerShown: false}}>
      <AuthenticationStack.Screen name="Start" component={StartingScreen} />
      <AuthenticationStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthenticationStack.Screen name="Login" component={SigninScreen} />
      <AuthenticationStack.Screen name="ForgotPassword" component={ResetPassword} />
      <AuthenticationStack.Screen name="UpdatePassword" component={UpdatePassword} />

    </AuthenticationStack.Navigator>
  );
}

export default AuthNavigationStack;
