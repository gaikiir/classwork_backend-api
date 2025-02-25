
const express = require('express');
require('dotenv').config();
require('./helpers/init_mongodb')
const app = express();
const routes = require('./routes/Student_Route');
app.use(routes);
app.listen(process.env.port || 4000, function () {
  console.log("Now listening for request no: http://localhost:4000");
});



