import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Pricing = () => {
    const navigation = useNavigation(); // Use useNavigation hook
  const { width, height } = Dimensions.get('window'); // Get screen dimensions

  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={styles.title}>Buy a PRO</Text>
      <Image source={require('../../assets/homeScreen/startingEmoji.png')} style={styles.image} />
      <Text style={styles.text}>
        When you subscribe, you will get instant access to a diet plan based on calories.
      </Text>
      <Text style={styles.subscriptionText}>$10/month for a diet plan</Text>
      <TouchableOpacity style={styles.subscribeButton} onPress={()=>navigation.navigate('Subscribe')}>
        <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    backgroundColor:'#FEFCF3'
  },
  title: {
    fontSize: 25,
    color: 'black',
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.1,
  },
  image: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.45,
    resizeMode: 'contain',
    marginBottom: screenHeight * 0.01,
  },
  text: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    margin:20,
    marginBottom:50,
  },
  subscriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
    marginBottom:5,
  },
  subscribeButton: {
    backgroundColor:'#116D6E',
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 35,
    marginTop: screenHeight * 0.05,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Pricing;
