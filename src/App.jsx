import React from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoom from './createroom';
import {useState } from 'react';
import WhiteboardPage from "./WhiteboardComponents/WhiteboardPage";

// import { useContext } from "react";

const App = () => {
  // const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  //<Route path={`whiteboard/room/${username}`} element={<CreateRoom username={username}/>} />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage username={username} setUsername={setUsername}/>}exact />
        <Route path="whiteboard/:id" element={<WhiteboardPage createRoomComponent={<CreateRoom username={username}/>}/>}> 
          
        </Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
