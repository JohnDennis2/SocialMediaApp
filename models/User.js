const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    userName:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
   email:{
    type: String,
    required: true,
      unique: true,
      match:[/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, "must have a valid email"]

   },
   thoughts:[{
    type: Schema.Types.ObjectId,
    ref:"thought"
   }],
   friends: [{
    type:Schema.Types.ObjectId,
    ref:"user"
   }]
  
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friend count").get(function(){
  return this.friends.length

})


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
