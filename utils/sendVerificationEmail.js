const sendEmail = require('./sendEmail')

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verificationLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`

  const message = `<p>Please confirm your e-mail by clicking the following link:
  <a href="${verificationLink}">Verify e-mail</a>
  </p>`

  return sendEmail({
    to: email,
    subject: 'E-mail confirmation',
    html: `<h4>Hello, ${name}</h4>
    ${message}
    `,
  })
}

module.exports = sendVerificationEmail
