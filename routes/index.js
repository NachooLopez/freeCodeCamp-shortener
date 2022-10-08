const { Router } = require("express");
const { postController, getController } = require("../controllers");
const { dnsLookup, urlValidator } = require("../middlewares");

const router = Router();

router.post("/", urlValidator, dnsLookup, postController);
router.get("/:id", getController);

module.exports = router;
