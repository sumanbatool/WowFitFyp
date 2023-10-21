// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   StyleSheet,
//   TextInput,
//   Image,
//   ScrollView,
//   Pressable,
//   Button
// } from 'react-native';
// import axios from 'axios';
// import { Checkbox, Searchbar, RadioButton } from 'react-native-paper';
// import { baseUrl } from '../baseUrl/baseUrl';

// const ExerciseScreen = (props) => {
//   const {navigation} = props;
//   const [exercises, setExercises] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredExercises, setFilteredExercises] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [legExercises, setLegExercises] = useState([]);
//   const [mindExercises, setMindExercises] = useState([]);
//   const [wingsExercises, setWingsExercises] = useState([]);
//   const [armExercises, setarmExercises] = useState([]);
//   const [pressExercises, setpressExercises] = useState([]);
//   const [shoulderExercises, setshoulderExercises] = useState([]);
//   const [pectoralExercises, setpectoralExercises] = useState([]);
//   const [cardioExercises, setcardioExercises] = useState([]);
//   const [hipExercises, sethipExercises] = useState([]);
//   const [isChecked, setIsChecked] = useState(false);
//   const [editExercises, setEditExercises] = useState([]);


//   useEffect(() => {
//     fetchExerciseList();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory === 'Leg Muscles') {
//       LegCategory();
//     } else if (selectedCategory === 'Mind Body') {
//       MindCategory();
//     } else if (selectedCategory === 'Wings') {
//       WingsCategory();
//     } else if (selectedCategory === 'Arm Muscles') {
//       ArmCategory();
//     } else if (selectedCategory === 'Shoulder Muscles') {
//       ShoulderCategory();
//     } else if (selectedCategory === 'Hip') {
//       HipCategory();
//     } else if (selectedCategory === 'Press') {
//       PressCategory();
//     } else if (selectedCategory === 'Pectoral') {
//       Pectoralcategory();
//     } else if (selectedCategory === 'Cardio') {
//       CardioCategory();
//     }
//   }, [selectedCategory]);

//   const LegCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/leg-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setLegExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const MindCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/Mind-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setMindExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const WingsCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/wings-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setWingsExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const PressCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/Press-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setpressExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const ShoulderCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/Shoulder-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setshoulderExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const ArmCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/Arm-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setarmExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const HipCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/Hip-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setcardioExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const Pectoralcategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/Pectoral-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       setpectoralExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const CardioCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}list/Cardio-category`,
//         {
//           params: {
//             category: selectedCategory,
//           },
//         },
//       );
//       sethipExercises(response.data);
//       setFilteredExercises(response.data);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };
//   const fetchExerciseList = () => {
//     axios
//       .get(`${baseUrl}list/exercisedata`)
//       .then(response => {
//         setExercises(response.data);
//         setFilteredExercises(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching exercise list:', error);
//       });
//   };
//   const filterExercises = (query, categoryExercises = null) => {
//     setSearchQuery(query);
//     if (query.trim().length === 0) {
//       if (categoryExercises) {
//         setFilteredExercises(categoryExercises);
//       } else {
//         setFilteredExercises(exercises);
//       }
//     } else {
//       let filteredData = [];
//       if (selectedCategory === 'Leg Muscles') {
//         filteredData = legExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Mind Body') {
//         filteredData = mindExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Wings') {
//         filteredData = wingsExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Arm Muscles') {
//         filteredData = armExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Shoulder Muscles') {
//         filteredData = shoulderExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Hip') {
//         filteredData = cardioExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Press') {
//         filteredData = pressExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Pectoral') {
//         filteredData = pectoralExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else if (selectedCategory === 'Cardio') {
//         filteredData = hipExercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       } else {
//         filteredData = exercises.filter(exercise =>
//           exercise.name.toLowerCase().includes(query.toLowerCase()),
//         );
//       }
//       setFilteredExercises(filteredData);
//     }
//   };
//   const handleIconPress = category => {
//     setSelectedCategory(category);
//   };
//   const handleSearchKeyPress = event => {
//     if (event.key === 'Enter') {
//       setIsSearching(true);
//       let categoryExercises;
//       if (selectedCategory === 'Leg Muscles') {
//         categoryExercises = legExercises;
//       } else if (selectedCategory === 'Mind Body') {
//         categoryExercises = mindExercises;
//       } else if (selectedCategory === 'Wings') {
//         categoryExercises = wingsExercises;
//       } else if (selectedCategory === 'Arm Muscles') {
//         categoryExercises = armExercises;
//       } else if (selectedCategory === 'Shoulder Muscles') {
//         categoryExercises = shoulderExercises;
//       } else if (selectedCategory === 'Hip') {
//         categoryExercises = cardioExercises;
//       } else if (selectedCategory === 'Press') {
//         categoryExercises = pressExercises;
//       } else if (selectedCategory === 'Pectoral') {
//         categoryExercises = pectoralExercises;
//       } else if (selectedCategory === 'Cardio') {
//         categoryExercises = hipExercises;
//       }
//       filterExercises(event.nativeEvent.text, categoryExercises);
//     }
//   };
//   // const handleRadioButtonPress = (exerciseName) => {
//   //   setEditExercises((prevSelectedExercise) => {
//   //     if (prevSelectedExercise.includes(exerciseName)) {
//   //       // Remove exercise from selected exercises if it's already selected
//   //       return prevSelectedExercise.filter((name) => name !== exerciseName);
//   //     } else {
//   //       // Add exercise to selected exercises if it's not selected
//   //       return [...prevSelectedExercise, exerciseName];
//   //     }
//   //   });
//   // };
//   const handleRadioButtonPress = (exercise) => {
//     setEditExercises((prevSelectedExercise) => {
//       if (prevSelectedExercise.includes(exercise)) {
//         // Remove exercise from selected exercises if it's already selected
//         return prevSelectedExercise.filter((prevExercise) => prevExercise !== exercise);
//       } else {
//         // Add exercise to selected exercises if it's not selected
//         return [...prevSelectedExercise, exercise];
//       }
//     });
//   };
  
//   const handleSaveExercises = () => {
//   //  const radioValue = { exerciseName: editExercises };
//     // const exercisesToSave = editExercises.map(exerciseName => {
//     //   const exercise = exercises.find(exercise => exercise.name === exerciseName);
//     //   return { exerciseName, iconUrl: exercise.icon };
//     // });
//     const exercisesToSave = editExercises.map((exercise) => {
//       return { exerciseName: exercise.name, icon: exercise.icon };
//     });
//     const exerciseNames = editExercises.map((exercise) => exercise.name);
//   const requestData = {
//     exerciseName: exerciseNames,
//   };
//     axios
//       .post(`${baseUrl}workout/exerciseName`, requestData)
//       .then((response) => {
//         // Handle the response from the server
//         console.log('Exercise saved:', response.data);
//       })
//       .catch((error) => {
//         // Handle any errors that occurred during the request
//         console.error('Error saving exercise:', error);
//       });
//       navigation.navigate('NewWorkout', { editExercises:[exercisesToSave]});
//   };
//   const renderExerciseItem = ({ item }) => {
//     // const isChecked = editExercises.includes(item.name);
//     const isChecked = editExercises.includes(item);
//     return (
//       // <Pressable onPress={() => { handleRadioButtonPress(item.name) }}>
//               <Pressable onPress={() => { handleRadioButtonPress(item) }}>
//         <View style={Liststyles.itemContainer}>
//           <Image source={{ uri: item.icon }} style={{ width: 50, height: 50 }} />
//           <Text style={Liststyles.title}>{item.name}</Text>
//           <RadioButton
//             color="#6082B6"
//             uncheckedColor="#6082B6"
//             value={item.name}
//             status={isChecked ? 'checked' : 'unchecked'}
//             // onPress={() => handleRadioButtonPress(item.name)}
//             onPress={()=>handleRadioButtonPress(item)}
//           />
//         </View>
//       </Pressable>
//     );
//   };
//   return (
//     <View style={Liststyles.container}>
//       <Searchbar
//         placeholder="Search exercises"
//         value={searchQuery}
//         onChangeText={filterExercises}
//         onKeyPress={handleSearchKeyPress}
//         style={Liststyles.searchInput}
//       />
//       <ScrollView horizontal={true} style={Liststyles.iconGroup}>
//         <Pressable onPress={() => handleIconPress(fetchExerciseList)}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/kMHprkJ/Group-6878.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Leg Muscles')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/sFmb4vr/Group-6876.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Cardio')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/0ZKQ7x6/Group-6870.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Wings')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/vsV1SCc/Group-6875.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Arm Muscles')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/zfjYx3N/Group-6872.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Pectoral')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/kmxDBfJ/Group-6874.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Press')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/86thbfw/Group-6871.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Shoulder Muscles')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/JFWbkyG/Group-6873.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Hip')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/1M7VLjJ/Group-6877.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//         <Pressable onPress={() => handleIconPress('Mind Body')}>
//           <Image
//             source={{ uri: 'https://i.ibb.co/pWqgdnb/Group-6869.png' }}
//             style={{ width: 80, height: 80 }}></Image>
//         </Pressable>
//       </ScrollView>
//       <FlatList
//         style={Liststyles.list}
//         data={filteredExercises}
//         renderItem={renderExerciseItem}
//         keyExtractor={item => item._id.toString()}
//         contentContainerStyle={Liststyles.flatlistContent}
//         ItemSeparatorComponent={() => <View style={Liststyles.separator} />}
//       />
//       <Button title='Save'onPress={handleSaveExercises} ></Button>
//     </View>
//   );
// };

// const Liststyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   flatlistContent: {
//     flexGrow: 1,
//   },
//   itemContainer: {
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'space-between',
//   },
//   title: {
//     flex: 1,
//     fontSize: 17,
//     marginBottom: 4,
//     flexWrap: 'wrap',
//     marginLeft: 7,
//     color:'black'
//   },
//   searchInput: {
//     marginBottom: 16,
//     fontSize: 20,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#CCCCCC',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   iconGroup: {
//     marginBottom: 4
//   },
//   list: {
//     marginTop: 10
//   }


// });

// export default ExerciseScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  Button
} from 'react-native';
import axios from 'axios';
import { Checkbox, Searchbar, RadioButton } from 'react-native-paper';
import { baseUrl } from '../baseUrl/baseUrl';
import ExerciseButton from '../buttons/ExerciseButton';

const EditExercise = (props) => {
  const { navigation } = props;
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [legExercises, setLegExercises] = useState([]);
  const [mindExercises, setMindExercises] = useState([]);
  const [wingsExercises, setWingsExercises] = useState([]);
  const [armExercises, setarmExercises] = useState([]);
  const [pressExercises, setpressExercises] = useState([]);
  const [shoulderExercises, setshoulderExercises] = useState([]);
  const [pectoralExercises, setpectoralExercises] = useState([]);
  const [cardioExercises, setcardioExercises] = useState([]);
  const [hipExercises, sethipExercises] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [editExercises, setEditExercises] = useState([]);

  useEffect(() => {
    fetchExerciseList();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Leg Muscles') {
      LegCategory();
    } else if (selectedCategory === 'Mind Body') {
      MindCategory();
    } else if (selectedCategory === 'Wings') {
      WingsCategory();
    } else if (selectedCategory === 'Arm Muscles') {
      ArmCategory();
    } else if (selectedCategory === 'Shoulder Muscles') {
      ShoulderCategory();
    } else if (selectedCategory === 'Hip') {
      HipCategory();
    } else if (selectedCategory === 'Press') {
      PressCategory();
    } else if (selectedCategory === 'Pectoral') {
      Pectoralcategory();
    } else if (selectedCategory === 'Cardio') {
      CardioCategory();
    }
  }, [selectedCategory]);

  const LegCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/leg-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setLegExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const MindCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/Mind-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setMindExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const WingsCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/wings-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setWingsExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const PressCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/Press-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setpressExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const ShoulderCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/Shoulder-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setshoulderExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const ArmCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/Arm-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setarmExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const HipCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/Hip-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setcardioExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const Pectoralcategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/Pectoral-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      setpectoralExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const CardioCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list/Cardio-category`,
        {
          params: {
            category: selectedCategory,
          },
        },
      );
      sethipExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };
  const fetchExerciseList = () => {
    axios
      .get(`${baseUrl}list/exercisedata`)
      .then(response => {
        setExercises(response.data);
        setFilteredExercises(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercise list:', error);
      });
  };
  const filterExercises = (query, categoryExercises = null) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      if (categoryExercises) {
        setFilteredExercises(categoryExercises);
      } else {
        setFilteredExercises(exercises);
      }
    } else {
      let filteredData = [];
      if (selectedCategory === 'Leg Muscles') {
        filteredData = legExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Mind Body') {
        filteredData = mindExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Wings') {
        filteredData = wingsExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Arm Muscles') {
        filteredData = armExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Shoulder Muscles') {
        filteredData = shoulderExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Hip') {
        filteredData = cardioExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Press') {
        filteredData = pressExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Pectoral') {
        filteredData = pectoralExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else if (selectedCategory === 'Cardio') {
        filteredData = hipExercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      } else {
        filteredData = exercises.filter(exercise =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
      }
      setFilteredExercises(filteredData);
    }
  };
  const handleIconPress = category => {
    setSelectedCategory(category);
  };
  const handleSearchKeyPress = event => {
    if (event.key === 'Enter') {
      setIsSearching(true);
      let categoryExercises;
      if (selectedCategory === 'Leg Muscles') {
        categoryExercises = legExercises;
      } else if (selectedCategory === 'Mind Body') {
        categoryExercises = mindExercises;
      } else if (selectedCategory === 'Wings') {
        categoryExercises = wingsExercises;
      } else if (selectedCategory === 'Arm Muscles') {
        categoryExercises = armExercises;
      } else if (selectedCategory === 'Shoulder Muscles') {
        categoryExercises = shoulderExercises;
      } else if (selectedCategory === 'Hip') {
        categoryExercises = cardioExercises;
      } else if (selectedCategory === 'Press') {
        categoryExercises = pressExercises;
      } else if (selectedCategory === 'Pectoral') {
        categoryExercises = pectoralExercises;
      } else if (selectedCategory === 'Cardio') {
        categoryExercises = hipExercises;
      }
      filterExercises(event.nativeEvent.text, categoryExercises);
    }
  };
  const handleRadioButtonPress = (exercise) => {
    setEditExercises((prevSelectedExercise) => {
      if (prevSelectedExercise.some((prevExercise) => prevExercise.name === exercise.name)) {
        // Remove exercise from selected exercises if it's already selected
        return prevSelectedExercise.filter((prevExercise) => prevExercise.name !== exercise.name);
      } else {
        // Add exercise to selected exercises if it's not selected
        return [...prevSelectedExercise, exercise];
      }
    });
  };
  const handleSaveExercises = () => {
        const exercisesToSave = editExercises.map((exercise) => {
          return { exerciseName: exercise.name, icon: exercise.icon };
        });  
        console.log("EXERCISES TO SENT",exercisesToSave)
          navigation.navigate('EditWorkout', { editExercises:[exercisesToSave]});
      };
  const renderExerciseItem = ({ item }) => {
    const isChecked = editExercises.some((exercise) => exercise.name === item.name);
    return (
      <Pressable onPress={() => handleRadioButtonPress(item)}>
        <View style={Liststyles.itemContainer}>
          <Image source={{ uri: item.icon }} style={{ width: 50, height: 50 }} />
          <Text style={Liststyles.title}>{item.name}</Text>
          <RadioButton
            color="#116D6E"
            uncheckedColor="grey"
            value={item.name}
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => handleRadioButtonPress(item)}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={Liststyles.container}>
      <Searchbar
        placeholder="Search exercises"
        value={searchQuery}
        onChangeText={filterExercises}
        onKeyPress={handleSearchKeyPress}
        style={Liststyles.searchInput}
      />
      <ScrollView horizontal={true} style={Liststyles.iconGroup}>
        <View style={{marginBottom:20,flexDirection:"row"}}>
        <Pressable onPress={() => handleIconPress(fetchExerciseList)}>
          <Image
            source={{ uri: 'https://i.ibb.co/kMHprkJ/Group-6878.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Leg Muscles')}>
          <Image
            source={{ uri: 'https://i.ibb.co/sFmb4vr/Group-6876.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Cardio')}>
          <Image
            source={{ uri: 'https://i.ibb.co/0ZKQ7x6/Group-6870.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Wings')}>
          <Image
            source={{ uri: 'https://i.ibb.co/vsV1SCc/Group-6875.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Arm Muscles')}>
          <Image
            source={{ uri: 'https://i.ibb.co/zfjYx3N/Group-6872.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Pectoral')}>
          <Image
            source={{ uri: 'https://i.ibb.co/kmxDBfJ/Group-6874.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Press')}>
          <Image
            source={{ uri: 'https://i.ibb.co/86thbfw/Group-6871.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Shoulder Muscles')}>
          <Image
            source={{ uri: 'https://i.ibb.co/JFWbkyG/Group-6873.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Hip')}>
          <Image
            source={{ uri: 'https://i.ibb.co/1M7VLjJ/Group-6877.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        <Pressable onPress={() => handleIconPress('Mind Body')}>
          <Image
            source={{ uri: 'https://i.ibb.co/pWqgdnb/Group-6869.png' }}
            style={{ width: 70, height: 70 }}
          />
        </Pressable>
        </View>
      </ScrollView>
      <FlatList
        style={Liststyles.list}
        data={filteredExercises}
        renderItem={renderExerciseItem}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={Liststyles.flatlistContent}
        ItemSeparatorComponent={() => <View style={Liststyles.separator} />}
      />
      <ExerciseButton title='Save' onPress={handleSaveExercises} />
    </View>
  );
};

const Liststyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FEFCF3',
  },
  flatlistContent: {
    flexGrow: 1,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 17,
    marginBottom: 4,
    flexWrap: 'wrap',
    marginLeft: 7,
    color: 'black',
  },
  searchInput: {
    marginBottom: 16,
    fontSize: 20,
    backgroundColor:'#FFFFFF',
    borderWidth:1,
    
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  iconGroup: {
    marginBottom: 2,
    paddingTop:1,
  },
  list: {
    marginTop: 12,
  },
});

export default EditExercise;
