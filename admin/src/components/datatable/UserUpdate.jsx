import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import Dialog from "../../components/dialog/Dialog";
import { useLocation } from "react-router-dom";

const New = ({ inputs, title, handleDone }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const location = useLocation();
  const showUpdate = location.state?.showUpdate || false;

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClose = () => {
    setShowDialog(false);
    window.location.reload();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dehf2hp4a/image/upload",
        data
      );

      const { url } = uploadRes.data;
      console.log({info})
      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/users", newUser);
      setShowDialog(true);
    } catch (err) {
      console.log(err);
    }
    handleDone();
  };

  
  return (
    <div className="new">
        {showUpdate && (
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Sửa</button>
            </form>
          </div>
        </div>
         )}
        {showDialog && <Dialog handleClose={handleClose} isSuccess={true} position="center"/>}
    </div>
 
  );
};

export default New;