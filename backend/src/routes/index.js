const { Router } = require('express');
const router = Router();
const usersRoute = require('./users')
const productsRouter = require('./products')
const historiesRoute = require('./histories')
const minersRoute = require('./miners')

router.use('/users', usersRoute)
router.use('/products', productsRouter)
router.use('/histories', historiesRoute)
router.use('/miners', minersRoute)

module.exports = router;