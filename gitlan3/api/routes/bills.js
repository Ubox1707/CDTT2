import express from "express";
import { bookRoom, getBookingHistory } from "../controllers/bill.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", bookRoom);

router.get("/bills", verifyToken, async (req, res) => {
  try {
    const bills = await Bill.find({ user: req.user._id });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
