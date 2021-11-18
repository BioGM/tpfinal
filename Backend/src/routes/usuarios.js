const express = require('express');
const router = express.Router();
//const suscribe = express.Router();

const bodyParser =  require('body-parser');
const mysqlConnection = require('../database.js');


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:true});

//registrar un usuario

router.post('/suscripto/',urlencodedParser,(req,res)=>{
    const {email} = req.body;
    console.log(req.body);
    console.log(email)
    
    mysqlConnection.query('INSERT INTO usuarios (mail) VALUE (?)', [email],  (error,  fields)=> {
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