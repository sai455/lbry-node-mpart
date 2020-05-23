const {DaemonClient, CrdClient} = require('lbry');
var express = require('express');
var router = express.Router();

const client = new DaemonClient('http://localhost:5279');
/* GET home page. */
router.get('/', function(req, res, next) {
  client.file_list().then(data=>{
    filesList=data.items
    res.render('index', { title: 'LBRY-Files',filesList:filesList });
  })
  
});

module.exports = router;
