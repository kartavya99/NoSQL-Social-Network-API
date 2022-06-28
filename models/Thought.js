const { Schema } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Not enough character"],
      maxlength: 280,
    },
    createdAt: {
      type: Dae,
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
    toJSON: {},
    id: false,
  }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

module.export = thoughtSchema;
