const express = require('express')
const app = express();
const cors = require('cors');
const port = 3001;


app.use(express.json())
app.use(cors())
const router = require('./routers')
app.use("/uploads", express.static("docs"));
app.use('/', router)

console.log('app listen on port ' + port)

app.listen(port);
  