import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../buttons/Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import axios from 'axios';
import { baseUrl } from '../baseUrl/baseUrl';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import BackArrowIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please Enter Valid Email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
});
const SigninScreen = props => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {navigation} = props;
  const storeTokenInAsyncStorage = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error storing token in AsyncStorage:', error);
    }
  };
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
      onSubmit=  {  (values, {setSubmitting}) => {
        const {email, password} = values;
        axios
          .post(`${baseUrl}login`, values)
          .then(res => {
            setSubmitting(false);
            const responseData = res.data;
            if (responseData.success) {
              const token = responseData.token;
              // await AsyncStorage.setItem('token', token);
               storeTokenInAsyncStorage(token);
              // Alert.alert('Success', responseData.message);
              navigation.navigate('Application',{screen:'Home'}); 
            } else {
              Alert.alert('Error', responseData.message);
            }
          })
          .catch(error => {
            setSubmitting(false);
            Alert.alert('Error', 'Error logging in user');
          });
      }} >
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
          <Text style={{color:'#116D6E', marginRight:105,marginTop:10,fontSize:22,fontWeight:'bold',}} > Welcome Back</Text>

          </View>

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={TextStyles.email}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            name="email"
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
              style={[TextStyles.errorspass, !errors.email && {marginTop: 70}]}>
              {errors.password}
            </Text>
          )}
          <TouchableOpacity
            style={{position: 'absolute', top: 204, right: 35}}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=> {
    navigation.navigate('ForgotPassword');
  }}>
            <Text style={[TextStyles.forgotText]}>Forgot Password?</Text>
          </TouchableOpacity>
          <FlashMessage></FlashMessage>
          <Button
            title={'Log in'}
            onPress={() => {
              handleSubmit(); // Call the handleSubmit function
              // navigation.navigate('Application',{screen:'Home'}); 
            }}
            disabled={!isValid}
            isValid={isValid}
          />
        </View>
      )}
    </Formik>
  );
};
// 
const TextStyles = StyleSheet.create({
  email: {
    position: 'absolute',
        height: 48,
        left: 24,
        right: 24,
        top: 108,
        backgroundColor: 'white',
        borderWidth: 1,
        // borderColor: '#E3E5E6',
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 10,
        fontSize:17,
            fontWeight: 'bold',
            color:'black',
  },
  password: {
     position: 'absolute',
    height: 48,
    left: 24,
    right: 24,
    top: 190,
    color:'black',
    backgroundColor: 'white',
    borderWidth: 1,
    // borderColor: '#E3E5E6',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize:17,
        fontWeight: 'bold',
  },
  forgotText: {
    top: 295,
        position: 'absolute',
        left: 24,
        right: 24,
        borderRadius: 48,
        color: '#116D6E',
        textAlign: 'center',
        fontSize:16,
        fontWeight: 'bold',
  },
  errors: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 160,
    paddingLeft: 27,
    position: 'absolute',
    top: 1,
    left: 0,
    right: 24,
  },
  errorspass: {
    position: 'absolute',
    color: 'red',
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'justify',
    paddingLeft: 27,
    paddingRight: 27,
    top: 178,
    left: 0,
    right: 14,
  },
});

export default SigninScreen;


