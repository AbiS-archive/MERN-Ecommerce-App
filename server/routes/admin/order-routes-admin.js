const express = require("express");

const {
  getOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus
} = require("../../controllers/admin/order-controller-admin");

const router = express.Router();



router.get("/get", getOrdersOfAllUsers); 
router.get("/details/:id", getOrderDetailsForAdmin); 
router.put("/update/:id", updateOrderStatus)

module.exports = router;
