import "./Payment.css";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/bills");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="payment">
      <Navbar />
      <div className="paymentContent">
        <h1>Payment Details</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {bills.map((bill) => (
              <div key={bill._id} className="billItem">
                <p>Bill ID: {bill._id}</p>
                <p>User: {bill.user}</p>
                <p>Total Amount: {bill.TotalPrice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
