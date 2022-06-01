var mongoose = require("mongoose");
var config = process.env;
mongoose
  .connect(
    "mongodb+srv://scoreapp:scoreapp@cluster0.kzzcb.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((err) => console.log(err));

mongoose.connection
  .once("open", () => console.log("Connected to MongoDB"))
  .on("error", (err) => console.log(err));

module.exports = mongoose;
