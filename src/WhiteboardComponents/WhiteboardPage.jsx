import ChatBox from "./ChatBox";
import ConnectedUsers from "./ConnectedUsers";
import Header from "./Header";

export default function WhiteboardPage() {
    return (
        <div>
            <Header />
            <ConnectedUsers />
            <ChatBox />
        </div>
    )
}