import "./Payment.css";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get("/bills");
        if (response.data.length > 0) {
          setPaymentInfo(response.data[0]); 
        }
      } catch (error) {
        console.error("Error fetching payment info:", error);
      }
    };
  
    fetchPaymentInfo();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/payments", paymentInfo);
      // Handle success, e.g., redirect to another page
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPaymentInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="payment">
      <div className="paymentContainer">
        <Navbar />
        <div className="paymentContent">
          <h1>Payment Details</h1>
          <div className="paymentInfo">
            <p>Bill ID: {paymentInfo._id}</p>
            <p>User: {paymentInfo.user}</p>
            <p>Room: {paymentInfo.room}</p>
            <p>Check-in Date: {paymentInfo.startDate}</p>
            <p>Check-out Date: {paymentInfo.endDate}</p>
            <p>Total Amount: {paymentInfo.totalPrice}</p>
          </div>
          <form onSubmit = {handleSubmit}>
            {/* Payment form */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
