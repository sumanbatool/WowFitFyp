import React, { useState ,useEffect} from 'react';
import { View, Text, Button, StyleSheet ,TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { CardField, StripeProvider } from '@stripe/stripe-react-native';
import { baseUrl } from '../baseUrl/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { showMessage, hideMessage } from "react-native-flash-message"; // Import flash message functions
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardToken, setCardToken] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const navigation = useNavigation(); // Use useNavigation hook

  useEffect(() => {
    // Fetch user's email from AsyncStorage (assuming you've stored it there)
    async function fetchUserEmail() {
      try {
        const token = await AsyncStorage.getItem('token'); // Replace with your token key
        if (token) {
          const decodedToken = jwt_decode(token);
          console.log("token",decodedToken)
          const userId=decodedToken.userId;
          console.log("id",userId)
          const response = await axios.get(`${baseUrl}payments/users/${userId}`); // Replace with your endpoint for fetching user info
          const userEmail = response.data.email;
          setEmail(userEmail);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    }

    fetchUserEmail();
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}payments/subscribe`, {
        email: email,
        cardToken: cardToken,
      });
      console.log('Subscription Response:', response.data);
      const subscriptionId = response.data.subscription.id; 
      console.log("IDD THROUGH NAVIGATION SENT",subscriptionId)// Get the subscription ID from the response
      setSubscriptionId(subscriptionId);
      if (response.data.subscription) {
        showMessage({
          message: "You have successfully subscribed!",
          type: "success",
          style:{
            backgroundColor: "#005A9C",
            color: "black",
            fontSize: 16,
            borderRadius:15,
            borderColor:"black",
            marginTop:12,
            marginLeft:5,
            marginRight:5,
          }
        });
        navigation.navigate('Settings', { subscriptionId });      // Handle successful subscription

      } else {
        showMessage({
          message: "Subscription failed. Please try again.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error('Subscription Error:', error);
      showMessage({
        message: "Subscription failed. Please try again.",
        type: "danger",
      });
    }

    setLoading(false);
  };
  const handleCardChange = (event) => {
    if (event.complete) {
      const cardTokenObject = {
        brand: event.brand,
        last4: event.last4,
        expiryMonth: event.expiryMonth,
        expiryYear: event.expiryYear,
      };
  
      setCardToken(cardTokenObject);
      console.log("Card Token Object:", cardTokenObject);
    } else {
      setCardToken(null);
    }
  };


  

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:24, marginLeft:150,marginTop:10,color:'#116D6E'}}>Pro</Text>
      <View >
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:20,color:'#116D6E',marginTop:46,fontWeight:'bold'}}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.input}
          editable={false}
        />
        </View>
       <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: 'Card Number',
            expiration: 'MM/YY',
            cvc: 'CVC',
          }}
          placeholdertext={'grey'}
          style={styles.cardField}
          onCardChange={handleCardChange}
          cardStyle={{
            flexDirection: 'column',
            backgroundColor: 'white',
            textColor: '#000000',
          }}
        />
        <TouchableOpacity  onPress={handleSubscribe} style={styles.subscriptionButton}>
          <Text style={{color:'white',textAlign:'center',fontSize:20, fontWeight:'bold'}}disabled={loading || !cardToken}>
          {loading ? 'Subscribing...' : 'Subscribe'}
          </Text>
        </TouchableOpacity>
        {/* <Button
          // title={loading ? 'Subscribing...' : 'Subscribe'}
          // style={{marginTop:230}}
          onPress={handleSubscribe}
           //disabled={loading || !cardToken}
        /> */}
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //padding: 20,
    backgroundColor:'#FEFCF3',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:8, 
    marginLeft:3,
    marginTop:40,
    backgroundColor: 'white',
    fontWeight: 'bold',
    color:'black',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  subscriptionButton: {
    borderRadius:8, 
    backgroundColor:'#116D6E',
     height:50,
     width:200,
     marginTop:30,
     allignItems: 'center',
     justifyContent: 'center',
     marginLeft:80,

  },
});

export default Subscribe;



