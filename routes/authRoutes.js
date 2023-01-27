const express = require('express')
const cookie = require('cookie')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', process.env.TOKEN, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'None',
        secure: true,
        domain: '.pizza-delivery-api-vi7x.onrender.com',
        path: '/'
      })
    )
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.status(200).send('Succesfull')
  } else {
    res.status(400).send('Wrong Credentials!')
  }
})

module.exports = router
