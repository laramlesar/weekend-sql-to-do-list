const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "weekend-to-do-app" ORDER BY "id";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
  });

  router.post('/',  (req, res) => {
    let task = req.body;
    console.log(`Adding task`, task);
  
    let queryText = `INSERT INTO "weekend-to-do-app" ("task")
                     VALUES ($1);`;
    pool.query(queryText, [task.name])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });
  router.put('/:id',  (req, res) => {
    let task = req.body; // task with updated content
    let id = req.params.id; // id of the task to update
    console.log(req.body);
    //console.log(req.params.id);
    console.log(`Updating tasks ${id} with `, task);
    console.log(req.body.status);
    let queryText = '';
    if(req.body.status === 'read'){
        queryText =`
          UPDATE "weekend-to-do-app"
          SET "status" = 'completed'
          WHERE "id" = $1;
          `
    }
    pool.query(queryText, [req.params.id]).then((result)=>{
      res.sendStatus(200);
    }).catch((error)=>{
      console.log('error in PUT', error);
      res.sendStatus(500);
    })
  
    // TODO - REPLACE BELOW WITH YOUR CODE
    //res.sendStatus(500);
  
  });

module.exports = router;