const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route


const db = require("./app/models");
db.mongoose
    .connect(db.url,{
    useNewUrlparser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!",err);
    process.exit();
})

app.get("/", (req, res) => {
  res.json({ message: "Up and running" });
});

require("./app/routes/routes")(app);
require("dotenv").config();

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

