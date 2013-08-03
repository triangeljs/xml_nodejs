var xmlUrl = null;
var arrs = [];
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./public/javascripts/jquery-1.9.1.min.js", "utf-8");

exports.list = function (req, res) {
  //get data
  xmlUrl = req.query.xmlSrc;
  //post data
  xmlUrl = req.body.xmlSrc;

  jsdom.env({
    url: xmlUrl,
    src: [jquery],
    done: function (errors, window) {
      var $ = window.$;
      $('ol li').each(function(index, element){
        arrs.push($(this).html());
      })
      res.send(arrs[0]);
    }
  });
};