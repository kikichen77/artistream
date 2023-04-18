import styles from "./WhiteboardStyles/ConnectedUsersStyles.module.css"

export default function ConnectedUsers({createRoomComponent}) {
    // Keep a list of users

    return (
        <div className={styles.conUsersBox}>
            <h2 className={styles.conUsersText}>Connected Users</h2>
            {createRoomComponent}
        </div>
    )
}