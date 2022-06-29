const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
  addFriend,
  updateUser,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers);

router.route("/").post(createUser);

router.route("/:userId").get(getSingleUser);

router.route("/:userId").put(updateUser);

router.route("/:userId").delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend);

router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
