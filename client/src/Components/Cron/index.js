const cron = require('node-cron');
let shell = require('shelljs');

cron.schedule('* * * * * *', function() {
    console.log("Scheduler running...");
     if(shell.exec("Cron/helloworld.js").code !== 0){
         console.log("something went wrong");
     }

    });

