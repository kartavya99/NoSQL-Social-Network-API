const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers);

router.route("/").post(createUser);

router.route("/:userId").get(getSingleUser);

router.route("/:userId").delete(deleteUser);

module.exports = router;
