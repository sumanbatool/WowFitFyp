 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
// const WorkoutSchema = new Schema({
//   exerciseName:[String],
// });
// const Workout = mongoose.model('workout', WorkoutSchema);
// module.exports = Workout;
const WorkoutSchema = new mongoose.Schema({
  createdBy: 
    { type: Schema.Types.ObjectId,
       ref: 'User' 
      },
  workoutDetails: [
    {
      title: String,
      date: String,
      startTime: String,
      endTime: String,
      moodValue : String,
      moodImage : String,
      exercises: [
        {
          name: String,  
          icon:String,
          sets: [{
            weight: Number,
            reps: Number
          }
          ]
        },
      ],
    },
  ],
});
const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;

