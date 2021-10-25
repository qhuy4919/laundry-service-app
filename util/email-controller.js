const mailer = require('./mailer')

let sendMail = async (req, res) => {
    try {
        const { email } = req.body
        console.log(email);

        await mailer.sendMail(email)
    } catch (error) {

        console.log(error)
        res.send(error)
    }
}

module.exports = {
    sendMail: sendMail
}