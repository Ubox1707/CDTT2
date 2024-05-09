import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  console.log({ hotelId })
  const newRoom = new Room(req.body);
  console.log({ body: req.body });

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// export const deleteRoom = async (req, res, next) => {
//   const hotelId = req.params.hotelid;
//   try {
//     await Room.findByIdAndDelete(req.params.id);
//     try {
//       await Hotel.findByIdAndUpdate(hotelId, {
//         $pull: { rooms: req.params.id },
//       });
//     } catch (err) {
//       next(err);
//     }
//     res.status(200).json("Room has been deleted.");
//   } catch (err) {
//     next(err);
//   }
// };
export const deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.params.id; // Lấy ID của phòng cần xóa từ request
    // Tìm và xóa phòng từ cơ sở dữ liệu
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    // Nếu không tìm thấy phòng, trả về thông báo lỗi
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found." });
    }

    // Xóa phòng khỏi tất cả các khách sạn có phòng đó
    await Hotel.updateMany(
      { rooms: roomId }, // Tìm tất cả các khách sạn có phòng có ID là roomId
      { $pull: { rooms: roomId } } // Gỡ bỏ phòng có ID là roomId khỏi mỗi khách sạn
    );

    // Trả về thông báo thành công
    res.status(200).json({ message: "Room and related hotels have been deleted." });
  } catch (err) {
    // Nếu có lỗi, chuyển nó đến middleware next để xử lý
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
