import Room from "../models/User.js"



//CREATE
export const createUser = async (req, res, next) => {
    const newRoom = new Room(req.body);
    
    try{
        const saveRoom= await newRoom.save();
        res.status(200).json(saveRoom);
    }catch(err){
        next(err);
    }
}

//UPDATE
export const updateUser = async (req, res, next) => {
    
    try{
        const updateUser= await Room.findByIdAndUpdate(req.params.id,
{ $set: req.body},
{ new: true}
        );
        res.status(200).json(updateRoom);
    }catch(err){
        next(err);
    }
    
}

//DELETE
export const deleteUser= async (req, res, next) => {
    
    try{
        await Room.findByIdAndDelete(
        req.params.id,
        );
        res.status(200).json("Userhas bees deleted.");
    }catch(err){
        next(err);
    }
    
}

//GET
export const getUser = async (req, res, next) => {
    
    try{
        const user = await User.findById(
            req.params.id,
        );
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

//GET ALL
export const getUsers = async (req, res, next) => {
   
    try{
        const users = await User.find( );
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}