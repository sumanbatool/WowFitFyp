// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   Alert,
// } from 'react-native';
// import Button from '../buttons/Button';
// import * as yup from 'yup';
// import {Formik} from 'formik';
// import axios from 'axios';
// import { baseUrl } from '../baseUrl/baseUrl';
// import FlashMessage,{showMessage,hideMessage} from 'react-native-flash-message';
// //const navigation = useNavigation();

// const loginValidationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Please Enter Valid Email')
//     .required('Email is required'),
// });
// const ResetPassword = props => {
//   const {navigation}=props;
//   return (
//     <Formik
//       initialValues={{email: ''}}
//       validateOnMount={true}
//       validationSchema={loginValidationSchema}
//       onSubmit={async (values, {setSubmitting}) => {
//         try {
//           const response = await axios.post(
//             `${baseUrl}pass/forgotPassword`,
//             {
//               email: values.email,
//             },
//           );
//           // alert(response.data.message);
//           const responseData = res.data;
//             if (responseData.success) {
//               // await AsyncStorage.setItem('token', token);
//                Alert.alert('Success', responseData.message);
//               navigation.navigate('UpdatePassword',{email:values.email});
//             } else {
//               Alert.alert('Error', responseData.message);
//             }
//           // showMessage({
//           //   message: response.data.message,
//           //   type: 'success',
//           //   duration: 3000,
//           //   backgroundColor: "#5D8AA8",  
//           // });
//           // console.log(email) // Redirect to the password reset screen
//           setSubmitting(false);
//         } catch (error) {
//           setSubmitting(false);
//           // alert(error.response.data.message);
//           Alert.alert('Error', 'Error sending Email');
//         }
//       }}>
//       {({
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         values,
//         touched,
//         isValid,
//         errors,
//       }) => (
//         <View>
//           <TextInput
//             placeholder="Enter your Email"
//             keyboardType="email-address"
//             style={PasswordStyles.email}
//             value={values.email}
//             onChangeText={handleChange('email')}
//             onBlur={handleBlur('email')}
//             placeholderTextColor={'black'}
//           />
//           {errors.email && touched.email && (
//             <Text style={PasswordStyles.errors}>{errors.email}</Text>
//           )}
//           <FlashMessage></FlashMessage>
//           <Button
//             title={'Reset Password'}
//             onPress={handleSubmit}
//             disabled={!isValid}
//             isValid={isValid}
//           />
//         </View>
//       )}
//     </Formik>
//   );
// };
// const PasswordStyles = StyleSheet.create({
//   email: {
//     position: 'absolute',
//     height: 48,
//     left: 24,
//     right: 24,
//     top: 108,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 10,
//     marginBottom: 10,
//     fontSize:17,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   errors: {
//     color: 'red',
//     fontWeight: 'bold',
//     marginTop: 160,
//     paddingLeft: 27,
//   },
// });
// export default ResetPassword;
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,Pressable,
} from 'react-native';
import Button from '../buttons/Button';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { baseUrl } from '../baseUrl/baseUrl';
import BackArrowIcon from 'react-native-vector-icons/Ionicons';

import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please Enter Valid Email')
    .required('Email is required'),
});

const ResetPassword = (props) => {
  const { navigation } = props;

  return (
    <Formik
      initialValues={{ email: '' }}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.post(`${baseUrl}pass/forgotPassword`, {
            email: values.email,
          });

          const responseData = response.data;
          if (responseData.success) {
            Alert.alert('Success', responseData.message);
            navigation.navigate('UpdatePassword', { email: values.email });
          } else {
            Alert.alert('Error', responseData.message);
          }

          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
          Alert.alert('Error', 'Error sending Email');
        }
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <View style={{backgroundColor:'#FEFCF3',flex:1}}>
             <View style={{flexDirection:'row',justifyContent:'space-between',}}>
          <Pressable onPress={() =>{
            navigation.navigate('Login')
          }} style={{marginTop:10,marginLeft:10}}>
          <BackArrowIcon name="chevron-back"
          size={24}
          color="black"
          />
          </Pressable>
          <Text style={{color:'#116D6E', marginRight:85,marginTop:9,fontSize:24,fontWeight:'bold',}} > Forget Password</Text>
          </View>
          <TextInput
            placeholder="Enter your Email"
            keyboardType="email-address"
            style={PasswordStyles.email}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholderTextColor={'black'}
          />
          {errors.email && touched.email && (
            <Text style={PasswordStyles.errors}>{errors.email}</Text>
          )}
          <FlashMessage />
          <Button
            title={'Reset Password'}
            onPress={handleSubmit}
            disabled={!isValid}
            isValid={isValid}
          />
        </View>
      )}
    </Formik>
  );
};

const PasswordStyles = StyleSheet.create({
  email: {
    position: 'absolute',
    height: 48,
    left: 24,
    right: 24,
    top: 108,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  errors: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 160,
    paddingLeft: 27,
  },
});

export default ResetPassword;
