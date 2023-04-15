import React, { useEffect, useState } from "react";
import "./landingPage.css";
import { Settings, AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
const LandingPage = ({username,setUsername}) => {
  const[create,setCreateState]=useState(false)
  useEffect(()=>{
    if(create){
    if(!username){
       alert("username is empty")
       setCreateState(false)
    }}
  },[username,create])

  return (
    <div className="landingPage">
      {/* Set an image space */}
      <div className="imageSpaceContainer">
        <div className="imageSpaceDiv">
          <img src="vite.svg" alt="" className="userImage" />
        </div>
        <span className="addCircleIconContainer">
          <AddCircle className="addCircleIcon" />
        </span>
      </div>

      {/* Input username to display on the main page*/}
      <p className="usernameText">Username</p>
      <input
        type="text"
        id="username"
        placeholder="Enter username"
        className="usernameInput"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br />

      {/* Input a room code and join a room */}
      <input
        type="text"
        id="roomCode"
        placeholder="Enter room code"
        className="roomCodeInput"
      />
      <button className="joinRoomButton" onClick={() => joinRoom(roomCode)}>
        Join room
      </button>
      <br />

      {/* Create a new room */}
      {username ? (
        <Link to={`/room/${username}`}>
          <button
            className="createRoomButton"onClick={() => {setCreateState(true)}}
          >
            Create Room
          </button>
        </Link>
      ) : (
          <button
            className="createRoomButton"onClick={() => {setCreateState(true)}}
          >
            Create Room
          </button>
      )}

      <Settings className="settingsIcon" />
    </div>
  );
};

export default LandingPage;
