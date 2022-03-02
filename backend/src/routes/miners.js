const { Router } = require("express");
const router = Router();
const { minerController } = require("../controllers/miners");

router.get("/", minerController.getAll); 
router.post("/create-miner", minerController.add);
router.put("/:id", minerController.updateById);
router.delete("/:id", minerController.deleteById);

module.exports = router;