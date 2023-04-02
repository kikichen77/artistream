import React from 'react';
import './App.css';
import LandingPage from "./LandingPage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import { useContext } from "react";

const App = () => {
  // const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
