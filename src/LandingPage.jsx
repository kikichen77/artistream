import React, { useEffect, useState } from "react";
import "./landingPage.css";
import { Settings, AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DefaultImage from "./sample.png";
import WhiteboardPage from "./WhiteboardComponents/WhiteboardPage.jsx"


const LandingPage = ({username, setUsername}) => {
  
  const [create, setCreateState] = useState(false);
  const [image, setImage] = useState(null);
  let errorMessage = [];
  
  useEffect(() => {
    if (create) {
      if (!username) {
        errorMessage[0] = "Username is empty.";
        setCreateState(false)
      } else if (!image) {
        errorMessage[1] = "Select your account image.";
      }
    }
  },[username, create])

  function validateImage(e) {
    const file = e.target.files[0];
    if (file.size >= 200000) {
      errorMessage[2] = "Maximum file size is 8KB.";
    } else {
      setImage(URL.createObjectURL(file));
    }
  }

  return (
    <div className="landingPage">

      {/* Set an image space */}
      <div className="imageSpaceContainer">
        <div className="imageSpaceDiv">
          <img src={image || DefaultImage} alt="account image" className="userImage" />
        </div>
        <label htmlFor="accountImg" className="addCircleIconContainer">
          <AddCircle style={{ fontSize: 35 }} className="addCircleIcon" />
        </label>
        <input 
          type="file" 
          name="file"
          id="accountImg"
          accept="image/png, image/jpeg"
          onChange={validateImage}
          hidden
        />
        <span style={{ color: "yellow" }}>{errorMessage[1]}</span>
      </div>

      {/* Input username to display on the main page*/}
      <span className="inputWrap usernameInputWrap">
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          className="inputArea"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </span>
      <br />

      {/* Input a room code and join a room */}
      <span className="inputWrap roomCodeInputWrap">
        <input
          type="text"
          id="roomCode"
          placeholder="Enter room code"
          className="inputArea"
        />
      <span></span>
      </span>
      <button className="btn joinRoomButton" onClick={() => joinRoom(roomCode)}>
        Join room
      </button>
      <br />
      
      {/* Create a new room */}
      {/* Currently an issue with this  
      <Link to={`/room/${username}`}>
        <button
          className="btn createRoomButton"
          onClick={() => {setCreateState(true)}}
          disabled={!username || !image}
        >
          Create room
        </button>
      </Link>
      */}

      {/* Create a new room */}
      {username ? (
        <Link to={`whiteboard/${username}`}>
          <button
            className="btn createRoomButton"onClick={() => {setCreateState(true)}}
          >
            Create Room
          </button>
        </Link>
      ) : (
          <button
            className="btn createRoomButton"onClick={() => {setCreateState(true)}}
          >
            Create Room
          </button>
      )}

      <Settings style={{ fontSize: 30 }} className="settingsIcon" />
    </div>
  );
};

export default LandingPage;
