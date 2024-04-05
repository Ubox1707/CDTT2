import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";
import { verifyAdmin} from "../utils/verifyToken.js";
// import {
//   updateUser,
//   deleteUser,
//   getUser,
//   getUsers,
// } from "../controllers/user.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

// //UPDATE
// router.put("/:id", verifyUser, updateUser);

// //DELETE
// router.delete("/:id", verifyUser, deleteUser);

// //GET
// router.get("/:id", verifyUser, getUser);

// //GET ALL
// router.get("/", verifyAdmin, getUsers);

router.post("/", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL

router.get("/", getRooms);

export default router;
