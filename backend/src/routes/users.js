const { Router } = require("express");
const router = Router();
const { userController } = require("../controllers/users");

router.get("/", userController.getAll);
router.get("/:name", userController.getByName);
router.post("/register", userController.add);
router.post("/login", userController.login);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);

module.exports = router;
