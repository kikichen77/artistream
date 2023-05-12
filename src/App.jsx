import React from "react";
import { Route, Routes } from 'react-router-dom';
import ConnectPage from "./ConnectPage";
import PageLayout from "./PageLayout";
import ErrorPage from "./ErrorPage";
import CallPage from "./CallPage";
import { Navigate } from "react-router-dom";
import "./index.css";


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="connect" replace={true} />}></Route>
          <Route path="connect" element={<ConnectPage />} />
          <Route path=":id" element={<CallPage />} />
          <Route path="error" element={<ErrorPage />}/>
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;