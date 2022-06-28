const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");

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

// @desc Get thought by id
// @route GET /api/thoughts/thoughtId
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__V"
    );

    if (!thought) {
      res.status(400).json({ message: "No thought with that ID" });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// ```json

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
    // // example data to create thought
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
  } catch (err) {
    res.status(500).json(err);
  }
};

// * `PUT` to update a thought by its `_id`

// * `DELETE` to remove a thought by its `_id`

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      res.status(404).json({ message: "No thought with that ID" });
    }
    res.status(200).json({ message: "Thought deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field
// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

module.exports = {
  getAllThoughts,
  createThought,
  getSingleThought,
  deleteThought,
};
