const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database.js');

//registrar un usuario

router.post('/suscripto',(req,res)=>{
    const {email} = req.body;
    console.log(req.body);
    console.log(email)
    
    
    mysqlConnection.query(`INSERT INTO usuarios (mail) VALUE (?)`, [email],  (error,  fields)=> {
        if (!error) {
            res.send(
                '<h1>Gracias por suscribirte</h1>',
                
            );
        } else {
            res.send(
                 'Ha ocurrido un error',
            );
        }
       
      });
})

module.exports = router;