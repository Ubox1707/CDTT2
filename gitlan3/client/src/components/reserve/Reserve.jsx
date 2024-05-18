import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const startDate = dates[0].startDate; // Lấy startDate từ context

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dates = [];
    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  // const handleClick = async () => {
  //   try {
  //     await Promise.all(
  //       selectedRooms.map((roomId) => {
  //         const res = axios.put(`/rooms/availability/${roomId}`, {
  //           dates: alldates,
  //         });
  //         return res.data;
  //       })
  //     );
  //     setOpen(false);
  //     // trang thanh toan
  //     navigate("/Payment");
  //   } catch (err) {}
  // };

  const handleClick = async () => {
    try {
      // Cập nhật thông tin sẵn có của các phòng đã chọn
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates.map(date => date.getTime()), // Chuyển đổi sang Unix timestamp
          });
        })
      );
      // Tạo hóa đơn mới
      await axios.post("/bills/create", {
        user: "user.pramas", 
        rooms: selectedRooms,
        startDate: startDate,
        endDate: dates[0].endDate 
      });
  
      setOpen(false);
      // Chuyển hướng đến trang thanh toán
      navigate("/Payment");
    } catch (err) {
    }
  };

  return (
    <div className="reserve">
      <div className="Container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="Close"
          onClick={() => setOpen(false)}
        />
        <span><b>Chọn phòng:</b></span>
        {data.map((item) => (
          <div className="Item" key={item._id}>
            <div className="ItemInfo">
              <div className="Title">{item.title}</div>
              <div className="Desc">{item.desc}</div>
              <div className="Max">
                Sức chứa: <b>{item.maxPeople}</b>
              </div>
              <div className="Price">{item.price.toLocaleString()} VNĐ</div>
            </div>
            <div className="SelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="Button">
          Đặt phòng ngay!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
