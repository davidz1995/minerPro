const { Router } = require("express");
const router = Router();
const { historyController } = require("../controllers/histories");

router.get("/", historyController.getAll); 
router.post("/create-payment", historyController.add);
router.put("/:id", historyController.updateById);
router.delete("/:id", historyController.deleteById);

module.exports = router;