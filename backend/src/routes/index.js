const { Router } = require('express');
const router = Router();
const usersRoute = require('./users')
const productsRouter = require('./products')

router.use('/users', usersRoute)
router.use('/products', productsRouter)

module.exports = router;