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
  
    let queryText = `INSERT INTO "weekend-to-do-app" ("task", "status")
                     VALUES ($1, $2);`;
    pool.query(queryText, [task.name, task.status])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

  //delete
  router.delete('/:id', (req, res)=>{
      console.log('delete called with id of', req.params.id);
      let queryText = `
      DELETE FROM "weekend-to-do-app"
      WHERE "id" = $1;
      `
      pool.query(queryText, [req.params.id]).then((result)=>{
          res.sendStatus(200);
      }).catch((error)=>{
          console.log('error in delete', error);
          res.sendStatus(500);
      })
  })
  router.put('/:id',  (req, res) => {
    let task = req.body; // task with updated content
    let id = req.params.id; // id of the task to update
    console.log(req.body);
    //console.log(req.params.id);
    //console.log(`Updating tasks ${id} with `, task);
    console.log('hi', req.body.status);
    let queryText = '';
        
     //console.log('INCOMPLETE UPDATED');
     queryText =`
          UPDATE "weekend-to-do-app"
          SET "status" = 'complete'
          WHERE "id" = $1;
          `
    
    pool.query(queryText, [req.params.id]).then((result)=>{
      res.sendStatus(200);
    }).catch((error)=>{
      console.log('error in PUT', error);
      res.sendStatus(500);
    })
  
    
  
  
  });

module.exports = router;