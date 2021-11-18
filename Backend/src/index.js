const express = require('express')
const app = express()

// app.get('/',(req,res) =>{
//     res.send('hola wacho')
// })

app.set('port',process.env.PORT || 3500)

app.use(express.json());
//app.use(express.json());
//app.use(express.urlencoded())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(require('./routes/usuarios'))

app.listen(app.get('port'),()=>{
    console.log(`server en ${app.get('port')}`);
})
