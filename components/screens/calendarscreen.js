import React, {useState,useEffect,useCallback} from 'react';
import { Agenda} from 'react-native-calendars';
import {Text, View, StyleSheet, TouchableOpacity,ScrollView,RefreshControl,Image} from 'react-native';
import {format,parse} from 'date-fns';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseUrl } from '../baseUrl/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import LogoutButton from '../buttons/logoutButton';
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const WorkoutCalendar = (props) => {
  const{navigation} = props;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [monthName, setMonthName] = useState(format(new Date(), 'MMMM yyyy'));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error getting authToken:', error);
    }
  };
 
  const AgendaData = async () => {
    try {
      const authToken = await getAuthToken();
      const decoded= jwt_decode(authToken);
      const userId = decoded.userId;
      console.log("decode id",userId)
      const response = await axios.get(`${baseUrl}workout/agendaData`,
      { 
        params: {
           userId:userId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }     );
      const workouts = response.data;
      //console.log("WORKOUTS",workouts)
      const dataByDate = {};    
      workouts.forEach((workout) => {
        const workoutDetails = workout.workoutDetails[0];
        if (workoutDetails && typeof workoutDetails === 'object') {
          const { title, date, startTime, endTime ,moodImage} = workoutDetails;
          const [day, month, year] = date.split(' ')[0].split('-');
          const formattedDate = `${year}-${month}-${day}`;
          if (!dataByDate[formattedDate]) {
            dataByDate[formattedDate] = [];
          }
          dataByDate[formattedDate].push({
            __id: workout._id,//changing
            title,
            startTime,
            endTime,
            moodImage
          });
        }
      });
      const groupedData = Object.keys(dataByDate).map((date) => ({
        date,
        items: dataByDate[date],
      }));
      setWorkoutData(groupedData);
      //console.log('Grouped Workout Data:', groupedData);
    } 
    catch (error) {
      //console.error('Error fetching workout data:', error);
      if (error.name !== 'InvalidTokenError') {
        console.error('Error fetching workout data:', error);
      }
    }
  };
  
  useEffect(() => {
    AgendaData();
   }, [workoutData]);
   const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await AgendaData();
    setIsRefreshing(false);
  }, [])
  const onDayPress = day => {
    const newSelectedDate = day.dateString;
    const newMonthName = format(new Date(newSelectedDate), 'MMMM yyyy');
    if (newMonthName !== monthName) {
      setMonthName(newMonthName);
    }
    setSelectedDate(newSelectedDate);
  };
  const onMonthChange = month => {
    setMonthName(format(new Date(month.timestamp), 'MMMM yyyy'));
  };
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const theme = {
    selectedDayBackgroundColor: '#116D6E',
  };
  return (
    <>
      <View style={CalendarStyles.header}>
        <Text style={CalendarStyles.monthText}>{monthName}</Text>
        <TouchableOpacity >
          <Icon name="calendar-month-outline" size={30} color="#116D6E"  />
        </TouchableOpacity>
      </View>
      <Agenda
  items={workoutData.reduce((acc, item) => {
    acc[item.date] = item.items;
    return acc
  }, {})}
  renderItem={(item, isFirst) => (
    <ScrollView>

<TouchableOpacity style={CalendarStyles.item}  onPress={() => {
        navigation.navigate('EditWorkout', { workoutId: item.__id });//changing
        console.log('Workout ID:', item.__id);//changing
      }}>
     <Text style={CalendarStyles.title}>{item.title}</Text>
     <View style={CalendarStyles.time}>
     <Text style={CalendarStyles.itemText}>{item.startTime} - </Text>
     <Text style={CalendarStyles.itemText}>{item.endTime}</Text>
     </View>
     {/* <Image source={{ uri: item.moodImage }} style={CalendarStyles.moodImage} /> */}
     {item.moodImage ? (
  <Image source={{ uri: item.moodImage }} style={CalendarStyles.moodImage} />
) : null}

  </TouchableOpacity>
  </ScrollView>
  )}
  renderEmptyData={() => {
    return (
      <View>
        <Text   style={{textAlign:'center',marginTop:150,fontFamily:'bold',color:'#0E2954',fontSize:20,}}>There are no workout scheduled.</Text>
      </View>
    );}}
  onDayPress={onDayPress}
  onMonthChange={onMonthChange}
  style={CalendarStyles.agendaView}
  hideKnob={false}
  onCalendarToggled={toggleCalendar}
  theme={theme}
  showOnlySelectedDayItems={true}
  refreshControl={
    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
  }
/>
      <TouchableOpacity style={CalendarStyles.plusButton} onPress={() =>{
            navigation.navigate('NewWorkout')}}
            // navigation.navigate('AppMeal')}}

            >
        <Text style={CalendarStyles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </>
  );
      }
 const CalendarStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: screenHeight * 0.08,
    // backgroundColor:'#FEFCF3'
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  workoutText: {
    width: screenWidth * 0.5,
    height: 18,
    marginLeft: -95,
    marginTop: -9,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#0E0F0F',
    
  },
  plusButton: {
    fontSize: 22,
    borderColor: '#0066b2',
    margin: screenWidth * 0.8,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: '#116D6E',
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
  plusButtonText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 0,
    textAlign: 'center',
  },
  agendaItem: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noWorkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingVertical: 10,
    
  },
  item: {
    // backgroundColor: 'white',
    backgroundColor:'#FEFCF3',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: screenHeight * 0.027,
  },
  itemText: {
    color: 'black',
    fontSize: 13,
    paddingTop: 5,
    fontWeight: '400',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  time: {
    flexDirection: 'row',
  },
  moodImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginTop: -screenHeight * 0.075,
    marginLeft: screenWidth * 0.625,
  },
  agendaView:{
    // backgroundColor:'#FEFCF3',
    
  }
});
export default WorkoutCalendar;
