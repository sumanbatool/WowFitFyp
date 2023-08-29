import React, { useState,useEffect,useRef } from 'react';
import { View, Text, ScrollView, TextInput, FlatList, TouchableOpacity, StyleSheet,Image,Alert,Pressable,PanResponder} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { List ,IconButton, Portal, Dialog, Button} from 'react-native-paper';
import { baseUrl } from '../baseUrl/baseUrl';
import { format ,parse} from 'date-fns';
import { Calendar} from 'react-native-calendars';
import BottomSheet from 'react-native-raw-bottom-sheet';
import ClockIcon from 'react-native-vector-icons/SimpleLineIcons';
import Bin from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import Share from 'react-native-share';
import { isValid } from 'date-fns';

const EditWorkout = (props) => {
  const {navigation} =props;
  const [selectedDate, setSelectedDate] = React.useState('');
  const [markedDates, setMarkedDates] = React.useState({});
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [WorkoutTitle,setWorkoutTitle]=useState('')
  const [expanded, setExpanded] = useState(false);
  const route = useRoute();
  const workoutId = route.params?.workoutId;
  const bottomSheetRef = useRef();
  const [exerciseWeight, setExerciseWeight] = useState([]);
  const [exerciseReps, setExerciseReps] = useState([]);
  const [selectedMoodValue, setSelectedMoodValue] = useState(''); // Selected mood value, e.g., "I am Happy"
  const [selectedMoodImage, setSelectedMoodImage] = useState(null); // Selected mood image source
  const BottomSheetRate = useRef();
  const showBottomSheet = () => {
    bottomSheetRef.current.open();
  };
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordionCustom = (exerciseIndex) => {
    if (openIndex === exerciseIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(exerciseIndex);
    }
  };
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error getting authToken:', error);
    }
  };
  const moodOptions = [
    { imageSource:{uri:'https://i.ibb.co/qDXR95Q/happyemoji.jpg'}, value: 'I am Happy' },
    { imageSource: {uri:'https://i.ibb.co/hRv59QL/cool.jpg'}, value: 'I am Cool' },
    { imageSource: {uri:'https://i.ibb.co/cTtwbSd/calm.jpg'} , value: 'I am Calm' },
    { imageSource: {uri:'https://i.ibb.co/0G0KgX8/hard.jpg'}, value: 'Its really hard' },
    { imageSource: {uri:'https://i.ibb.co/7QjjRct/energy-Collapse.jpg'}, value: 'Complete Collapse of Energy' },
    { imageSource: {uri:'https://i.ibb.co/bP92MYk/sad.jpg'}, value: 'I am Sad' },
  ];
  const renderMoodOptions = () => {
    const moodOptionElements = moodOptions.map((option) => (
      <TouchableOpacity
       key={option.value}
        style={[
          WorkoutStyle.moodOption,
          selectedMoodValue === option.value && { borderRadius:12,borderColor:"black" ,borderWidth:2,}, // Highlight selected mood
        ]}
        onPress={() => {
          setSelectedMoodValue(option.value);
          setSelectedMoodImage(option.imageSource.uri);}}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={option.imageSource} style={WorkoutStyle.moodImage} />
          <Text style={WorkoutStyle.moodText}>{option.value}</Text>
        </View>
      </TouchableOpacity>
    ));   
    const handleDoneButtonPress = () => {
      // Perform actions for the "Done" button press
      BottomSheetRate.current.close();
      bottomSheetRef.current.close();
    };
    const addButton = (
      <TouchableOpacity  onPress={handleDoneButtonPress} key="doneButton">
        <View style={WorkoutStyle.DoneButton}>
          <Text style={WorkoutStyle.DoneButtonText}>Done</Text>
        </View>
      </TouchableOpacity>
    ); 
    return [...moodOptionElements, addButton];
  };
  const messageStyle = {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 16,
  };
const specificWorkoutDetails = async () => {
  try {   
    const response = await axios.get(`${baseUrl}workout/${workoutId}` );
    const workoutData = response.data;
    if (
      workoutData &&
      workoutData.workoutDetails &&
      workoutData.workoutDetails.length > 0
    ) {
      const firstWorkout = workoutData.workoutDetails[0];
      setWorkoutTitle(firstWorkout.title || '');
      // Trim any leading or trailing spaces from startTime and endTime
      const startTimeString = firstWorkout.startTime.trim();
      const endTimeString = firstWorkout.endTime.trim();
      // Parse the startTime and endTime
      const parsedStartTime = parse(startTimeString, 'hh:mm a', new Date());
      const parsedEndTime = parse(endTimeString, 'hh:mm a', new Date()); 
      setStartTime(parsedStartTime);
      setEndTime(parsedEndTime);
      const parsedDate = parse(firstWorkout.date, 'dd-MM-yyyy EEEE', new Date());
        // Format the parsedDate as a string in the desired format (optional step)
        const formattedDate = format(parsedDate, 'dd-MM-yyyy EEEE');
        // Set the selectedDate state with the formatted date string
        setSelectedDate(formattedDate);
      const exercisesArray = firstWorkout.exercises;
      // Transform the array of exercises into an array of objects
      const formattedExercises = exercisesArray.map((exercise) => {
        const setsArray = exercise.sets.map((set) => ({
          weight: set.weight,
          reps: set.reps,
        }));
        console.log("SETS",setsArray)
        const exerciseWeights = setsArray.map((set) => set.weight || '');
  const exerciseReps = setsArray.map((set) => set.reps || '');
  setExerciseWeight((prevWeight) => [...prevWeight, exerciseWeights]);
  setExerciseReps((prevReps) => [...prevReps, exerciseReps]);
        return {
          name: exercise.name,
          icon: exercise.icon,
          sets: setsArray, 
        };
      });
        setSelectedExercise(formattedExercises);
        setSelectedMoodValue(firstWorkout.moodValue);
        setSelectedMoodImage(firstWorkout.moodImage);
       console.log("array",formattedExercises)
    }
    console.log('Fetched Workout Data:', workoutData);
  } catch (error) {
    console.error('Error fetching workout details:', error);
  }
};
  useEffect(() => {
    specificWorkoutDetails();
  }, []);
  const handleDateSelection = (date) => {
    const selectedDateObj = new Date(date.dateString);
    const selectedDateString = format(selectedDateObj, 'dd-MM-yyyy EEEE');
    const newMarkedDates = { [date.dateString]: { selected: true, selectedColor: '#388AD6' } };
    setSelectedDate(selectedDateString);
    setMarkedDates(newMarkedDates);
  };
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  const handleStartChange = (event, selected) => {
    const currentStartTime = selected || startTime;
    setShowStartPicker(false);
    setStartTime(currentStartTime);
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
  const updateWorkout = async () => {
    try {
      // Prepare the updated workout data to send in the request
      const formattedExercises = selectedExercise.map((exercise) => ({
        name: exercise.name,
        icon: exercise.icon,
        sets: exercise.sets.map((set) => ({
          weight: set.weight,
          reps: set.reps,
        })),
      }));
      const updatedWorkoutData = {
            title: WorkoutTitle,
            date: selectedDate,
            startTime: format(startTime, 'hh:mm a'),
            endTime: format(endTime, 'hh:mm a'),
            exercises: formattedExercises,
            moodValue: selectedMoodValue, 
            moodImage: selectedMoodImage, // This contains the updated exercises array     
      };
      console.log("workouTdETAILS",updatedWorkoutData)
      const response = await axios.put(`${baseUrl}workout/${workoutId}`,
      {workoutDetails: [updatedWorkoutData]},
      );
      if (response.status === 200) {
        showMessage({
          message: 'Success',
          description: 'Workout details updated successfully',
          type: 'success',
          duration:2000,
          style:messageStyle,
        });
        navigation.navigate('main',{screen:'mainApp'})
      }
    }catch (error) {
      console.error('Error updating workout details:', error);
      showMessage({
        message: 'Error',
        description: 'Failed to update workout details',
        type: 'danger',
      });
    
    }
  };
  const handleExerciseDeletion = (exerciseIndex) => {
    const updatedExercises = [...selectedExercise];
    updatedExercises.splice(exerciseIndex, 1);
    setSelectedExercise(updatedExercises);
  };
  // const handleWeightChange = (name, text) => {
  //   setSelectedExercise((prevExercises) => {
  //     return prevExercises.map((exercise) => {
  //       if (exercise.name === name) {
  //         return { ...exercise, weight: text };
  //       }
  //       return exercise;
  //     });
  //   });
  // };
  // const handleRepsChange = (name, text) => {
  //   setSelectedExercise((prevExercises) => {
  //     return prevExercises.map((exercise) => {
  //       if (exercise.name === name) {
  //         return { ...exercise, reps: text };
  //       }
  //       return exercise;
  //     });
  //   });
  // };
  const removeSet = (exerciseName, setIndex) => {
    setSelectedExercise((prevExercises) => {
      return prevExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = exercise.sets.filter((set, index) => index !== setIndex);
        return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
    });
  };
  const handleWeightChange = (exerciseName, setIndex, text) => {
    setSelectedExercise((prevExercises) => {
      return prevExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = exercise.sets.map((set, index) => {
            if (index === setIndex) {
              return { ...set, weight: text };
            }
            return set;
          });
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
    });
  };
  
  const handleRepsChange = (exerciseName, setIndex, text) => {
    setSelectedExercise((prevExercises) => {
      return prevExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = exercise.sets.map((set, index) => {
            if (index === setIndex) {
              return { ...set, reps: text };
            }
            return set;
          });
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
    });
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${WorkoutTitle}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteWorkout(),
        },
      ],
      { cancelable: false }
    );
  };
  const deleteWorkout = () => {
    axios
      .delete(`${baseUrl}workout/${workoutId}`)
      .then((response) => {
        console.log("workout deleted")
        bottomSheetRef.current.close();  // close the bottom sheet  
        navigation.navigate('main',{screen:'mainApp'})
      })
      .catch((error) => {
        console.error('Error deleting workout:', error);
      });
  };
  const addSet = (exerciseName) => {
    setSelectedExercise((prevExercises) => {
      return prevExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newSet = { weight: '', reps: '' };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      });
    });
  };
  
  const handleCopyWorkout = async () => {
      if (!selectedDate || !startTime || !endTime || !selectedExercise || !WorkoutTitle) {
        showMessage({
          message: 'Error',
          description: 'Please fill in all the required details',
          type: 'danger',
        });
        return;
      }
      const workoutData = {
        title: WorkoutTitle,
        date: selectedDate,
        startTime: format(startTime, 'hh:mm a'),
        endTime: format(endTime, 'hh:mm a'),
        exercises: selectedExercise,
       
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
      console.log('Workout Copied successfully:', response.data);
      showMessage({
        message: 'Success',
        description: 'Workout copied successfully!',
        type: 'success',
      });
      navigation.navigate('main',{screen:'mainApp'})
    } catch (error) {
      console.error('Error coping workout:', error);
      showMessage({
        message: 'Error',
        description: 'An error occurred while coping the workout.',
        type: 'danger',
      });
    }
    bottomSheetRef.current.close();
  };
  const handleShareWorkout = () => {
      // Check if startTime and endTime are valid dates
  if (!isValid(startTime) || !isValid(endTime)) {
    showMessage({
      message: 'Error',
      description: 'Invalid start time or end time',
      type: 'danger',
    });
    return;
  }
  // Prepare the content to share using the data received as arguments
  // const shareContent = `
  //   Workout Title: ${WorkoutTitle}
  //   Date: ${selectedDate}
  //   Start Time: ${format(startTime, 'hh:mm a')}
  //   End Time: ${format(endTime, 'hh:mm a')}
  //   Exercises:
  //   ${selectedExercise.map(
  //     (exercise) => `- ${exercise.name}, Weight: ${exercise.weight}, Reps: ${exercise.reps}`
  //   ).join('\n')}
  // `;
  const shareContent = `
  Workout Title: ${WorkoutTitle}
  Date: ${selectedDate}
  Start Time: ${format(startTime, 'hh:mm a')}
  End Time: ${format(endTime, 'hh:mm a')}
  Exercises:
  ${selectedExercise.map((exercise) => {
    const setsInfo = exercise.sets
      .map((set, index) => `Set ${index + 1}: Weight: ${set.weight}, Reps: ${set.reps}`)
      .join('\n');

    return `- ${exercise.name}\n${setsInfo}`;
  }).join('\n')}
`;
  const options = {
    message: shareContent,
    title: 'Share Workout Details',
    subject: 'Workout Details', // For email
  };
  // Open the share dialog
  Share.open(options)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  // Close the bottom sheet after sharing
   bottomSheetRef.current.close();
  };
  return (
      
     <ScrollView style={{flex:1,backgroundColor:"#FEFCF3"}}>
    <View style={WorkoutStyle.container}>
    <FlashMessage></FlashMessage>
      <View style={WorkoutStyle.row}>
        <TextInput
        placeholder='Workout Title'
          style={WorkoutStyle.input}
          value={WorkoutTitle} // Step 2: Bind Form Fields to State
          onChangeText={setWorkoutTitle}
          editable = {true}
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
  <View>
{selectedExercise.map((exercise, exerciseIndex) => (
  
 
  <List.Accordion
    key={exerciseIndex}
    title={exercise.name}
    onPress={toggleAccordion}
    left={(props) => (
      <Image source={{ uri: exercise.icon }} style={WorkoutStyle.exerciseIcon} />
    )} 
  >
    {exercise.sets.map((set, setIndex) => (
      <View key={setIndex} style={{ flexDirection: "row" }}>
      <Text style={{fontSize:25,color:"black",marginTop:12,marginLeft:2,marginRight:5}}> {setIndex + 1}</Text>
        <TextInput
          style={WorkoutStyle.input1}
          //value={set.weight.toString() || ''}
          value={set.weight !== null ? set.weight.toString() : ''}
          keyboardType="numeric"
          placeholder="Weight"
          placeholderTextColor={"black"}
          onChangeText={(text) => handleWeightChange(exercise.name, setIndex, text)}
        />
        <TextInput
          style={WorkoutStyle.input2}
          //value={set.reps.toString() || ''}
          value={set.reps !== null ? set.reps.toString() : ''}
          keyboardType="numeric"
          placeholder="Reps"
          placeholderTextColor={"black"}
          onChangeText={(text) => handleRepsChange(exercise.name, setIndex, text)}
        />
        <TouchableOpacity onPress={() => addSet(exercise.name)}>
          <Icon
            name="ios-add-circle"
            size={32}
            color="#116D6E"
            style={{ marginTop: 13, marginLeft: 5}}
          />
        </TouchableOpacity>
        {setIndex !== 0 && (
      <TouchableOpacity onPress={() => removeSet(exercise.name, setIndex)}>
        <Icon
          name="ios-remove-circle"
          size={32}
          color="#116D6E"
          style={{ marginTop: 13, marginRight: 26 }}
        />
      </TouchableOpacity>
    )}
      </View>
    ))}
    
  </List.Accordion>
  
  
))}

</View>


<View style={WorkoutStyle.containerActionButton}>    
      <BottomSheet ref={bottomSheetRef} 
      height={300} 
      >
        <TouchableOpacity onPress={handleCopyWorkout} style={WorkoutStyle.bottomSheetButton}>
          <Text style={WorkoutStyle.bottomSheetButtonText}>Copy Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShareWorkout} style={WorkoutStyle.bottomSheetButton}>
          <Text style={WorkoutStyle.bottomSheetButtonText}>Share Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={WorkoutStyle.bottomSheetButton}>
          <Text style={WorkoutStyle.bottomSheetButtonText}>Delete Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => BottomSheetRate.current.open()} style={WorkoutStyle.bottomSheetButton}>
          <Text style={WorkoutStyle.bottomSheetButtonText}>Rate Workout</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
    <BottomSheet
        ref={BottomSheetRate}
        animationType="slide"
        height={600} // Adjust the height as needed
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
      >
        <View style={WorkoutStyle.bottomSheetContainer}>
          <Text style={WorkoutStyle.moodSelect}>Select your mood after Workout</Text>
          {renderMoodOptions()}       
        </View>
      </BottomSheet>
      
<View style={{flexDirection:'row', marginLeft:20,}}>
<TouchableOpacity onPress={updateWorkout} style={WorkoutStyle.actionButton}>
        <Text style={WorkoutStyle.actionButtonText}>Save</Text>
      </TouchableOpacity>
<TouchableOpacity onPress={showBottomSheet} style={WorkoutStyle.actionButton}>
        <Text style={WorkoutStyle.actionButtonText}>Actions</Text>
      </TouchableOpacity>
</View>

    </View>
   
    </ScrollView>
  );
};

const WorkoutStyle = StyleSheet.create({
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
      input1: {
        color:'white',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 12,
        fontSize:16,
        fontWeight: 'bold',
        color:'black',
        width:80,
        height:40,
        textAlign:'center',
        marginLeft:10,
        marginTop:10,
      },
      label: {
         flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
         marginLeft:5,
         color:'black',
      },
      input: {
        flex: 3,
        color:'black',
        backgroundColor: 'white',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 12,
        // width:200,
        marginBottom:10,
        fontSize:16,
        fontWeight: 'bold',
        color:'black',
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
        color: 'black',
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
  containerActionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#116D6E',
    padding: 12,
    borderRadius: 16,
    width:120,
    marginLeft:30,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 17.5,
    fontWeight: 'bold',
    paddingLeft:25,
    paddingBottom:5,
    marginLeft:-3,
  },
  bottomSheetButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    backgroundColor:'#116D6E',
    borderRadius:16,
    marginTop:15,
    width:250,
    marginLeft:80,
  },
  bottomSheetButtonText: {
    fontSize: 17.5,
    color: 'white',
    fontWeight:'bold',
    textAlign:'center',
  },
exerciseName:{
  fontWeight:"bold",
  fontSize:20,
  color:"black",
  marginTop:12,
  flexDirection:"row",
  justifyContent:"space-between",
  marginLeft:0,
  marginRight:20,
},
exerciseList:{
  width:120,
  marginLeft:50,
  borderRadius:16,
  backgroundColor:'white',
  borderColor:'black',
  marginTop:15,
  borderWidth:1,
  color:"black",
  fontWeight:"bold",
  justifyContent:"center",
  textAlign:"center",
  fontSize:18,
  height:40,
},
moodOption: {
  padding: 9,
},
bottomSheetContainer: {
  padding: 16,
  backgroundColor: 'white',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
moodImage: {
  width: 50, // Adjust the width as needed
  height: 50, // Adjust the height as needed
},
moodText:{
  marginLeft:12,
  marginTop:15,
  fontSize:18,
  color:"black",
},
moodSelect:{
  marginLeft:9,
  marginTop:5,
  fontSize:18,
  color:"black",
  marginBottom:12,
},
DoneButton:{
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#eaeaea',
  backgroundColor:'black',
  borderRadius:16,
  width:'100%',
  marginLeft:0,
  marginTop:15,
  
},
DoneButtonText:{
  fontSize: 20,
  color: 'white',
  fontWeight:'bold',
  textAlign:'center',
},
input2: {
  color:'white',
  backgroundColor: 'white',
  borderColor: 'black',
  borderWidth: 1,
  borderRadius: 12,
  fontSize:16,
  fontWeight: 'bold',
  color:'black',
  marginTop:10,
  width:80,
  height:40,
  marginLeft:15,
  textAlign:'center',
  marginBottom:10,
},
});
export default EditWorkout;