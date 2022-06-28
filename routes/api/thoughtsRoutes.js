const router = require("express").Router();

const {
  getAllThoughts,
  createThought,
  getSingleThought,
  deleteThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts);
router.route("/").post(createThought);
router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId").delete(deleteThought);

module.exports = router;
