import Bill from "../models/Bill.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";


// Phương thức để khách hàng đặt phòng và tạo đơn hàng mới
export const bookRoom = async (req, res, next) => {
  try {
    const { user, room, startDate, endDate } = req.body;

    // Validate required information
    if (!user || !room || !startDate || !endDate) {
      return res.status(300).json({ message: "Missing required information" });
    }

    // Calculate total price
    const totalPrice = calculateTotalPrice(startDate, endDate, room.price);

    // Create a new bill
    const newBill = new Bill({
      user: user,
      room: room,
      startDate: startDate,
      endDate: endDate,
      TotalPrice: totalPrice, // Corrected variable name
    });

    await newBill.save();

    // Send response
    res.status(201).json({ message: "Room booking and bill creation successful.", bill: newBill });
  } catch (err) {
    next(err);
  }
};

// // Lấy lịch sử đặt phòng của khách hàng
export const getBookingHistory = async (req, res) => {
  try {
    const customerId = req.params.userid;
    const bookingHistory = await Bill.find({ User: customerId });
    res.status(200).json(bookingHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm tính toán tổng tiền dựa trên ngày nhận và trả phòng, giá phòng
const calculateTotalPrice = (NgayNhanPhong, NgayTraPhong, pricePerNight) => {
  const startDate = new Date(NgayNhanPhong);
  const endDate = new Date(NgayTraPhong);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Tính số đêm
  const totalPrice = numberOfNights * pricePerNight;
  return totalPrice;
};
