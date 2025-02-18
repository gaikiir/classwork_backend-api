
const express = require('express');
const app = express();
const routes = require('./routes/Api');
app.use(routes);
app.listen(process.env.port || 4000, function () {
  console.log("Now listening for request no: http://localhost:4000");
});



