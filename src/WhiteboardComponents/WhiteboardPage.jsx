import ChatBox from "./ChatBox";
import ConnectedUsers from "./ConnectedUsers";
import Header from "./Header";
import MeetingControls from "./MeetingControls";
import Canvas from "./Canvas";
import { useParams } from "react-router-dom";

export default function WhiteboardPage({createRoomComponent, socket}) {
	// Add the users to a list of users
	// Could look into using context providers
	// The host should the one to hold the users
	const {id} = useParams();

	return (
		<div>
			<Header />
			<ConnectedUsers createRoomComponent={createRoomComponent}/>
			<Canvas />
			<MeetingControls />
			<ChatBox socket={socket}/>
		</div>
	);
}
