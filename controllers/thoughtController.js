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
    console.log(err);
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

// @desc update thought data
// @route UPDATE /api/users/:thoughtId
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $set: req.body },
      // thoughtText: req.body.thoughtText,
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(400).json({ message: "No thought with that ID" });
    }
    res.status(200).json({ message: "Thought updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc delete thought data
// @route DELETE /api/users/:thoughtId

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      res.status(400).json({ message: "No thought with that ID" });
    }
    res.status(200).json({ message: "Thought deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc add reaction
// route :thoughtId/reactions
const addReaction = async (req, res) => {
  console.log("You are adding a reaction".cyan);
  console.log(req.body);
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!reaction) {
      res.status(400).json({ message: "No reaction found with that Id" });
    }
    res.status(200).json({ message: "reaction added" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

// @desc delete reaction
// @route :thoughtId/reaction/reactionId
const deleteReaction = async (req, res) => {
  try {
    const reaction = await Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    );
    if (!reaction) {
      res.status(400).json({ message: "No reaction found with that ID" });
    }
    res.status(200).status({ message: "Reaction deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  createThought,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
};
