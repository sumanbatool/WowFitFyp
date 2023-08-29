import React from 'react';
import { View, Button } from 'react-native';
import notifee, { TriggerType, TimestampTrigger,AndroidImportance } from '@notifee/react-native';
import { add } from 'date-fns';
export default function Screen() {
  const createNotificationChannel = async () => {
    const channel = {
      id: 'workout', // Replace with your desired channel ID
      name: 'channel',
      importance: AndroidImportance.HIGH,
       // Replace with your desired channel name
    };
    await notifee.createChannel(channel);
    console.log("channel",channel)
  };
  const onCreateTriggerNotification = async () => {
    try {
      // Call the function to create the notification channel
      await notifee.requestPermission()
      await createNotificationChannel();
      const currentDate = new Date();
      const futureDate = add(currentDate, { minutes: 5 });
      const options = { timeZone: 'Asia/Karachi' }; // Replace with your local time zone
      console.log("futuredate", futureDate.toLocaleString('en-US', options));
      const futureTimestamp = futureDate.getTime();
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: futureTimestamp,
        alarmManager: true,
        importance: AndroidImportance.HIGH,
      };
      await notifee.createTriggerNotification(
        {
          title: 'Meeting with Jane',
          body: futureDate.toLocaleString(), // Display the local time in the notification body
          android: {
            channelId: 'workout', // Replace with your actual channel ID
          },
          importance: AndroidImportance.HIGH,
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
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log('Background event:', type, detail);
    });
  };

  return (
    <View>
      <Button title="Create Trigger Notification" onPress={onCreateTriggerNotification} />
    </View>
  );
}
// import React from 'react';
// import { View, Button } from 'react-native';
// import notifee from '@notifee/react-native';

// export default function Screen() {
//   async function onDisplayNotification() {
//     // Request permissions (required for iOS)
//     await notifee.requestPermission()

//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//       id: 'workout',
//       name: 'workout-reminder',
//     });
//     // Display a notification
//     await notifee.displayNotification({
//       title: 'Notification Title',
//       body: 'Main body content of the notification',
//       android: {
//         channelId,
//         //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//         // pressAction is needed if you want the notification to open the app when pressed
//         // pressAction: {
//         //   id: 'default',
//         // },
//       },
//     });
//   }

//   return (
//     <View>
//       <Button title="Display Notification" onPress={() => onDisplayNotification()} />
//     </View>
//   );
// }
