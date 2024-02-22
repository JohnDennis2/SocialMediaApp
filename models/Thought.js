const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction")

// Schema to create User model
const thoughtSchema = new Schema(
  {
    userName:{
      type: String,
      required: true,
    },
    thoughtText:{
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
   createdAt:{
    type: Date,
    default: Date.now,
    get: value => new Date
    // getter formats default data in a way we choose
   },
   reactions: [reactionSchema]
  
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters:true
    },
    id: false,
  }
);

thoughtSchema.virtual("reaction count").get(function(){
  return this.reactions.length

})


// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
