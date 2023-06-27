const Question = require("../models/question");
const Option = require("../models/option");

module.exports.addVote = async (req, res) => {
  try {
    let option = await Option.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    console.log(option);
    if (!option) {
      return res.status(400).json({
        error: {
          message: "Option id is Invalid or the Option might have been Deleted",
        },
      });
    }

    return res.status(200).json({
      message: "Vote Added Successfully",
      data: {
        id: option.id,
        option: option.option,
        votes: option.votes,
        link_to_vote:
          req.protocol +
          "://" +
          req.headers.host +
          "/option/" +
          option.id +
          "/add-vote",
      },
    });
  } catch (error) {
    console.log(error);
    // return res.send(error);
    return res.status(500).json({
      error: { message: "Internal Server Error" },
    });
  }
};

module.exports.deleteOption = async (req, res) => {
  try {
    let option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(400).json({
        error: {
          message: "Option id is Invalid or the Option might have been already Deleted",
        },
      });
    }

    option.remove();

    await Question.findByIdAndUpdate(option.question, {
      $pull: { options: option.id },
    });

    return res.status(200).json({
      message: "Option Deleted Successfully",
      data: {
        id: option.id,
        option: option.option,
      },
    });
  } catch (error) {
    console.log(error);
    // return res.send(error);
    return res.status(500).json({
      error: { message: "Internal Server Error" },
    });
  }
};
