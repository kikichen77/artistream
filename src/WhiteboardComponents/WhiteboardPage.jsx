import ChatBox from "./ChatBox";
import ConnectedUsers from "./ConnectedUsers";
import Header from "./Header";
import MeetingControls from "./MeetingControls";
import Canvas from "./Canvas";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { IconButton, Drawer } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { createTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";

export default function WhiteboardPage({ createRoomComponent, socket }) {
	const theme = createTheme({
		palette: {
			primary: {
				main: "#252A45",
			},
			secondary: {
				main: "#0C0823",
			},
		},
	});

	// Add the users to a list of users
	// Could look into using context providers
	// The host should the one to hold the users
	/*
						<IconButton 
						color="primary"
						onClick={handleToggleDrawer(true)}
					>
						<ChatIcon/>
					</IconButton>
					<Drawer
						anchor="left" 
						open={drawer}
						onClose={handleToggleDrawer(false)}
					>
					</Drawer>
	*/
	const { id } = useParams();

	const [drawer, setDrawer] = useState(false);

	const handleToggleDrawer = (state) => () => {
		setDrawer(state);
	};

	return (
		<div>
			<Grid container rowSpacing={2} spacing={6}>
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					sx={{ height: "120px" }}
				>
					<Header />
				</Grid>
				<Grid item xs={6} sm={4} md={3} lg={3} xl={2} sx={{ height: "95vh" }}>
					<ConnectedUsers createRoomComponent={createRoomComponent} />
					<ChatBox socket={socket} handleToggleDrawer={handleToggleDrawer} />
				</Grid>
				<Grid item xs={6} sm={8} md={9} lg={9} xl={10} sx={{ height: "95vh" }}>
					<Canvas />
					<MeetingControls />
				</Grid>
			</Grid>
		</div>
	);
}
