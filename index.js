const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected into Database`);
  })
  .catch((error) => console.log(error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/', require('./routes/user.js'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App Running port ${port}`);
});
