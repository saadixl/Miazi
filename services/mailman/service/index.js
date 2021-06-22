const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({         
    host: 'smtp.mailgun.org',         
    port: 465,         
    secure: true, // true for 465, false for other ports
    auth: {             
        user: process.env.MAILGUN_USERNAME, // generated ethereal user
        pass: process.env.MAILGUN_PASSWORD  // generated ethereal password   
    }
});


const sendSimpleHTMLMail = async ({subject, to, html}) => {
    // send mail with defined transport object
    try {
        return await transporter.sendMail({
            from: `"Miazi" <${process.env.SENDER_EMAIL}>`, // sender address
            to,
            subject,
            html,
        });
    } catch(e) {
        console.log(`Failed to send email for ${JSON.stringify(e)}`);
        return "error";
    }
};

module.exports = {
    sendSimpleHTMLMail,
};