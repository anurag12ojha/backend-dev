 


const express = require('express');
const app = express();
const port = 3000;

app.set("view engine" , "ejs")

// app.use((req, res, next) => {
//     console.log("Middleware working");
//     next();
// }  
 
app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.render("index" , {website : 155});
});

// Add the new route
// app.get('/user/:username', (req, res) => {
//     const username = req.params.username;
//     console.log(`User entered: ${username}`);
//     res.send(`Hello, ${username}!`);
//   });

app.get('/error', (req, res) => {
    throw Error("hello error")
});

app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

