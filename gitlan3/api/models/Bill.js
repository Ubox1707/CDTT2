import mongoose from "mongoose";
const BillSchema = new mongoose.Schema(
  {
    // idBill: {
    //     type: Number,
    //     required: true
    //   },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      TotalPrice: {
        type: Number,
        required: true
      }
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Bill", BillSchema);