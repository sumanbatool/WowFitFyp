// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
// } from 'react-native';
// import * as yup from 'yup';
// import {Formik} from 'formik';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Button from './button';
// import axios from 'axios';
// import { baseUrl } from '../URL/baseUrl';
// import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

// const loginValidationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Please Enter Valid Email')
//     .required('Email is required'),
//   password: yup
//   .string()
//   .max(14, ({max}) => `Password must be ${max} characters long`)
//   .min(8, ({min}) => `Password must be atleast ${min} characters`)
//   .required('Password is required')
//   .matches(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,14}$/,
//     'Must be between 8 to 14 characters long,one Lowercase,one digit and one special character'
//   )
// });
// const SignUpScreen = props => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const {navigation}=props;
//   return (
//     <Formik
//       initialValues={{email: '', password: ''}}
//       validateOnMount={true}
//       validationSchema={loginValidationSchema}
//       onSubmit={(values, { setSubmitting }) => {
//   const { email, password } = values;
//   try {
//     axios
//       .post(`${baseUrl}register`, values)
//       .then(res => {
//         setSubmitting(false);
//         showMessage({
//           message: 'You are successfully registered',
//           type: 'success',
//           duration: 3000,
//           backgroundColor: "#5D8AA8",  
//         });
//         navigation.navigate('Login');
//       })
//       .catch(err => {
//         setSubmitting(false);
//         showMessage({
//           message: 'Failed to register',
//           type: 'danger',
//           duration: 3000,
//           description: err.message,
//         });
//       });
//   } catch (err) {
//     setSubmitting(false);
//     showMessage({
//       message: 'Failed to create user profile',
//       type: 'danger',
//       duration: 3000,
//       description: err.message,
//     });
//   }
// }

// }
//  >
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
//             placeholder="Email"
//             keyboardType="email-address"
//             style={TextStyles.email}
//             name="email"
//             value={values.email}
//             onChangeText={handleChange('email')}
//             onBlur={handleBlur('email')}
//           />
//           {errors.email && touched.email && (
//             <Text style={TextStyles.errors}>{errors.email}</Text>
//           )}
//           <TextInput
//             secureTextEntry={!isPasswordVisible}
//             style={TextStyles.password}
//             placeholder="Password"
//             value={values.password}
//             onChangeText={handleChange('password')}
//             onBlur={handleBlur('password')}
//             name="password"
//           />
//           {errors.password && touched.password && (
//             <Text
//               style={[
//                 TextStyles.errorspass,
//                 !errors.email && {marginTop: 250},
//               ]}>
//               {errors.password}
//             </Text>
//           )}
//           <TouchableOpacity
//             style={{position: 'absolute', top: 200, right: 32}}
//             onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
//             <Icon
//               name={isPasswordVisible ? 'eye' : 'eye-slash'}
//               size={20}
//               color="gray"
//             />
//           </TouchableOpacity>
//           <FlashMessage></FlashMessage>
//           <Button
//             title={'Register'}
//             onPress={handleSubmit}
//             disabled={!isValid}
//             isValid={isValid}
//           />
//         </View>
//       )}
//     </Formik>
//   );
// };
// const TextStyles = StyleSheet.create({
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
//   },
//   password: {
//     position: 'absolute',
//     height: 48,
//     right: 24,
//     left: 24,
//     top: 190,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E3E5E6',
//     borderRadius: 8,
//     paddingLeft: 10,

//   },
//   errors: {
//     color: 'red',
//     fontWeight: 'bold',
//     marginTop: 160,
//     paddingLeft: 27,
//   },
//   errorspass: {
//     color: 'red',
//     fontWeight: 'bold',
//     marginTop: 70,
//     textAlign: 'justify',
//     paddingLeft: 27,
//     paddingRight: 27,
//   },
// });
// export default SignUpScreen;
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../buttons/Button';
import axios from 'axios';
import { baseUrl } from '../baseUrl/baseUrl';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import BackArrowIcon from 'react-native-vector-icons/Ionicons';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Please Enter Valid Email').required('Email is required'),
  password: yup
    .string()
    // .max(14, ({ max }) => `Password can be ${max} characters long`)
    .min(8, ({ min }) => `Password must be atleast ${min} characters`)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,50}$/,
      'Must contain Upper and Lowercase, digit and special character.'
    ),
});
const SignUpScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
      onSubmit={(values, {setSubmitting}) => {
        const {email, password} = values;
        axios
          .post(`${baseUrl}register`, values)
          .then(res => {
            setSubmitting(false);
            const responseData = res.data;
            if (responseData.success) {
             Alert.alert('Success', responseData.message);
             console.log("success")
              navigation.navigate('Login'); 
            } else {
    console.log("failed")
              Alert.alert('Error', responseData.message);
            }
          })
          .catch(error => {
            setSubmitting(false);
            Alert.alert('Error', 'Error registering user');
          });
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
            navigation.navigate('Start')
          }} style={{marginTop:10,marginLeft:10}}>
          <BackArrowIcon name="chevron-back"
          size={24}
          color="black"
          />
          </Pressable>
          <Text style={{color:'#116D6E', marginRight:100,marginTop:10,fontSize:24,fontWeight:'bold',}} > Create Account</Text>

          </View>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={TextStyles.email}
            name="email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholderTextColor={'grey'}

          />
          {errors.email && touched.email && (
            <Text style={TextStyles.errors}>{errors.email}</Text>
          )}
          <TextInput
            secureTextEntry={!isPasswordVisible}
            style={TextStyles.password}
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            name="password"
            placeholderTextColor={'grey'}

          />
          {errors.password && touched.password && (
            <Text
              style={[
                TextStyles.errorspass,
                !errors.email && { marginTop: 220 },
              ]}
            >
              {errors.password}
            </Text>
          )}
          <TouchableOpacity
            style={{ position: 'absolute', top: 204, right: 32 }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <FlashMessage></FlashMessage>
          <Button
            title={'Register'}
            onPress={handleSubmit}
            disabled={!isValid}
            isValid={isValid}
          />
        </View>
      )}
    </Formik>
  );
};
const TextStyles = StyleSheet.create({
  email: {
    position: 'absolute',
    height: 48,
    left: 24,
    right: 24,
    top: 108,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
    fontSize:17,
    fontWeight: 'bold',
    color: 'black',
  },
  password: {
    position: 'absolute',
    height: 48,
    right: 24,
    left: 24,
    top: 190,
    backgroundColor: 'white',
    borderWidth: 1,
    // borderColor: '#E3E5E6',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize:17,
    fontWeight: 'bold',
    color: 'black',

  },
  errors: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 120,
    paddingLeft: 27,
  },
  errorspass: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'justify',
    paddingLeft: 27,
    paddingRight: 27,
  },
});
export default SignUpScreen;