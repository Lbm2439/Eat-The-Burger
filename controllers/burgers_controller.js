var express = require("express");

var router = express.Router();

var burgers = require("../models/burgers.js");


router.get("/", function(req, res) {
  console.log("route")
  burgers.all(function(data) {
    console.log("data", data)
    var burgerObject = {
      burger: data
    };
    console.log(burgerObject);
  // res.render("index", burgerObject);
  });
  res.render("index");
});

router.post("/api/burgers", function(req, res) {
  burgers.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name
  ], function(result) {
    
    res.json({ id: burger_id.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

module.exports = router;
