const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./dbConnect");

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.route");
const bookRoutes = require("./routes/book.route");
const reviewRoutes = require("./routes/review.route");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", authRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Book Review API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
connectToDB();
