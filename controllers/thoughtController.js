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

// @desc create thought data
// @route POST /api/thoughts
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { runValidators: true, new: true }
    );

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc update thought data
// @route UPDATE /api/thoughts/:thoughtId
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
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
// @route DELETE /api/thoughts/:thoughtId
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

// @desc delete reaction
// @route :thoughtId/reactions/reactionId
const deleteReaction = async (req, res) => {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    if (!reaction) {
      res.status(400).json({ message: "No reaction found with that ID" });
    }
    res.status(200).json({ message: "Reaction deleted" });
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
