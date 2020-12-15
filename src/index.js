const express = require('express');
const Router = require('./routes');

const app = express();

app.use(Router);

app.listen(3000, () => console.log('Started'))
