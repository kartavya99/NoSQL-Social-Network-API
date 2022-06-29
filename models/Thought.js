const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Not enough character"],
      maxlength: [280, "exceeding character"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get:
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
    },
    // * `reactions` (These are like replies)
    //   * Array of nested documents created with the `reactionSchema`
    reactions: [reactionSchema],
  },
  {
    //getters: true according to mini project
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
