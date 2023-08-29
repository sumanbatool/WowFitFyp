import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import Button from '../buttons/Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseUrl } from '../baseUrl/baseUrl';
import FlashMessage,{showMessage,hideMessage} from 'react-native-flash-message';
import { useRoute } from '@react-navigation/native';
import BackArrowIcon from 'react-native-vector-icons/Ionicons';


const loginValidationSchema = yup.object().shape({
    password: yup
    .string()
    .min(8, ({ min }) => `Password must be atleast ${min} characters`)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,50}$/,
      'Must contain Upper and Lowercase, digit and special character.'
    ),
    } );
     const  UpdatePassword = props => {
      const { navigation } = props;
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);
        const route = useRoute();
       const email = route.params?.email;
       const [resetCode, setResetCode] = useState("");
       console.log
        return (
          <Formik
            initialValues={{ password: ''}}
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios.post(`${baseUrl}pass/resetPassword`, {
                  email: email,
                  resetCode: resetCode,
                  password: values.password,
                });
                const responseData = response.data;
                if (responseData.success) {
                  Alert.alert('Success', responseData.message);
                  navigation.navigate('Login');
                } else {
                  Alert.alert('Error', responseData.message);
                }
                setSubmitting(false);
              } catch (error) {
                setSubmitting(false);
                 Alert.alert('Error', 'Error Resetting Password');
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
                navigation.navigate('ForgotPassword')
              }} style={{marginTop:10,marginLeft:10}}>
              <BackArrowIcon name="chevron-back"
              size={24}
              color="black"
              />
              </Pressable>
              <Text style={{color:'#116D6E', marginRight:85,marginTop:9,fontSize:24,fontWeight:'bold',}} > Update Password</Text>
    
              </View>
                <TextInput
                   style={TextStyles.code}
                  placeholder="Enter 4-digit Code"
                  value={resetCode}
                  onChangeText={(text) => setResetCode(text)}
                  placeholderTextColor={'grey'}
                />
                <TextInput
                  secureTextEntry={!isPasswordVisible}
                  style={TextStyles.password}
                  placeholder="Enter New Password"
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
                    ]}>
                    {errors.password}
                  </Text>
                )}
                <TouchableOpacity
                  style={{position: 'absolute', top: 204, right: 32}}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Icon
                    name={isPasswordVisible ? 'eye' : 'eye-slash'}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                
                <Button
                  title={'Update Password'}
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
        password: {
          position: 'absolute',
    height: 48,
    left: 24,
    right: 24,
    top: 190,
    color:'black',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    // borderColor: '#E3E5E6',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize:17,
        fontWeight: 'bold',
        },
        errorspass: {
          color: 'red',
          fontWeight: 'bold',
          marginTop: 255,
          textAlign: 'justify',
          paddingLeft: 27,
          paddingRight: 27,
        },
        code: {
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
    fontSize:17,
    fontWeight: 'bold',
    color: 'black',
        },
      });
      export default UpdatePassword;
      