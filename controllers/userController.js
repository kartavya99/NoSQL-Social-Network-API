const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");
const colors = require("colors");
const asyncHandler = require("express-async-handler");

// api/users
// Get - all users

// @desc Get user data
// @route GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc Get user but id
//@route GET /api/users/userId
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__V");

    if (!user) {
      res.status(400).json({ message: "No user with that ID" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc create user data
// @route POST /api/users
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
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

// **`/api/users/:userId/friends/:friendId`**
const addFriend = (req, res) => {
  console.log("You are adding a friend".cyan.underline);
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friend: req.boyd } },
    { runValidators: true, new: true }
  )
    .then((friend) =>
      !friend
        ? res
            .status(400)
            .json({ message: "No friend found with that ID :(".cyan })
        : res.json(student)
    )
    .catch((err) => res.status(500).json(err));
};

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
  addFriend,
};
