const router = require("express").Router();

const {
  getAllThoughts,
  createThought,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts);
router.route("/").post(createThought);
router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought);
router.route("/:thoughtId/reaction").post(addReaction);
router.route("/:thoughtId/reaction/reactionId").delete(deleteReaction);

module.exports = router;
