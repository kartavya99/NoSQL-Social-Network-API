const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");
const asyncHandler = require("express-async-handler");

// api/users
// Get - all users

// @desc Get user data
// @route GET /api/users
const getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};

// @desc Get user but id
//@route GET /api/users/id
const getSingleUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-__V")
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

// Post - a new user
// ```json
// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }
const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

//PUT - to update a user by its _id

//DELETE - to remove user byt uts _id
const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({ message: "User deleted" })
    )
    .catch((err) => res.status(500).json(err));
};
// **BONUS**: Remove a user's associated thoughts when deleted.

// **`/api/users/:userId/friends/:friendId`**
// * `POST` to add a new friend to a user's friend list
// * `DELETE` to remove a friend from a user's friend list

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
};
