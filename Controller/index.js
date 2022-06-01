const { Scores } = require("../Schema/users");
const dayjs = require("dayjs");

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

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const addScore = async (req, res) => {
  const { username, score } = req.body;
  try {
    var isScoreAdded = await addScoreByUsername(username, score);
    if (isScoreAdded) {
      res.status(201).send({
        status: "success",
        message: "Added score successfully",
      });
    } else {
      res.status(500).send({
        status: "error",
        message: "Error Occurred",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Error in adding score",
    });
  }
};

const getScoreDetailsByDate = async (filterDate) => {
  try {
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

      return scoresData;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
const getDataForDashboard = async (req, res) => {
  try {
    const { filterDate } = req.body;
    var scores = await getScoreDetailsByDate(filterDate);

    res.status(200).send({
      status: "success",
      data: scores,
    });
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
