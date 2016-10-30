'use strict'
const express = require('express');
const router = express.Router();
const log4js = require('log4js');
log4js.configure({ // configure to use all types in different files.
    appenders: [
        {   type: 'file',
            filename: "./logs/error.log", // specify the path where u want logs folder error.log
            category: 'error',
            maxLogSize: 20480,
            backups: 10
        },
        {   type: "file",
            filename: "./logs/info.log", // specify the path where u want logs folder info.log
            category: 'info',
            maxLogSize: 20480,
            backups: 10
        },
        {   type: 'file',
            filename: "./logs/debug.log", // specify the path where u want logs folder debug.log
            category: 'debug',
            maxLogSize: 20480,
            backups: 10
        }
    ]
});

var loggerinfo = log4js.getLogger('info'); // initialize the var to use.
var loggererror = log4js.getLogger('error'); // initialize the var to use.
var loggerdebug = log4js.getLogger('debug'); // initialize the var to use.

loggerinfo.info('This is Information Logger');
loggererror.info('This is Error Logger');
loggerdebug.info('This is Debugger');

router.post('/customers/update',function(req,res){
    console.log("/customers/update");
    let topic = req.headers['x-shopify-topic'];

    console.dir(`${topic} : ${topic.length}`);
    console.dir(req.headers['x-shopify-hmac-sha256']);
    console.dir(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
   loggerdebug.debug("Received a customer update...");
   loggerdebug.debug(req.body);
   res.status(200);
   res.send();
   loggerdebug.debug("Exit from customer update...");
});

router.post('/customers/create',function(req,res){
    console.log("received /customers/create");
    console.dir(req.headers['x-shopify-topic']);
    console.dir(req.headers['x-shopify-hmac-sha256']);
    console.dir(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
   loggerdebug.debug("Received a customer create...");
   loggerdebug.debug(req.body);
   res.status(200);
   res.send();
   loggerdebug.debug("Exit from customer create...");
});


module.exports = router;
