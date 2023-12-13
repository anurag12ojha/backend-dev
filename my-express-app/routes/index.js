var express = require("express");

var router = express.Router();

const userModel = require("./users");

router.get("/", function (req, res) {
  req.session.pluck = true;      // create session
  
  res.render("index");
});

router.get("/create", async function (req, res) {
  const CreateUser = await userModel.create({
    username: "Anurag",
    age: 25,
    name: "Anurag",
  });
  res.cookie("age" , 24);      // create cookie
});

router.get("/read", async function (req, res) {
  let allusers = await userModel.find();
  res.send(allusers);
   
});

router.get("/readcookie", function (req, res) {
  console.log(req.cookies.age);
  res.send("check");
});

router.get("/dltcookie", function (req, res) {   // delete cookie
   res.clearCookie("age")
  res.send("cookie clear");
});


router.get("/delete", async function (req, res) {
  let Deletedusers = await userModel.deleteMany({
    username: "Anurag",
  });
  res.send(Deletedusers);
});



router.get("/checkpluck", async function (req, res) {
  if(req.session.pluck === true){           //// read session
    res.send("you are banned");
  }else{
    res.send("you are not banned");
  }  
});

router.get("/banRemoved", async function (req, res) {
  req.session.destroy(function(err){         ////// delete session
  if (err) throw err ;
   res.send("banned removed");
  }) 
});

module.exports = router;
