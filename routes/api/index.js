const router = require("express").Router();
const articleRoutes = require("./article");

// Book routes
router.use("/saved", articleRoutes);

module.exports = router;
