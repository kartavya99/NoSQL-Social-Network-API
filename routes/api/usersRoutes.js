const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
  addFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers);

router.route("/").post(createUser);

router.route("/:userId").get(getSingleUser);

router.route("/:userId").delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
