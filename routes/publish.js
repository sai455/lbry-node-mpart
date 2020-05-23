const {DaemonClient, CrdClient} = require('lbry');

var express = require('express');
var router = express.Router();
var path = require('path');
const client = new DaemonClient('http://localhost:5279');
router.get('/', function(req, res, next) {
  res.render('publish', { title: 'LBRY-Publish', uploadStatus:{status:false,message:'Please Upload File'}});
});

router.post('/',function(req, res) {

  if (!req.files || Object.keys(req.files).length === 0) {
    res.render('publish', { title: 'LBRY-Publish', uploadStatus:{status:true,message:'An Error Occured During File Upload',alert:'danger'}});
  }
  let sampleFile = req.files.imageupload;
  sampleFile.mv('./public/uploads/' + sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    else
    var filepath= path.resolve(__dirname, '../public/uploads/'+ sampleFile.name) 
  client.publish(
    {
      name : req.body.fileName, 
      bid: req.body.bid, 
      file_path:filepath,
      channel_name:'@mpartpoc-channel'
    });
      res.render('publish', { title: 'LBRY-Publish', uploadStatus:{status:true,message:'File Uploaded Successfully.',alert:'success'}});
  });
  
});


module.exports = router;
