import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SocketIO from "socket.io-client";
import React from "react";
import ChatBox from "./Chat/ChatBox";
import Canvas from "./Canvas/Canvas";
import { Grid } from "@mui/material";
import Header from "./Header";
import ConnectedUsers from "./ConnectedUsers";
//import MeetingControls from "./MeetingControls";
import CopyID from "./Components/CopyComponent"

export default function CallPage({ theme }) {
	const { state } = useLocation();
	if (!state) {
		return <Navigate to="/error" />;
	}

	const { ROOM_ID } = state;
	console.log("Page - Room ID:" + ROOM_ID);

	let socket = SocketIO("http://localhost:3000");

	return (
		<React.Fragment>
			<Grid container rowSpacing={2} spacing={6}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Header/>
				</Grid>
				<Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
					<CopyID props={ROOM_ID}/>
					<ConnectedUsers ROOM_ID={ROOM_ID} socket={socket} />
					<ChatBox socket={socket} theme={theme} />
				</Grid>
				<Grid item xs={6} sm={8} md={9} lg={9} xl={10}>
					<Canvas socket={socket} theme={theme} />
					{/* <MeetingControls /> */}
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
