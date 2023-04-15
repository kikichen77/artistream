import ChatBox from "./ChatBox";
import ConnectedUsers from "./ConnectedUsers";
import Header from "./Header";
import MeetingControls from "./MeetingControls";

export default function WhiteboardPage() {
	return (
		<div>
			<Header />
			<ConnectedUsers />
			<MeetingControls />
			<ChatBox />
		</div>
	);
}
