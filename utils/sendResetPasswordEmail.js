const sendEmail = require('./sendEmail')

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const passwordResetLink = `${origin}/user/reset-password?token=${token}&email=${email}`
  const message = `<p>Reset password by clicking the following link:
  <a href="${passwordResetLink}">Reset Password</a></p>`

  return sendEmail({
    to: email,
    subject: 'Reset password',
    html: `<h4>Hello, ${name}</h4>
    ${message}`,
  })
}

module.exports = sendResetPasswordEmail
