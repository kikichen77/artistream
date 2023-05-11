import styles from "./WhiteboardStyles/ConnectedUsersStyles.module.css"
import Room from "./Components/VideoComponent"

export default function ConnectedUsers({ROOM_ID, socket}) {
    return (
        <div className={styles.conUsersBox}>
            <h2 className={styles.conUsersText}>Connected Users</h2>
            <Room props={ROOM_ID} socket={socket}/>
        </div>
    )
}