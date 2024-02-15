const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// set up port
const PORT = process.env.SRPU_B_APP_PORT || 8001;
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// add routes
const router = require("./src/routes/router");
app.use("/api/pladi", router);

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));