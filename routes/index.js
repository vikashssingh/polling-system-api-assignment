const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{return res.redirect("/question")})
router.use("/question",require("./question"));
router.use("/option",require("./option"));

module.exports = router;