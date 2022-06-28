const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");

// **`/api/thoughts`**
// * `GET` to get all thoughts

// @desc get thoughts data
// @route GET /api/thoughts

const getAllThoughts = async (req, res) => {
  try {
    const thought = await Thought.find();
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// * `GET` to get a single thought by its `_id`

// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// @desc create thought data
// @route POST /api/thoughts
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
      userId: req.body.userId,
    });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// * `PUT` to update a thought by its `_id`
// * `DELETE` to remove a thought by its `_id`

// **`/api/thoughts/:thoughtId/reactions`**
// * `POST` to create a reaction stored in a single thought's `reactions` array field
// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

module.exports = {
  getAllThoughts,
  createThought,
};
