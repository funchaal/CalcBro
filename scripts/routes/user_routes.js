const express = require('express')
const router = express.Router()

router.get('/account', (req, res) => {
    res.render('./user/account')
})

router.get('/about', (req, res) => {
    res.render('./user/about')
})

router.get('/profile', (req, res) => {
    res.render('./user/profile')
})

router.get('/', (req, res) => {
    res.redirect('/user/profile')
})

module.exports = router