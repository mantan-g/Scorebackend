const { User, Scores } = require("../Schema/users");
const dayjs = require("dayjs");

const addNewUser = async (username) => {
  try {
    let user = new User({
      username,
    });
    const result = await user.save();
  } catch (err) {
    console.log(err);
  }
};

const addScoreByUsername = async (username, score) => {
  try {
    let scoreData = await Scores.find({
      $and: [
        { username },
        {
          timestamps: {
            $gte: dayjs().startOf("day").toDate(),
            $lte: dayjs().endOf("day").toDate(),
          },
        },
      ],
    });

    if (scoreData.length > 0) {
      scoreData[0].score += score;
      await scoreData[0].save();
    } else {
      let newScore = new Scores({
        username,
        score,
        createdOnDate: new Date(),
      });
      await newScore.save();
    }
  } catch (err) {
    console.log(err);
  }
};

const addScore = async (req, res) => {
  const { username, score } = req.body;
  try {
    let userData = await User.find({ username });
    if (userData.length <= 0) {
      addNewUser(username);
      addScoreByUsername(username, score);
    } else {
      addScoreByUsername(username, score);
    }
    res.status(201).send({
      status: "success",
      message: "Added score successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Error in adding score",
    });
  }
};

const getDataForDashboard = async (req, res) => {
  try {
    const { filterDate } = req.body;
    let scores = await Scores.find({
      createdOnDate: {
        $gte: dayjs(filterDate).startOf("day").toDate(),
        $lte: dayjs(filterDate).endOf("day").toDate(),
      },
    });

    if (scores.length > 0) {
      let scoresData = scores.map((score) => {
        return {
          username: score.username,
          score: score.score,
        };
      });
      res.status(200).send({
        status: "success",
        data: scoresData,
      });
    } else {
      res.status(404).send({
        status: "error",
        message: "No record found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "An error occurred",
    });
  }
};

module.exports = {
  addScore,
  getDataForDashboard,
};
