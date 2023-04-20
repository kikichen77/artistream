import ChatBox from "./ChatBox";
import ConnectedUsers from "./ConnectedUsers";
import Header from "./Header";
import MeetingControls from "./MeetingControls";
import Canvas from "./Canvas";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";


export default function WhiteboardPage({ createRoomComponent }) {
	// Add the users to a list of users
	// Could look into using context providers
	// The host should the one to hold the users
	const { id } = useParams();

	return (
		<div>
			<Grid container rowSpacing={2} spacing={6}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Header />
				</Grid>
				<Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
					<ConnectedUsers createRoomComponent={createRoomComponent} />
					<ChatBox />
				</Grid>
				<Grid item xs={6} sm={8} md={9} lg={9} xl={10}>
					<Canvas />
					<MeetingControls />
				</Grid>
			</Grid>
		</div>
	);
}
