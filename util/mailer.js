const nodeMailer = require('nodemailer')

const adminEmail = process.env.EMAIL;
const adminPassword = process.env.EMAIL_PASSWORD;
const mailHost = 'smtp.gmail.com'
const mailPort = 587


const sendMail = (to, sub) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    })

    const options = {
        from: adminEmail,
        to: to,
        subject: 'TXP laundry app',
        text: sub ? `Your new password is ${sub}` : 'register successful'
    }

    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}