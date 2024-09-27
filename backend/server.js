const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/cors");
const credentials = require("./middleware/credentials");

connectDb();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
