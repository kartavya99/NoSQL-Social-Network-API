// const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");
const asyncHandler = require("express-async-handler");

// api/users
// Get - all users

// @desc Get user data
// @route GET /api/users
const getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Get  - a ingle user by its _id

// Post - a new user
// ```json
// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }
const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

//PUT - to update a user by its _id
//DELETE - to remove user byt uts _id
// **BONUS**: Remove a user's associated thoughts when deleted.

// **`/api/users/:userId/friends/:friendId`**
// * `POST` to add a new friend to a user's friend list
// * `DELETE` to remove a friend from a user's friend list

module.exports = {
  getAllUsers,
  createUser,
};
