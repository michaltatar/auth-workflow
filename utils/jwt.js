const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJwt = createJWT({ payload: { user } })
  const refreshTokenJwt = createJWT({ payload: { user, refreshToken } })

  const oneDay = 1000 * 60 * 60 * 24
  const oneMonth = oneDay * 30

  res.cookie('accessToken', accessTokenJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })

  res.cookie('refreshToken', refreshTokenJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneMonth),
  })
}

// const attachSingleCookieToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user })

//   const oneDay = 1000 * 60 * 60 * 24

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   })
// }

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
}
