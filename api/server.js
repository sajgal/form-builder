const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;
const forms = require('./routes/forms');
const submissions = require('./routes/submissions');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', forms);
app.use('/api', submissions);

app.listen(port, () => {
  console.log(`We are live on port ${port}`);
});