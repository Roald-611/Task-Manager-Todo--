const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const welcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.MAIL_FROM,
        subject: "Your login info",
        text: `Hello , ${name}
                    Welcome...
                        We are Happy to know that you are wont to be a part of over FAMILY , Please conform that your login from ${email} , If you are not then Change your account settings...`,
    })
}
const goodByEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.MAIL_FROM,
        subject: "Your logout info",
        text: `Hello , ${name}
                
                    Good Bye!
                        It's not gone easy to forgot us, I hope we meet soon,See you soon..! ${email}`,
    })
}
module.exports = {
    welcomeEmail,
    goodByEmail
};