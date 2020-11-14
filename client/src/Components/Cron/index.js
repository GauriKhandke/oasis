const cron = require('node-cron');
let shell = require('shelljs');
const db = require('../models');
const nodemailer = require('nodemailer');

// cron config
let crontimeout = '0 */15 * * * *'; // every 15mins
let howlazytimeout = 1; // 1 day

// setup email params
// right now its setup for gmail, but for production you'll want to use SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xyz@gmail.com', //put your mail here
        pass: 'xyz' //password here
    }
});


// query DB for users who haven't journaled yet (hereto, lazyusers)
let cutoff = new Date();
cutoff.setDate(cutoff.getDate()-howlazytimeout);
const lazyusers = await db.User.find({ updatedAt: {$lt: cutoff }  });
if(!lazyusers.length) {
    console.log('no lazy users, might be a bug');
}

// loop through lazy users and shame them into journaling.
for (let lazyuser = 0; lazyuser < lazyusers.length; lazyuser++) {

    console.log(`
        Here's what we got for lazyusers:
        ${JSON.stringify(lazyusers)}
    `);

    let mailOptions = { 
        from: 'xyz@gmail.com', // sender address
        to: lazyusers[lazyuser].email, // reciever address
        subject: 'Dont forget to update your journal for today',  
        html: '<p>Hi, your journal is empty. Write some thoughts, ideas or about your day!</p>' // plain text body
    };

    cron.schedule(crontimeout, () => {
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    });
    
}