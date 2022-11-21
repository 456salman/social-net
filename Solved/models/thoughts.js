const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// Schema to create Post model
const thoughtsSchema = new Schema(
  {
    thoughtsT: {
      type: String,
      Required: true,
      minlength:1,
      maxlength:300,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      Required: true
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getreaction` that gets the amount of reaction associated with an thoughts
thoughtsSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.reaction.length;
  });

// Initialize our thoughts model
const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;
