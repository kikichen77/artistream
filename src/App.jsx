import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import ConnectPage from "./ConnectPage";
import PageLayout from "./PageLayout";
import ErrorPage from "./ErrorPage";
import CallPage from "./CallPage";
import { Navigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import "./index.css";


function App() {
  const [theme, setTheme] = useState(false);
  
  const handleClick = () => {
    setTheme(!theme);
  };
  
  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <React.Fragment>
      {/* <button onClick={handleClick}>{theme ? "Light" : "Dark"}</button> */}
      <DarkModeSwitch
        style={{ width: "20px", position: "absolute", top: "0", right: "20px" }}
        checked={theme}
        onChange={handleClick}
        onClick={handleClick}
        size={120}
      />
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="connect" replace={true} />}></Route>
          <Route path="connect" element={<ConnectPage {...{theme}}/>} />
          <Route path=":id" element={<CallPage {...{theme}}/>} />
          <Route path="error" element={<ErrorPage />}/>
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;