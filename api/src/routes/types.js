const { Router } = require("express");
const { getTypes } = require("../Controllers/Types");
const router = Router();

router.get("/types", getTypes);

module.exports = router;
