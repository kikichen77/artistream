import ChatBox from "./ChatBox";
import ConnectedUsers from "./ConnectedUsers";
import Header from "./Header";
import MeetingControls from "./MeetingControls";
import Canvas from "./Canvas";
import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import { IconButton, Drawer } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { createTheme} from '@mui/material/styles';

export default function WhiteboardPage({createRoomComponent, socket}) {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#252A45',
			  },
			  secondary: {
				main: '#0C0823',
			  },
		},
	});



	// Add the users to a list of users
	// Could look into using context providers
	// The host should the one to hold the users
	const {id} = useParams();

	const [drawer, setDrawer] = useState(false);

	const handleToggleDrawer = (state) => () => {
		setDrawer(state);
	}

	return (
		<div>
			<Header />
			<ConnectedUsers createRoomComponent={createRoomComponent}/>
			<Canvas />
			<MeetingControls />
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
				<ChatBox socket={socket} handleToggleDrawer={handleToggleDrawer}/>
			</Drawer>
			
		</div>
	);
}
