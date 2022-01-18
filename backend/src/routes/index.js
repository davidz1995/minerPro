const { Router } = require('express');
const router = Router();
const usersRoute = require('./users')

router.use('/users', usersRoute)

module.exports = router;