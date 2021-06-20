var express = require("express");
var router = express.Router();
const ytfps = require("ytfps");

// /* GET home page. */
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { msg: "", err: "", data: "" });
});
router.post("/", function (req, res, next) {
  if (req.body.url.length === 0) {
    res.render("index", { msg: "", err: "Invalid url", data: "" });
  } else {
    let url = req.body.url;
    let playlistId = url.split("list").pop().split("=").pop();
    if (!playlistId) {
      res.render("index", { msg: "", err: "Invalid url", data: "" });
    }

    ytfps(playlistId)
      .then((data) => {
        res.render("index", { msg: "", err: "", data: data });
      })
      .catch((err) => {
        res.render("index", {
          msg: "",
          err: "Cannot fetch data !!!",
          data: "",
        });
      });
  }
});

module.exports = router;
