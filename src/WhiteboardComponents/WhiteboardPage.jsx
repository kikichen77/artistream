import ChatBox from "./ChatBox";
import ConnectedUsers from "./ConnectedUsers";
import Header from "./Header";
import MeetingControls from "./MeetingControls";
import Canvas from "./Canvas";

export default function WhiteboardPage() {
	return (
		<div>
			<Header />
			<ConnectedUsers />
			<Canvas />
			<MeetingControls />
			<ChatBox />
		</div>
	);
}
