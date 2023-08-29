import { View, Text,Pressable,StyleSheet } from 'react-native'
import React from 'react'

const BottomButton = () => {
  return (
   
      <View style={styles.bottom}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
   
  )
}
const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    // },
  
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
  
  });

export default BottomButton