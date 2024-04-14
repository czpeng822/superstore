const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('images'));
app.use('/images', express.static('images'))

const corsOptions = {
    origin: '*',
    credentials: true,
    maxAge: 200
};

app.use(cors(corsOptions));
app.use('/', router);

const port = 3025;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

