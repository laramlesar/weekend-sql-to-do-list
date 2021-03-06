const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/tasks.router.js');

const app = express();
// Setup body parser - to translating request body into JSON
app.use( bodyParser.urlencoded({ extended: true }));

// Routes would go here
app.use('/tasks', taskRouter);

app.use(express.static('server/public'));


// Start express
const PORT =process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});