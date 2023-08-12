const router = require("express").Router();
const transformController = require("../controllers/edit/transformController");
const adjustmentController = require("../controllers/edit/adjustmentController");
const filterController = require("../controllers/edit/filterController");

// transformation controller

router.post("/transform", transformController.transformImage);

//image adjustment controllers

router.post("/adjustment", adjustmentController.adjustImage);

//filter controllers

router.post("/filter", filterController.applyFilter);

module.exports = router;
