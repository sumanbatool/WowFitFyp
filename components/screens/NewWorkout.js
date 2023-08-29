import React, { useState, useEffect } from 'react';
import { View, TextInput,Platform, StyleSheet, TouchableOpacity, Text, LayoutAnimation,Dimensions, Image, ScrollView,KeyboardAvoidingView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal, Portal, Button } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format ,differenceInMilliseconds,parse,add} from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import ClockIcon from 'react-native-vector-icons/SimpleLineIcons';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useRoute } from '@react-navigation/native';
import { List } from 'react-native-paper';
import ExerciseButton from '../buttons/ExerciseButton';
import axios from 'axios';
import { baseUrl } from '../baseUrl/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import notifee, { TimestampTrigger, TriggerType,AndroidImportance } from '@notifee/react-native';
// import Header from './NewWorkoutHeader';

const NewWorkout = (props) => {
  const { navigation,userId } = props;
  const refRBSheet = React.useRef();
  const [selectedDate, setSelectedDate] = React.useState(format(new Date(), 'dd-MM-yyyy EEEE'));
  const [markedDates, setMarkedDates] = React.useState({});
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);
  const [workoutTitle, setWorkoutTitle] = React.useState('');
  const [workoutDetails, setWorkoutDetails] = useState(null); // Initialize workoutDetails to null
  const [expanded, setExpanded] = useState(false);
  const [exerciseWeight, setExerciseWeight] = useState({});
  const [exerciseReps, setExerciseReps] = useState({});
  const [exerciseSets, setExerciseSets] = useState({});
  const [sets, setSets] = useState([{ weight: '', reps: '' }]);
  const [exerciseData, setExerciseData] = useState([]); // Initialize as an empty array
  const route = useRoute();
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);
  const windowHeight = Dimensions.get('window').height; // Updated: Add selectedExercise state
  // const workoutId = route.params?.workoutId;
//  console.log('recieved id',workoutId)
// Assuming you have already stored the token in AsyncStorage during login
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting authToken:', error);
  }
};
  // useEffect(() => {
  //   if (route.params?.selectedExercise) {
  //     const exercises = route.params.selectedExercise[0];//changing for the exercises to appear
  //     setSelectedExercise(exercises);
  //   }
  // }, [route.params?.selectedExercise]);
  useEffect(() => {
    if (route.params?.selectedExercise) {
      const exercises = route.params.selectedExercise[0];
      setSelectedExercise(exercises);
        const initialData = exercises.map((exercise) => ({
        sets: [{ weight: '', reps: '' }], // Initialize with one set
      }));
      setExerciseData(initialData);
    }
  }, [route.params?.selectedExercise]);
  console.log("Exercises",selectedExercise)
  const handleDateSelection = (date) => {
    const selectedDateObj = new Date(date.dateString);
    const selectedDateString = format(selectedDateObj, 'dd-MM-yyyy EEEE');
    const newMarkedDates = { [date.dateString]: { selected: true, selectedColor: '#388AD6' } };

    setSelectedDate(selectedDateString);
    setMarkedDates(newMarkedDates);
  };
  const messageStyle = {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 16,
  };
  
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const toggleAccordion = () => {
    // LayoutAnimation.easeInEaseOut();
    setExpanded(!expanded);
  };
  const handleStartChange = (event, selected) => {
    const currentStartTime = selected || startTime;
    setShowStartPicker(false);
    setStartTime(currentStartTime);
  };
  // const handleWeightChange = (text, setIndex) => {
  //   const newSets = [...sets];
  //   newSets[setIndex].weight = text;
  //   setSets(newSets);
  // };

  // const handleRepsChange = (text, setIndex) => {
  //   const newSets = [...sets];
  //   newSets[setIndex].reps = text;
  //   setSets(newSets);
  // };
  const handleWeightChange = (text, exerciseIndex, setIndex) => {
    setExerciseWeight((prevWeight) => ({
      ...prevWeight,
      [exerciseIndex]: {
        ...prevWeight[exerciseIndex],
        [setIndex]: text,
      },
    }));
  };
  
  const handleRepsChange = (text, exerciseIndex, setIndex) => {
    setExerciseReps((prevReps) => ({
      ...prevReps,
      [exerciseIndex]: {
        ...prevReps[exerciseIndex],
        [setIndex]: text,
      },
    }));
  };
    // const handleAddSet = (exerciseIndex) => {
    //   setSets([...sets, { weight: '', reps: '' }]);     
    // };
    const handleAddSet = (exerciseIndex) => {
      setExerciseData((prevData) => {
        const updatedData = [...prevData];
        updatedData[exerciseIndex].sets.push({ weight: '', reps: '' });
        return updatedData;
      });
    };  
  const handleEndChange = (event, selected) => {
    const currentEndTime = selected || endTime;
    setShowEndPicker(false);
    if (startTime && currentEndTime) {
      if (currentEndTime <= startTime) {
        setEndTime(null);
        showMessage({
          message: 'Error',
          description: 'End time should be after the start time',
          type: 'danger',
        });
        return;
      }
    }
    setEndTime(currentEndTime);
  };
  const createNotificationChannel = async () => {
    const channel = {
      id: 'workout', // Replace with your desired channel ID
      name: 'workout-reminder', // Replace with your desired channel name
    };
    await notifee.createChannel(channel);
    console.log("channel",channel)
  };
  
    const handleSave = async () => {
    if (!selectedDate || !startTime || !endTime || !selectedExercise || !workoutTitle) {
      showMessage({
        message: 'Error',
        description: 'Please fill in all the required details',
        type: 'danger',
      });
      return;
    }
    const exercisesWithWeightReps = selectedExercise.map((exercise, index) => ({
      ...exercise,
      name: exercise.exerciseName,
      weight: exerciseWeight[index] || '',
      reps: exerciseReps[index] || '',
      icon:exercise.icon,
    }));
    const exercisesWithSets = selectedExercise.map((exercise, exerciseIndex) => {
      const exerciseSets = exerciseData[exerciseIndex].sets.map((set, setIndex) => ({
        weight: exerciseWeight[exerciseIndex]?.[setIndex] || '',
        reps: exerciseReps[exerciseIndex]?.[setIndex] || '',
      }));
      return {
        name: exercise.exerciseName,
        icon: exercise.icon,
        sets: exerciseSets,
      };
    });
console.log("EXERCISES",exercisesWithWeightReps)
    const workoutData = {
      title: workoutTitle,
      date: selectedDate,
      startTime: format(startTime, 'hh:mm a'),
      endTime: format(endTime, 'hh:mm a'),
      exercises: exercisesWithSets,
    };
    try {
      const authToken = await getAuthToken();
      const decoded=jwt_decode(authToken);
      console.log("decode",decoded)
      const response = await axios.post(`${baseUrl}workout/workoutDetails`,
       { workoutDetails: [workoutData] ,createdBy:decoded.userId},
       {headers: {
        Authorization: `Bearer ${authToken}`,
      }}
      );
      console.log('Workout saved successfully:', response.data);
      showMessage({
        message: 'Success',
        description: 'Workout saved successfully!',
        type: 'success',
        style:messageStyle,
      });
        try {
          // Call the function to create the notification channel
          await notifee.requestPermission()
          await createNotificationChannel();
          const startTimeDate = new Date(startTime);
          console.log("startTime",startTimeDate)
          const startTimestamp = startTimeDate.getTime();
          console.log("startTimestamp",startTimestamp)
          console.log("startTime", startTimeDate.toLocaleString())
          const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: startTimestamp,
            alarmManager: true,
          };
          await notifee.createTriggerNotification(
            {
              title: 'Workout Reminder',
              // body: startTimeDate.toLocaleString(),
              body:'Your workout time is here..',
              android: {
                channelId: 'workout',
                sound:'default',
                //smallIcon:'ic_notification', // Replace with your actual channel ID
              },
            },
            trigger,
          );
          notifee.onBackgroundEvent(async ({ type, detail }) => {
            console.log('Background event:', type, detail);
          });
          console.log("Notifaction scheduled")
        } catch (error) {
          console.log('Error:', error);
        }
      navigation.navigate('main',{screen:'mainApp'})
    } catch (error) {
      console.error('Error saving workout:', error);
      showMessage({
        message: 'Error',
        description: 'An error occurred while saving the workout.',
        type: 'danger',
      });
    }
  };
  // const ExerciseItem = ({ exercise,index }) => {
  //   const [expanded, setExpanded] = useState(false);
  //   const [exerciseWeight, setExerciseWeight] = useState({});
  // const [exerciseReps, setExerciseReps] = useState({});
  //   const toggleAccordion = () => {
  //     LayoutAnimation.easeInEaseOut();
  //     setExpanded(!expanded);
  //   };
  //   const handleWeightChange = (index, text) => {
  //     setExerciseWeight((prevWeight) => ({
  //       ...prevWeight,
  //       [index]: text,
  //     }));
  //   };
  //   const handleRepsChange = (index, text) => {
  //     setExerciseReps((prevReps) => ({
  //       ...prevReps,
  //       [index]: text,
  //     }));
  //   };
  //   return (
  //     <List.Accordion
  //       title={exercise.exerciseName}
  //       onPress={toggleAccordion}   
  //       expanded={expanded} // Use the corresponding expanded state
  //       left={(props) => <Image source={{ uri: exercise.icon }} style={WorkoutStyle.exerciseIcon} />}
  //     >
  //       <View style={WorkoutStyle.row}>
  //         <Text style={WorkoutStyle.label}>Weight:</Text>
  //         <TextInput
  //           style={WorkoutStyle.input}
  //           value={exerciseWeight[index] || ''}
  //           onChangeText={(text) => handleWeightChange(index, text)}
  //           keyboardType="numeric"
          
  //         />
  //       </View>
  //       <View style={WorkoutStyle.row}>
  //         <Text style={WorkoutStyle.label}>Reps:</Text>
  //         <TextInput
  //           style={WorkoutStyle.input}
  //           value={exerciseReps[index] || ''}
  //           onChangeText={(text) => handleRepsChange(index, text)}
  //           keyboardType="numeric"
  //         />
  //       </View>
  //     </List.Accordion>
  //   )
  // }
    // const handleWeightChange = (index, text) => {
    //   setExerciseWeight((prevWeight) => ({
    //     ...prevWeight,
    //     [index]: text,
    //   }));
    // };
    // const handleRepsChange = (index, text) => {
    //   setExerciseReps((prevReps) => ({
    //     ...prevReps,
    //     [index]: text,
    //   }));
    // };
    const handleDeleteExercise = (exerciseIndex) => {
      const updatedExercises = [...selectedExercise];
      updatedExercises.splice(exerciseIndex, 1);
      setSelectedExercise(updatedExercises);
      setDeleteModalVisible(false)
    };
    const removeSet = (exerciseIndex, setIndex) => {
      setExerciseData((prevData) => {
        const updatedData = [...prevData];
        const updatedSets = updatedData[exerciseIndex].sets.filter(
          (_, index) => index !== setIndex
        );
        updatedData[exerciseIndex].sets = updatedSets;
        return updatedData;
      });
    };
    
  return (
    <>
    <ScrollView style={[WorkoutStyle.container, { height: windowHeight }]}>
        <View >
          <FlashMessage />
          <View style={WorkoutStyle.row}>
            <TextInput
              style={WorkoutStyle.TitleInput}
              value={workoutTitle}
              onChangeText={setWorkoutTitle}
              placeholder='Workout Title'
              placeholderTextColor={'black'}
            />
          </View>
          <View style={WorkoutStyle.row}>
          <Icon name="ios-calendar" size={24} color="#116D6E" style={WorkoutStyle.icon} />
            <Text style={WorkoutStyle.label}>Date:</Text>
            <TouchableOpacity onPress={toggleCalendar}>
              <Text style={WorkoutStyle.dateText}>{selectedDate}</Text>
            </TouchableOpacity>
          </View>
          {isCalendarOpen && (
            <Calendar
              onDayPress={handleDateSelection}
              markedDates={markedDates}
              theme={{
                selectedDayBackgroundColor: '#116D6E',
                todayTextColor: '#116D6E',
                arrowColor: '#116D6E',
                textDisabledColor: '#D9E1E8',
              }}
            />
          )}
          <View style={WorkoutStyle.row}>
          <ClockIcon name="clock" size={24} color="#116D6E" style={WorkoutStyle.icon} />
            <Text style={WorkoutStyle.label}>Start Time:</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
              <Text style={WorkoutStyle.dateText}>
                {startTime ? format(startTime, 'hh:mm a') : 'Select start time'}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startTime || new Date()}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={handleStartChange}
              />
            )}
          </View>
          <View style={WorkoutStyle.row}>
          <ClockIcon name="clock" size={24} color="#116D6E" style={WorkoutStyle.icon} />
            <Text style={WorkoutStyle.label}>End Time:</Text>
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
              <Text style={WorkoutStyle.dateText}>
                {endTime ? format(endTime, 'hh:mm a') : 'Select end time'}
              </Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endTime || new Date()}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={handleEndChange}
              />
            )}
          </View>
          <View style={WorkoutStyle.row}>
          <Icons name="dumbbell" size={24} color="#116D6E" style={WorkoutStyle.icon} />
            <TouchableOpacity onPress={() => navigation.navigate('exercises')}>
              <Text style={WorkoutStyle.linkText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
                    {/* {selectedExercise.map((item, index) => (
          <List.Accordion
      title={item.exerciseName}
      onPress={toggleAccordion}
      //expanded={expanded}
      left={(props) => <Image source={{ uri: item.icon }} style={WorkoutStyle.exerciseIcon} />}
    >
       {sets.map((set, setIndex) => (
        <View key={setIndex} style={{ flexDirection: 'row' }}>
          <TextInput
            style={WorkoutStyle.input1}
            // value={set.weight}
            // onChangeText={(text) => handleWeightChange(text, setIndex)}
            value={exerciseWeight[index]?.[setIndex] || ''}
            onChangeText={(text) => handleWeightChange(text, index, setIndex)}
            keyboardType="numeric"
            placeholder='Weight'
            placeholderTextColor={'black'}
          />
          <TextInput
            style={WorkoutStyle.input2}
            // value={set.reps}
            // onChangeText={(text) => handleRepsChange(text, setIndex)}
            value={exerciseReps[index]?.[setIndex] || ''}
        onChangeText={(text) => handleRepsChange(text, index, setIndex)}
            keyboardType="numeric"
            placeholder='Reps'
            placeholderTextColor={'black'}
          />
        </View>
      ))}
      <TouchableOpacity onPress={handleAddSet}>
        <Icon name="ios-add-circle" size={24} color="#8B5AC3" style={WorkoutStyle.icon} />
      </TouchableOpacity>
    </List.Accordion>
        ))} */}
      {selectedExercise.map((item, exerciseIndex) => (
        <ScrollView>
  <List.Accordion
    key={exerciseIndex}
    title={item.exerciseName}
    onPress={toggleAccordion}
    onLongPress={() => {
      setExerciseToDelete(item); // Set the exercise to delete
      setDeleteModalVisible(true); // Open the delete modal
    }}
    left={(props) => (
      <Image source={{ uri: item.icon }} style={WorkoutStyle.exerciseIcon} />
    )}
  >
    {exerciseData[exerciseIndex].sets.map((set, setIndex) => (
      <View key={setIndex} style={{ flexDirection: 'row' }}>
        {/* <View style={{borderColor:"black",borderWidth:2,borderRadius:32,marginLeft:-5}}> */}
                <Text style={{fontSize:25,color:"black",marginTop:12,marginLeft:2,marginRight:7}}> {setIndex + 1}</Text>
                {/* </View> */}
        <TextInput
          style={WorkoutStyle.input1}
          //value={set.weight}
          value={exerciseWeight[exerciseIndex]?.[setIndex] || ''}
          onChangeText={(text) =>
            handleWeightChange(text, exerciseIndex, setIndex)
          }
          keyboardType="numeric"
          placeholder="Weight"
          placeholderTextColor={'grey'}
        />
        <TextInput
          style={WorkoutStyle.input2}
          value={exerciseReps[exerciseIndex]?.[setIndex] || ''}
          onChangeText={(text) =>
            handleRepsChange(text, exerciseIndex, setIndex)
          }
          keyboardType="numeric"
          placeholder="Reps"
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity onPress={() => handleAddSet(exerciseIndex)}>
      <Icon name="ios-add-circle" size={32} color="#116D6E" style={{marginTop:13,marginLeft:2,}} />
    </TouchableOpacity>
    {setIndex !== 0 && (
      <TouchableOpacity onPress={() => removeSet(exerciseIndex, setIndex)}>
                  <Icon
          name="ios-remove-circle"
          size={32}
          color="#116D6E"
          style={{ marginTop: 13, marginRight: 40 }}
        />
      </TouchableOpacity>
    )}
      </View>
    ))}    
  </List.Accordion>
  </ScrollView>
))}
        </View>
        <Portal>
        <Modal
          visible={deleteModalVisible}
          onDismiss={() => setDeleteModalVisible(false)}
          contentContainerStyle={WorkoutStyle.modalContainer}
        >
          <Text style={{color:"black",marginLeft:12,fontSize:20,}}>Are you sure you want to delete this exercise?</Text>
          <Button mode="outlined" onPress={handleDeleteExercise} style={{marginBottom:20,marginTop:22,marginRight:32,marginLeft:32}}>
            Delete Exercise
          </Button>
          <Button mode="outlined" onPress={() => setDeleteModalVisible(false)} style={{marginBottom:20,marginTop:5,marginRight:32,marginLeft:32,}}>
            Cancel
          </Button>
        </Modal>
      </Portal>
        </ScrollView>
        <View style={WorkoutStyle.saveButtonContainer}>
       <ExerciseButton onPress={handleSave} title="Save Workout" />
       </View>
    
    </>
  );
};

 const WorkoutStyle = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginLeft:35,
    marginRight:35,
  },
  container: {
    flex: 1,
    padding: 20,
     backgroundColor: '#FEFCF3',
     
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:10,
    color: 'black',
  },
  TitleInput:{
    flex: 3,
    color:'white',
    backgroundColor: '#FFFFFF',
    // backgroundColor: '#FAF3F0',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 12,
    // width:50,
    marginBottom:10,
    fontSize:16,
    fontWeight: 'bold',
    color:'black',
  },
  input1: {
    // flex: 3,
    color:'white',
    backgroundColor: 'white',
    // height: 40,
    borderColor: 'black',
    borderWidth: 1,
    // paddingHorizontal: 10,
    borderRadius: 12,
    // width:50,
    // marginBottom:10,
    fontSize:16,
    fontWeight: 'bold',
    color:'black',
    width:80,
    height:40,
    textAlign:'center',
    marginLeft:2,
    marginTop:10,
  },
  input2: {
    // flex: 3,
    color:'white',
    backgroundColor: 'white',
    // height: 40,
    borderColor: 'black',
    borderWidth: 1,
    // paddingHorizontal: 10,
    borderRadius: 12,
    // width:50,
    // marginBottom:10,
    fontSize:16,
    fontWeight: 'bold',
    color:'black',
    marginTop:10,
    width:80,
    height:40,
    marginLeft:20,
    textAlign:'center',
    marginBottom:10,
  },
  dateText: {
    fontSize: 17,
    color: 'black',
    // textDecorationLine: 'underline',
    marginLeft: 5,
    fontWeight: 'bold',
    
  },
  linkText: {
    fontSize: 22,
    color: '#116D6E',
    // textDecorationLine: 'underline',
    marginLeft: 5,
    marginTop:10,
    paddingBottom:10,
    fontFamily:'Poppins-SemiBold'
  },
  exerciseIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  exerciseDetails: {
    paddingVertical: 10,
    paddingLeft: 40, 
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  exerciseTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  }, 
  saveButtonContainer: {
  backgroundColor: '#FEFCF3',
   padding:10,
   paddinTop:12,
  },
});
export default NewWorkout;



