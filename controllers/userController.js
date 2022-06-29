const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");
const colors = require("colors");
const asyncHandler = require("express-async-handler");

// @desc Get user data
// @route GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc Get user but id
//@route GET /api/users/userId
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    // .select("-__V")
    // .populate("thoughts");

    if (!user) {
      res.status(400).json({ message: "No user with that ID" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc create user data
// @route POST /api/users
const createUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
    // example data
    // {
    //     "username": "lernantino",
    //     "email": "lernantino@gmail.com"
    //   }
  }
};

//PUT - to update a user by its _id
// @desc update user data
// @route UPDATE /api/users/userId
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $set: req.body },
      { runValidators: true, new: true }
      // //$set: req.body,
      // username: req.body.username,
      // email: req.body.email,
      // runValidators: true,
      // new: true,
    );

    if (!user) {
      res.status(404).json({ message: "No use with that ID" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc delete user data
// @route DELETE /api/users/userId
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
    }
    res.status(200).json({ message: "User deleted" });
    // **BONUS**: Remove a user's associated thoughts when deleted.
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc add friend
// @route :userId/friends/:friendId
const addFriend = async (req, res) => {
  console.log("You are adding a Friend".cyan);
  console.log(req.body);
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!friend) {
      res.status(400).json({ message: "No friend found with that ID :(" });
    }
    res.status(200).json({ message: "Friend added" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc delete friend
// @route :userId/friends/:friendId
const deleteFriend = async (req, res) => {
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.userId } },
      { runValidators: true, new: true }
    );
    if (!friend) {
      res.status(404).json({ message: "NP friend found with that ID :( " });
    }
    res.status(200).status({ message: "Friend deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
  addFriend,
  updateUser,
  deleteFriend,
};
