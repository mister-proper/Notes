//import response from 'express';
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const route = require('./routes');

route(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
});