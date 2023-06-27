const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");

router.get("/",questionController.viewAllQuestions);
router.get("/:id",questionController.viewQuestion);
router.post("/create",questionController.createQuestion);
router.post("/:id/option/create",questionController.createOption);
router.delete("/:id/delete",questionController.deleteQuestion);

module.exports = router;