import {
  faBed,
  faCalendarDays,
  faHouse,
  faLaptopCode,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const {dispatch} = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload:{destination,dates,options }})
    navigate("/hotels", { state: { destination, dates, options } });
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div 
          className={`headerListItem ${activeItem === "/" ? "active" : ""}`}
          >
          <Link to="/" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#FFF" }} />
            <span style={{ color: "#FFF", marginLeft: "10px" }}>Trang chủ</span>
          </Link>
          </div>
          <div 
          className={`headerListItem ${activeItem === "/introduce" ? "active" : ""}`}
          >
          <Link to="/introduce" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faLaptopCode} style={{ color: "#FFF" }} />
            <span style={{ color: "#FFF", marginLeft: "10px" }}>Giới thiệu</span>
          </Link>
          </div>
          {/* <div 
          className={`headerListItem ${activeItem === "/contact" ? "active" : ""}`}
          >
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faPhoneVolume} style={{ color: "#FFF" }} />
            <span style={{ color: "#FFF", marginLeft: "10px" }}>Liên lạc</span>
          </Link>
          </div> */}
          {/* <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Đặt phòng</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Đặt xe taxi</span>
          </div> */}
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Bạn muốn tìm một nơi nghỉ chân sang trọng. Đến với chúng tôi!!!
            </h1>
            <p className="headerDesc">
              Khách sạn giá rẻ - giành cho các bạn trẻ!!!
            </p>
            
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} đến ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} người lớn · ${options.children} trẻ em · ${options.room} phòng`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Người lớn</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Trẻ em</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Phòng</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Tìm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
