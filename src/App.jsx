import React from 'react';
import './App.css';
import LandingPage from "./LandingPage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CreateRoom from './createroom';
import {useState } from 'react';
// import { useContext } from "react";

const App = () => {
  // const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage username={username} setUsername={setUsername}/>}exact />
        <Route path={`/room/${username}`} element={<CreateRoom username={username}/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
