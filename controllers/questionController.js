const Question = require("../models/question");
const Option = require("../models/option");

module.exports.viewAllQuestions = async (req, res) => {
  try {
    let questions = await Question.find().select("question");

    return res.status(200).json({
      message: "Questions displayed Successfully",
      total: questions.length,
      questions: questions,
    });
  } catch (error) {
    console.log(error);
    // return res.send(error);
    return res.status(500).json({
      error: { message: "Internal Server Error" },
    });
  }
};

module.exports.viewQuestion = async (req, res) => {
  try {
    let question = await Question.findById(req.params.id)
      .select(["id", "question", "options"])
      .populate({
        path: "options",
        select: ["id", "option", "votes"],
      });

    if (!question) {
      return res.status(400).json({
        error: {
          message:
            "Question id is Invalid or the Question might have been Deleted",
        },
      });
    }

    let options = await question.options.map((option) => {
      return {
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
      };
    });

    return res.status(200).json({
      message: "Question displayed Successfully",
      data: {
        id: question.id,
        question: question.question,
        options: {
          total: options.length,
          data: options,
        },
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

module.exports.createQuestion = async (req, res) => {
  try {
    if (!req.body.question) {
      return res.status(400).json({
        error: {
          message: "'question' cannot be empty",
        },
      });
    }

    let question = await Question.create({
      question: req.body.question,
    });

    return res.status(200).json({
      message: "Question created Successfully",
      data: {
        id: question.id,
        question: question.question,
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

module.exports.createOption = async (req, res) => {
  try {
    if (!req.body.option) {
      return res.status(400).json({
        error: {
          message: "'option' cannot be empty",
        },
      });
    }

    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(400).json({
        error: {
          message:
            "Question id is Invalid or the Question might have been Deleted",
        },
      });
    }

    let option = await Option.create({
      option: req.body.option,
      question: req.params.id,
    });

    await question.options.push(option);
    await question.save();

    return res.status(200).json({
      message: "Option created Successfully",
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

module.exports.deleteQuestion = async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(400).json({
        error: {
          message:
            "Question id is Invalid or the Question might have been already Deleted",
        },
      });
    }

    question.remove();

    await Option.deleteMany({ question: question.id });

    return res.status(200).json({
      message: "Question Deleted Successfully",
      data: {
        id: question.id,
        question: question.question,
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
