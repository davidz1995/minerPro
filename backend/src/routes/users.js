const { Router } = require('express');
const router = Router();
const { userController } = require('../controllers/users')

router.get('/', userController.getAll),
router.get('/showAll', userController.showAll)
router.get('/:id', userController.getById),
router.post('/', userController.add),
//router.put('/:id', userController.update),
//router.delete('/:id',userController.delete)

module.exports = router;