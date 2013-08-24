var xmlUrl = null;
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./public/javascripts/jquery-1.9.1.min.js", "utf-8");
var JSON = {
  'title' : 'xml数据',
  'link' : 'http://yangfan.com:3000/',
  'description' : 'XML数据摘要',
  'author' : '作者',
  'pubDate' : '时间',
  item : []
};

exports.list = function (req, res) {
  //dataUrl:http://www.china.com.cn/node_7187073.htm
  //get data
  xmlUrl = req.query.xmlSrc;
  //post data
  xmlUrl = req.body.xmlSrc;

  jsdom.env({
    url: xmlUrl,
    src: [jquery],
    done: function (errors, window) {
      var $ = window.$;
      JSON.item = [];
      $('ol li').each(function(index, element){
        console.log(index);
        JSON.item.push({
          title : $(this).find('h1').html(),
          link : $(this).find('h5').html(),
          description : $(this).find('h3').html(),
          author : $(this).find('h6').html(),
          pubDate : $(this).find('h2').html()
        });
      });
      res.setHeader("Content-Type", "text/xml");
      res.render('show', JSON);
    }
  });
};