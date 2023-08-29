import React, { useState, useRef,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TouchableOpacity, Text, StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { baseUrl } from '../baseUrl/baseUrl';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const Settings = (props) => {
  const navigation = useNavigation(); // Use useNavigation hook
  const [authToken, setAuthToken] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const route = useRoute();
  const SubscriptionId = route.params?.subscriptionId; 
  console.log("SUBSCRIPTION ID",SubscriptionId)
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error getting authToken:', error);
    }
  };
  const fetchToken = async () => {
    try {
      const authToken = await getAuthToken();
      const decoded = jwt_decode(authToken);
      const subscriptionId = decoded.subscriptionId;
        console.log("id",subscriptionId)
        // Fetch subscription ID based on user ID
        // const response = await axios.get(`${baseUrl}payments/user/${userId}`);
        setSubscriptionId(subscriptionId);
      
    } catch (error) {
      console.error('Error fetching subscriptionID', error);
    }
  };
  useEffect(() => {
    fetchToken();
        console.log("SubscriptionID",subscriptionId)

  }, [subscriptionId]);
  const messageStyle = {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 16,
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setAuthToken(null);
      navigation.navigate('Start');
      console.log("Successfully Logout")

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleSubscription = () => {
    if (subscriptionId || SubscriptionId) {
      // User has a subscription, show an alert
      Alert.alert('Subscription', 'You have already subscribed.');
    } else {
      // User doesn't have a subscription, navigate to the Pricing screen
      navigation.navigate('Pricing');
    }
  };
  return (
    <View style={{backgroundColor:'#FEFCF3',flex:1}}>
      <Text style={settings.heading}>Settings</Text>
      <TouchableOpacity onPress={handleSubscription}>
      <View style={settings.proContainer}>
      <Text style={settings.pro}>Buy a PRO - access diet plan based on calories</Text>
      </View>
      </TouchableOpacity>
      {subscriptionId && (
        // User has a subscription, show access diet plan button
        <TouchableOpacity onPress={() => navigation.navigate('AppMeal')}>
          <View style={settings.proContainer}>
            <Text style={settings.pro}>Access Diet Plan</Text>
          </View>
        </TouchableOpacity>
      )}
      {SubscriptionId ?   <TouchableOpacity onPress={() => navigation.navigate('AppMeal')}>
          <View style={settings.proContainer}>
            <Text style={settings.pro}>Access Diet Plan</Text>
          </View>
        </TouchableOpacity> : null}
      <TouchableOpacity onPress={handleLogout} >
      <View style={settings.logOutCont}>
      <Text style={settings.logoutText}>Logout</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
  
};
const settings=StyleSheet.create({
  heading:{
   fontSize:28,
   //fontWeight:"bold",
   color:"black",
   marginTop:30,
   marginLeft:140,
  },
  pro:{
    fontSize:20,
    //fontWeight:"bold",
    color:"black",
    marginTop:20,
    marginLeft:20,
    marginBottom:12,
    marginRight:12,
  },
  proContainer:{
    borderColor:"#DCDCDC",
    borderWidth:2,
    marginTop:42,
    marginRight:12,
    marginLeft:12,
    borderRadius:18,
  },
  logOutCont:{
    borderColor:"#DCDCDC",
    borderWidth:2,
    marginTop:22,
    marginRight:12,
    marginLeft:12,
    borderRadius:18,
  },
  logoutText:{
    fontSize:20,
    //fontWeight:"bold",
    color:"black",
    marginTop:15,
    marginLeft:20,
    marginBottom:12,
    marginRight:12,
  },
})

export default Settings;
