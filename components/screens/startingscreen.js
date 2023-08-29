// // import React from 'react';
// // import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// // import AppButton from './startingbutton';
// // const StartingScreen = (props) => {
// //   const { navigation } = props;
// //   return (
// //     <View>
// //     <Text style={HomeScreenStyles.heading}>WowFit</Text>
// //     <Image source={require("./startingEmoji.png")}
// //         style={HomeScreenStyles.Logo}/>
// //       <Text style={HomeScreenStyles.welcomeText}>Plan your first workout!</Text>
// //      <AppButton title={'Create account'}  onPress={() => {navigation.navigate("SignUp")}}></AppButton>
// //       <View style={HomeScreenStyles.container}>
// //       <Text style={HomeScreenStyles.accountText}>Have an account ?</Text>
// //       <TouchableOpacity onPress={() => { navigation.navigate("Login")}}>
// //         <Text style={HomeScreenStyles.link}>Login</Text>
// //       </TouchableOpacity>
// //     </View>
// //     </View>
// //   );
// // };
// // const HomeScreenStyles = StyleSheet.create({
// //   heading: {
// //     color: '#0E0F0F',
// //     position: 'absolute',
// //     height: 32,
// //     left: 125,
// //     right: 130,
// //     top: 70,
// //     fontFamily: 'SF Pro Display',
// //     fontStyle: 'normal',
// //     fontWeight: 700,
// //     fontSize: 30,
// //     lineHeight: 32,
// //     textAlign: 'center',
// //   },
// //   Logo: {
// //     position: 'absolute',
// //     width: 130,
// //     height: 170,
// //     left: 135,
// //     top: 180,
// //     alignItems: 'center',
// //   },
// //   welcomeText: {
// //     position: 'absolute',
// //     width: 327,
// //     height: 35,
// //     left: '50%',
// //     marginLeft: -163.5,
// //     top: '50%',
// //     marginTop: 160,
// //     fontFamily: 'SF Pro Display',
// //     fontWeight: 'normal',
// //     fontSize: 25,
// //     lineHeight: 32,
// //     textAlign: 'center',
// //   },
// //   link:{
// //     color:"#0066b2",
// //     marginLeft: 5, 
// //      fontSize:17.5,
// //      marginTop:655
// //   },
// //   accountText:{
// //     fontSize: 17.5, 
// //     marginLeft:100,
// //     marginTop:655
// //      },
// // container: {
// //       flexDirection: 'row', 
// //        alignItems:"center"

// //   }
// // });
// // export default StartingScreen;
// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import React from 'react';
// import AppButton from '../buttons/AppButton';
// import { Dimensions } from 'react-native';
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const StartingScreen = props => {
//   const{navigation} = props;
//   return (
//     <View style={HomeScreenStyles.container}>
//       <Text style={HomeScreenStyles.heading}>WowFit</Text>
//       <Image
//         style={HomeScreenStyles.Logo}
//         source={require('../../assets/homeScreen/startingEmoji.png')}></Image>
//       <Text style={HomeScreenStyles.welcomeText}>Plan your first workout!</Text>
//       <AppButton title={'Create account'}  onPress={() =>{
//           navigation.navigate('SignUp');
//         }}></AppButton>
//       <View style={HomeScreenStyles.CreateAccountText}>
//         <Text style={{fontFamily: 'Poppins-Semibold',
//     fontWeight: 'normal',
//     fontSize: 16.5,color:'white'}}>Have an account?</Text>
//         <TouchableOpacity
//         onPress={() =>{
//           navigation.navigate('Login');
//         }}>
//           <Text style={{color: 'white',fontFamily: 'Poppins-Semibold',
//     fontWeight: 'normal',
//     fontSize: 16.5, marginLeft:4,}}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const HomeScreenStyles = StyleSheet.create({
// //   heading: {
// //     color: '#0E0F0F',
// //     position: 'absolute',
// //     height: 32,
// //     left: 150,
// //     right: 147,
// //     top: 40,
// //     fontFamily: 'Poppins-ExtraBold',
// //     fontStyle: 'normal',
// //     fontWeight: 700,
// //     fontSize: 24,
// //     lineHeight: 32,
// //     textAlign: 'center',
// //   },

// //   Logo: {
// //     position: 'absolute',
// //     width: 130,
// //     height: 170,
// //     left: 146,
// //     top: 150,
// //     alignItems: 'center',
// //   },
// //   welcomeText: {
// //     position: 'absolute',
// //     width: 327,
// //     height: 32,
// //     left: '50%',
// //     marginLeft: -163.5,
// //     top: '50%',
// //     marginTop: 400,
// //     fontFamily: 'Poppins-Regular',
// //     fontWeight: 'normal',
// //     fontSize: 26,
// //     lineHeight: 32,
// //     textAlign: 'center',
// //     color:'#331D2C',
// //   },

// //   CreateAccountText: {
// //     position: 'absolute',
// //     width: 220,
// //     left: '49%',
// //     marginLeft: -80.5,
// //     textAlign: 'center',
// //     top: 590,
// //     flexDirection: 'row',
// //   },
// // });
// container: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor:'#A1CCD1'
// },

// heading: {
//   color: 'white',
//   fontFamily: 'Poppins-ExtraBold',
//   fontWeight: '700',
//   fontSize: 24,
//   lineHeight: 32,
//   textAlign: 'center',
//   // marginBottom: 8,
//   marginTop:1,
// },

// logo: {
//   width: screenWidth * 0.4,
//   height: screenHeight * 0.25,
//   alignItems: 'center',
//   marginBottom: 20,
// },

// welcomeText: {
//   fontFamily: 'Poppins-Regular',
//   fontWeight: 'normal',
//   fontSize: 26,
//   lineHeight: 32,
//   textAlign: 'center',
//   color: 'white',
//   marginBottom: 20,
// },

// createAccountText: {
//   width: screenWidth * 0.6,
//   textAlign: 'center',
//   flexDirection: 'row',
//   paddingBottom:10,
// },
// });
// export default StartingScreen;

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity ,Image} from 'react-native';
import AppButton from '../buttons/AppButton';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const StartingScreen = (props) => {
  const { navigation } = props;

  return (
  
    // <ImageBackground
    //   source={require('../../assets/edit.png')} // Background image path
    //   style={HomeScreenStyles.bgcontainer}
    // >
      <View style={HomeScreenStyles.container} >
      <Text style={HomeScreenStyles.heading}>WowFit</Text>
      {/* <Image
        style={HomeScreenStyles.heading}
        source={require('../../assets/homeScreen/wow.png')}
      ></Image> */}
      <Image
        style={HomeScreenStyles.Logo}
        source={require('../../assets/homeScreen/startingEmoji.png')}
      ></Image>
      <Text style={HomeScreenStyles.welcomeText}>Plan your first workout!</Text>
      <AppButton
        title={'Create account'}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />
      <View style={HomeScreenStyles.CreateAccountText}>
        <Text
          style={{
            fontFamily: 'Poppins-Semibold',
            fontWeight: 'normal',
            fontSize: 16.5,
            color: 'black',
          }}
        >
          Have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text
            style={{
              color: '#116D6E',
              fontFamily: 'Poppins-bold',
              fontWeight: 'normal',
              fontSize: 16.5,
              marginLeft: 4,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    // </ImageBackground>
     );
};

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FEFCF3',
   
    // backgroundColor:'black',
  },
  bgcontainer: {
    flex: 1,
    
 
    // backgroundColor:'black',
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    color: 'black',
    marginBottom: 8,
    fontWeight: 'bold',
    
  
  },
  Logo: {
    width: 130,
    height: 170,

  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  CreateAccountText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default StartingScreen;
