/**
 * Created by hexu on 2017/7/10.
 */
var express = require('express'),
  path = require('path'),
  port = process.env.PORT || 3000,
  app = express(),
  fs = require('fs'),
  bodyParser = require('body-parser');

app.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.post('/api/getData', function (req, res) {
  var body = req.body;
  let page_num = body.page_num || 1,
    page_size = body.page_size || 10;
  let rs = fs.createReadStream('./json/person.json', { encoding: 'utf-8', bufferSize: 11 });
  let data = '';
  rs.on('data', function (trunk) {
    data += trunk;
  });
  rs.on('end', function () {
    data = JSON.parse(data);
    let totalNum = Math.ceil(data.length / page_size);
    data = data.slice((page_num-1) * page_size, page_num*page_size);
    res.send({
      datas: data,
      page: {
        page_num,
        page_size,
        total_num: totalNum,
      }
    });
    res.end();
  });
})